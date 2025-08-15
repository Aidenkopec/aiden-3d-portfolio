import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { styles } from '../styles';
import { github } from '../assets';
import { SectionWrapper } from '../hoc';
import { projects } from '../constants';
import { fadeIn, textVariant } from '../utils/motion';

// GitHub API configuration
const GITHUB_USERNAME = 'Aidenkopec';
const GITHUB_API_BASE = 'https://api.github.com';
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

// Language colors from GitHub
const LANGUAGE_COLORS = {
  JavaScript: '#f1e05a',
  TypeScript: '#2b7489',
  Python: '#3572A5',
  Java: '#b07219',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Vue: '#4fc08d',
  React: '#61dafb',
  'Jupyter Notebook': '#da5b0b',
  Shell: '#89e051',
};

// Cache configuration
const CACHE_KEY = 'github_data_cache';
const CACHE_EXPIRATION = 60 * 60 * 1000; // 1 hour in ms

// GitHub API service
class GitHubService {
  static async fetchUserData() {
    try {
      const headers = GITHUB_TOKEN
        ? { Authorization: `token ${GITHUB_TOKEN}` }
        : {};
      const response = await fetch(
        `${GITHUB_API_BASE}/users/${GITHUB_USERNAME}`,
        { headers }
      );

      if (!response.ok) {
        return null;
      }

      const data = await response.json();

      if (typeof data === 'string' && data.includes('<!DOCTYPE')) {
        console.error('Received HTML instead of JSON from GitHub API');
        return null;
      }

      return data;
    } catch (error) {
      return null;
    }
  }

  static async fetchRepositories() {
    try {
      const headers = GITHUB_TOKEN
        ? { Authorization: `token ${GITHUB_TOKEN}` }
        : {};
      const response = await fetch(
        `${GITHUB_API_BASE}/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`,
        { headers }
      );

      if (!response.ok) {
        return [];
      }

      const data = await response.json();

      if (typeof data === 'string' && data.includes('<!DOCTYPE')) {
        console.error('Received HTML instead of JSON from GitHub API');
        return [];
      }

      return Array.isArray(data) ? data : [];
    } catch (error) {
      return [];
    }
  }

  static async fetchLanguages(repos) {
    try {
      const languageStats = {};
      let totalBytes = 0;

      for (let i = 0; i < Math.min(repos.length, 20); i++) {
        const repo = repos[i];

        if (i > 0) {
          await new Promise((resolve) => setTimeout(resolve, 100));
        }

        try {
          const headers = GITHUB_TOKEN
            ? { Authorization: `token ${GITHUB_TOKEN}` }
            : {};
          const response = await fetch(repo.languages_url, { headers });

          if (!response.ok) {
            continue;
          }

          const languages = await response.json();

          if (
            languages &&
            typeof languages === 'object' &&
            !Array.isArray(languages)
          ) {
            Object.entries(languages).forEach(([lang, bytes]) => {
              languageStats[lang] = (languageStats[lang] || 0) + bytes;
              totalBytes += bytes;
            });
          }
        } catch (error) {
          continue;
        }
      }

      return Object.entries(languageStats)
        .map(([name, bytes]) => ({
          name,
          percentage: Math.round((bytes / totalBytes) * 100),
          color: LANGUAGE_COLORS[name] || '#858585',
          bytes,
        }))
        .sort((a, b) => b.percentage - a.percentage)
        .slice(0, 6);
    } catch (error) {
      return [];
    }
  }

  static async fetchCommitActivity() {
    try {
      const repos = await this.fetchRepositories();
      const commitActivity = [];
      const oneYearAgo = new Date();
      oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

      for (let i = 0; i < Math.min(repos.length, 10); i++) {
        const repo = repos[i];

        if (i > 0) {
          await new Promise((resolve) => setTimeout(resolve, 200));
        }

        try {
          const headers = GITHUB_TOKEN
            ? { Authorization: `token ${GITHUB_TOKEN}` }
            : {};
          let page = 1;
          let hasMore = true;

          while (hasMore) {
            const response = await fetch(
              `${GITHUB_API_BASE}/repos/${GITHUB_USERNAME}/${
                repo.name
              }/commits?since=${oneYearAgo.toISOString()}&per_page=100&page=${page}`,
              { headers }
            );

            if (!response.ok) {
              break;
            }

            const commits = await response.json();

            if (!Array.isArray(commits) || commits.length === 0) {
              hasMore = false;
              break;
            }

            commits.forEach((commit) => {
              if (commit.author && commit.author.login === GITHUB_USERNAME) {
                commitActivity.push({
                  date: commit.commit.author.date,
                  message: commit.commit.message,
                  repo: repo.name,
                  sha: commit.sha,
                });
              }
            });

            page++;
            if (commits.length < 100) {
              hasMore = false;
            }

            // Rate limit delay
            await new Promise((resolve) => setTimeout(resolve, 200));
          }
        } catch (error) {
          continue;
        }
      }

      return commitActivity.sort((a, b) => new Date(b.date) - new Date(a.date));
    } catch (error) {
      return [];
    }
  }

  static generateCommitGraph(commits) {
    const weeks = [];
    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - 364);

    for (let week = 0; week < 52; week++) {
      const weekStart = new Date(startDate);
      weekStart.setDate(startDate.getDate() + week * 7);

      const days = [];
      for (let day = 0; day < 7; day++) {
        const currentDate = new Date(weekStart);
        currentDate.setDate(weekStart.getDate() + day);

        const dayCommits = commits.filter((commit) => {
          const commitDate = new Date(commit.date);
          return commitDate.toDateString() === currentDate.toDateString();
        });

        days.push({
          date: currentDate.toISOString().split('T')[0],
          count: dayCommits.length,
          level: this.getContributionLevel(dayCommits.length),
        });
      }
      weeks.push(days);
    }

    return {
      weeks,
      totalContributions: commits.length,
    };
  }

  static getContributionLevel(count) {
    if (count === 0) return 0;
    if (count <= 3) return 1;
    if (count <= 6) return 2;
    if (count <= 9) return 3;
    return 4;
  }

  static async fetchContributionCalendar(year = null) {
    if (!GITHUB_TOKEN) {
      const commits = await this.fetchCommitActivity();
      return {
        weeks: this.generateCommitGraph(commits),
        totalContributions: commits.length,
      };
    }

    let fromDate = null;
    let toDate = null;
    if (year) {
      fromDate = `${year}-01-01T00:00:00Z`;
      toDate = `${year}-12-31T23:59:59Z`;
    }

    const query = `
      query {
        viewer {
          contributionsCollection${
            year ? `(from: "${fromDate}", to: "${toDate}")` : ''
          } {
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  contributionCount
                  date
                  color
                }
              }
            }
          }
        }
      }
    `;

    try {
      const response = await fetch(`${GITHUB_API_BASE}/graphql`, {
        method: 'POST',
        headers: {
          Authorization: `bearer ${GITHUB_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) {
        throw new Error('GraphQL request failed');
      }

      const json = await response.json();
      if (json.errors) {
        throw new Error(json.errors[0].message);
      }

      return json.data.viewer.contributionsCollection.contributionCalendar;
    } catch (error) {
      console.error('Failed to fetch contribution calendar:', error);
      const commits = await this.fetchCommitActivity();
      return {
        weeks: this.generateCommitGraph(commits),
        totalContributions: commits.length,
      };
    }
  }
}

// Loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center p-4">
    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#915EFF]"></div>
  </div>
);

// Project Card Component (Enhanced)
const ProjectCard = ({
  index,
  name,
  description,
  tags,
  image,
  source_code_link,
}) => {
  return (
    <motion.div
      variants={fadeIn('up', 'spring', index * 0.1, 0.75)}
      className="flex flex-col"
    >
      <Tilt
        tiltMaxAngleX={25}
        tiltMaxAngleY={25}
        scale={1.02}
        transitionSpeed={450}
        className="bg-tertiary p-5 rounded-2xl w-full h-full flex flex-col border border-[#232631] hover:border-[#915EFF] transition-colors duration-300"
      >
        <div className="relative w-full h-[200px]">
          <img
            src={image}
            alt="project_image"
            className="w-full h-full object-cover rounded-xl"
          />

          <div className="absolute inset-0 flex justify-end m-3 card-img_hover">
            <div
              onClick={() => window.open(source_code_link, '_blank')}
              className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer hover:scale-110 transition-transform"
            >
              <img
                src={github}
                alt="source code"
                className="w-1/2 h-1/2 object-contain"
              />
            </div>
          </div>
        </div>

        <div className="mt-5 flex-1 flex flex-col justify-between">
          <div>
            <h3 className="text-white font-bold text-[20px] mb-2">{name}</h3>
            <p className="text-secondary text-[14px] leading-[22px]">
              {description}
            </p>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <p
                key={`${name}-${tag.name}`}
                className={`text-[12px] px-2 py-1 rounded-full border border-current ${tag.color}`}
              >
                #{tag.name}
              </p>
            ))}
          </div>
        </div>
      </Tilt>
    </motion.div>
  );
};

// GitHub Stats Card Component
const StatCard = ({ title, value, icon, index, loading }) => (
  <motion.div
    variants={fadeIn('up', 'spring', index * 0.1, 0.75)}
    className="flex-1 min-w-[160px]"
  >
    <Tilt
      tiltMaxAngleX={15}
      tiltMaxAngleY={15}
      scale={1.02}
      transitionSpeed={450}
      className="bg-tertiary p-4 rounded-xl border border-[#232631] hover:border-[#915EFF] transition-colors duration-300"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="text-white text-xl font-bold">
          {loading ? (
            <div className="w-6 h-6 bg-gray-600 animate-pulse rounded"></div>
          ) : (
            value
          )}
        </div>
        {icon && <div className="text-[#915EFF] text-lg">{icon}</div>}
      </div>
      <p className="text-secondary text-xs font-medium">{title}</p>
    </Tilt>
  </motion.div>
);

// Language Bar Component
const LanguageBar = ({ language, index }) => (
  <motion.div
    variants={fadeIn('right', 'spring', index * 0.1, 0.75)}
    className="mb-2"
  >
    <div className="flex justify-between items-center mb-1">
      <span className="text-white text-sm font-medium">{language.name}</span>
      <span className="text-secondary text-xs">{language.percentage}%</span>
    </div>
    <div className="w-full bg-[#232631] rounded-full h-1.5">
      <motion.div
        className="h-1.5 rounded-full"
        style={{ backgroundColor: language.color }}
        initial={{ width: 0 }}
        animate={{ width: `${language.percentage}%` }}
        transition={{ duration: 1.5, delay: index * 0.1 }}
      />
    </div>
  </motion.div>
);

// Commit Graph Component (Compact)
const CommitGraph = ({
  commitCalendar,
  loading,
  selectedYear,
  setSelectedYear,
  availableYears,
}) => {
  if (loading) {
    return (
      <div className="bg-tertiary p-4 rounded-xl border border-[#232631]">
        <h4 className="text-white font-semibold text-[16px] mb-4">
          Contribution Activity
        </h4>
        <LoadingSpinner />
      </div>
    );
  }

  const weeks = commitCalendar?.weeks || [];
  const total = commitCalendar?.totalContributions || 0;

  const getContributionColor = (level) => {
    // Dark colors for no contributions, green progression for activity
    const colors = [
      '#1f2937', // No contributions - dark gray (much darker)
      '#059669', // Low contributions - dark green
      '#10b981', // Medium contributions - medium green
      '#34d399', // High contributions - light green
      '#6ee7b7', // Very high contributions - soft mint green
    ];
    return colors[level] || colors[0];
  };

  // Improved month labels with span
  const monthLabels = [];
  if (weeks.length > 0) {
    let currentMonth = null;
    let startWeek = 0;
    weeks.forEach((week, index) => {
      if (week.contributionDays && week.contributionDays.length > 0) {
        const firstDay = new Date(week.contributionDays[0].date);
        const monthName = firstDay.toLocaleString('default', {
          month: 'short',
        });
        if (monthName !== currentMonth) {
          if (currentMonth !== null) {
            monthLabels.push({
              label: currentMonth,
              span: index - startWeek,
            });
          }
          currentMonth = monthName;
          startWeek = index;
        }
        if (index === weeks.length - 1) {
          monthLabels.push({
            label: currentMonth,
            span: index - startWeek + 1,
          });
        }
      }
    });
  }

  return (
    <div className="bg-tertiary p-4 rounded-xl border border-[#232631] hover:border-[#915EFF] transition-colors duration-300">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-secondary font-semibold text-[16px]">
          {total} contributions in{' '}
          {selectedYear === 'last' ? 'the last year' : selectedYear}
        </h4>
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="bg-[#1d1836] text-secondary border border-[#232631] hover:border-[#915EFF] rounded px-2 py-1 text-sm cursor-pointer transition-colors"
        >
          <option value="last">Last year</option>
          {availableYears.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      {weeks.length > 0 ? (
        <div className="overflow-x-auto">
          <div
            className="flex mb-1 text-xs text-secondary mx-auto"
            style={{ maxWidth: '520px' }}
          >
            {monthLabels.map(({ label, span }, i) => (
              <div key={i} style={{ flex: span }} className="text-center">
                {label}
              </div>
            ))}
          </div>
          <div
            className="flex gap-0.5 mb-3 mx-auto"
            style={{ maxWidth: '520px' }}
          >
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-0.5">
                {'contributionDays' in week
                  ? week.contributionDays.map((day, dayIndex) => (
                      <motion.div
                        key={`${weekIndex}-${dayIndex}`}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          duration: 0.2,
                          delay: (weekIndex * 7 + dayIndex) * 0.001,
                        }}
                        className="w-2 h-2 rounded-sm cursor-pointer hover:ring-1 hover:ring-[#915EFF] transition-all"
                        style={{
                          backgroundColor: getContributionColor(
                            day.contributionCount === 0
                              ? 0
                              : day.contributionCount <= 3
                              ? 1
                              : day.contributionCount <= 6
                              ? 2
                              : day.contributionCount <= 9
                              ? 3
                              : 4
                          ),
                        }}
                        title={`${day.contributionCount} contributions on ${day.date}`}
                      />
                    ))
                  : week.map((day, dayIndex) => (
                      <motion.div
                        key={`${weekIndex}-${dayIndex}`}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          duration: 0.2,
                          delay: (weekIndex * 7 + dayIndex) * 0.001,
                        }}
                        className="w-2 h-2 rounded-sm cursor-pointer hover:ring-1 hover:ring-[#915EFF] transition-all"
                        style={{
                          backgroundColor: getContributionColor(day.level),
                        }}
                        title={`${day.count} contributions on ${day.date}`}
                      />
                    ))}
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between text-xs text-secondary max-w-[520px] mx-auto">
            <span>Less</span>
            <div className="flex gap-0.5">
              {[0, 1, 2, 3, 4].map((level) => (
                <div
                  key={level}
                  className="w-2 h-2 rounded-sm"
                  style={{ backgroundColor: getContributionColor(level) }}
                />
              ))}
            </div>
            <span>More</span>
          </div>
        </div>
      ) : (
        <div className="text-center text-secondary py-4 text-sm">
          No contribution data available
        </div>
      )}
    </div>
  );
};

const Projects = () => {
  const [githubData, setGithubData] = useState({
    user: null,
    repositories: [],
    languages: [],
    commits: [],
    commitGraph: [],
    stats: {
      totalStars: 0,
      totalForks: 0,
      contributionYears: 0,
    },
  });

  const [loading, setLoading] = useState({
    user: true,
    repos: true,
    languages: true,
    commits: true,
  });

  const [error, setError] = useState(null);

  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState('last');
  const availableYears = [currentYear, currentYear - 1, currentYear - 2];

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        // Check cache first
        const cachedData = localStorage.getItem(CACHE_KEY);
        if (cachedData) {
          const { data, timestamp } = JSON.parse(cachedData);
          if (Date.now() - timestamp < CACHE_EXPIRATION) {
            setGithubData(data);
            setLoading({
              user: false,
              repos: false,
              languages: false,
              commits: false,
            });
            return;
          }
        }

        // Fetch data
        const [userData, repositories] = await Promise.all([
          GitHubService.fetchUserData(),
          GitHubService.fetchRepositories(),
        ]);

        if (!userData || repositories.length === 0) {
          setError('Unable to fetch GitHub data');
          return;
        }

        setGithubData((prev) => ({ ...prev, user: userData }));
        setLoading((prev) => ({ ...prev, user: false }));

        const totalStars = repositories.reduce(
          (sum, repo) => sum + repo.stargazers_count,
          0
        );
        const totalForks = repositories.reduce(
          (sum, repo) => sum + repo.forks_count,
          0
        );
        const createdAt = new Date(userData.created_at || '2022-01-10');
        const contributionYears =
          new Date().getFullYear() - createdAt.getFullYear();

        setGithubData((prev) => ({
          ...prev,
          repositories: repositories.slice(0, 6),
          stats: { totalStars, totalForks, contributionYears },
        }));
        setLoading((prev) => ({ ...prev, repos: false }));

        // Fetch languages
        const languages = await GitHubService.fetchLanguages(
          repositories.slice(0, 10)
        );
        setGithubData((prev) => ({ ...prev, languages }));
        setLoading((prev) => ({ ...prev, languages: false }));

        // Fetch commits
        const commitCalendar = await GitHubService.fetchContributionCalendar();
        const commits = await GitHubService.fetchCommitActivity();
        setGithubData((prev) => ({
          ...prev,
          commits: commits.slice(0, 5),
          commitCalendar,
        }));
        setLoading((prev) => ({ ...prev, commits: false }));

        // Cache the data
        localStorage.setItem(
          CACHE_KEY,
          JSON.stringify({
            data: githubData,
            timestamp: Date.now(),
          })
        );
      } catch (err) {
        setError('Failed to load GitHub data');
        setLoading({
          user: false,
          repos: false,
          languages: false,
          commits: false,
        });
      }
    };

    fetchGitHubData();
  }, []);

  useEffect(() => {
    const fetchForYear = async () => {
      setLoading((prev) => ({ ...prev, commits: true }));
      const yearToFetch = selectedYear === 'last' ? null : selectedYear;
      const commitCalendar = await GitHubService.fetchContributionCalendar(
        yearToFetch
      );
      setGithubData((prev) => ({ ...prev, commitCalendar }));
      setLoading((prev) => ({ ...prev, commits: false }));
    };
    fetchForYear();
  }, [selectedYear]);

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText}`}>My work & contributions</p>
        <h2 className={`${styles.sectionHeadText}`}>Projects & Code.</h2>
      </motion.div>

      <div className="w-full flex">
        <motion.p
          variants={fadeIn('', '', 0.1, 1)}
          className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]"
        >
          Explore my development journey through featured projects and live
          GitHub contributions. From full-stack applications to AI-powered
          tools, each project represents a commitment to quality code and
          innovative solutions. The live GitHub data showcases consistent coding
          practices, diverse technology stack, and collaborative project
          development.
        </motion.p>
      </div>

      {/* Featured Projects Section */}
      <motion.div variants={textVariant()} className="mt-16">
        <h3 className="text-white font-bold text-[24px] mb-8">
          Featured Projects
        </h3>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 mb-20">
        {projects.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} {...project} />
        ))}
      </div>

      {/* GitHub Activity Dashboard Section */}
      <motion.div variants={textVariant()} className="mt-20">
        <h3 className="text-white font-bold text-[24px] mb-8">
          GitHub Activity Dashboard
        </h3>
      </motion.div>

      {/* GitHub Stats Overview - Moved up */}
      <div className="mt-8 mb-12 flex flex-wrap gap-4 justify-center">
        <StatCard
          title="Public Repositories"
          value={githubData.user?.public_repos || '---'}
          icon="📚"
          index={0}
          loading={loading.user}
        />
        <StatCard
          title="Total Stars"
          value={githubData.stats.totalStars}
          icon="⭐"
          index={1}
          loading={loading.repos}
        />
        <StatCard
          title="Followers"
          value={githubData.user?.followers || '---'}
          icon="👥"
          index={2}
          loading={loading.user}
        />
        <StatCard
          title="Years Active"
          value={githubData.stats.contributionYears || '---'}
          icon="📅"
          index={3}
          loading={loading.user}
        />
      </div>

      {/* Main GitHub Content Grid */}
      <div className="grid grid-cols-1 gap-8 mb-12">
        {/* Full Width - Contribution Graph */}
        <motion.div
          variants={fadeIn('up', 'spring', 0.3, 0.75)}
          className="w-full"
        >
          <CommitGraph
            commitCalendar={githubData.commitCalendar}
            loading={loading.commits}
            selectedYear={selectedYear}
            setSelectedYear={setSelectedYear}
            availableYears={availableYears}
          />
        </motion.div>

        {/* Recent Commits and Languages in Flex Layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Recent Commits Card */}
          <motion.div
            variants={fadeIn('right', 'spring', 0.4, 0.75)}
            className="flex-1"
          >
            <Tilt
              tiltMaxAngleX={15}
              tiltMaxAngleY={15}
              scale={1.02}
              transitionSpeed={450}
              className="bg-tertiary p-4 rounded-xl border border-[#232631] hover:border-[#915EFF] transition-colors duration-300 h-full"
            >
              <h4 className="text-white font-semibold text-[16px] mb-4">
                Recent Commits
              </h4>

              {loading.commits ? (
                <LoadingSpinner />
              ) : (
                <div className="space-y-3">
                  {githubData.commits.slice(0, 5).map((commit, index) => (
                    <motion.div
                      key={commit.sha}
                      variants={fadeIn('up', 'spring', index * 0.1, 0.75)}
                      className="p-3 bg-[#1d1836] rounded-lg border border-[#232631] hover:border-[#915EFF] transition-colors duration-300"
                    >
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-white text-sm font-medium truncate">
                          {commit.message.length > 50
                            ? commit.message.substring(0, 50) + '...'
                            : commit.message}
                        </span>
                        <span className="text-[#915EFF] text-xs font-mono bg-[#232631] px-2 py-1 rounded">
                          {commit.sha.substring(0, 7)}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-secondary">
                        <span className="flex items-center gap-1">
                          📁 {commit.repo}
                        </span>
                        <span className="flex items-center gap-1">
                          📅 {new Date(commit.date).toLocaleDateString()}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </Tilt>
          </motion.div>

          {/* Programming Languages Card */}
          <motion.div
            variants={fadeIn('left', 'spring', 0.4, 0.75)}
            className="flex-1"
          >
            <Tilt
              tiltMaxAngleX={15}
              tiltMaxAngleY={15}
              scale={1.02}
              transitionSpeed={450}
              className="bg-tertiary p-4 rounded-xl border border-[#232631] hover:border-[#915EFF] transition-colors duration-300 h-full"
            >
              <h4 className="text-white font-semibold text-[16px] mb-4">
                Top Programming Languages
              </h4>
              {loading.languages ? (
                <LoadingSpinner />
              ) : githubData.languages.length > 0 ? (
                githubData.languages.map((language, index) => (
                  <LanguageBar
                    key={language.name}
                    language={language}
                    index={index}
                  />
                ))
              ) : (
                <div className="text-center text-secondary py-4 text-sm">
                  No language data available
                </div>
              )}
            </Tilt>
          </motion.div>
        </div>
      </div>

      {/* Error State */}
      {error && (
        <motion.div
          variants={fadeIn('up', 'spring', 0.2, 0.75)}
          className="mt-8 p-4 bg-red-900/20 border border-red-600/30 rounded-lg text-center"
        >
          <p className="text-red-400 text-sm mb-2">{error}</p>
          <p className="text-red-300 text-xs">
            GitHub data may be temporarily unavailable due to API rate limits.
          </p>
        </motion.div>
      )}
    </>
  );
};

export default SectionWrapper(Projects, 'projects');
