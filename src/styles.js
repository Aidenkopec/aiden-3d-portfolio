import herobg from './assets/herobg.png';
import herobgMidnightBlue from './assets/herobg_midnight_blue.png';
import greenbg from './assets/greenbg.png';
import heroblack from './assets/herobg_black.png';
import herobg_adjusted from './assets/herobg_adjusted.png';

const styles = {
  paddingX: 'sm:px-16 px-6',
  paddingY: 'sm:py-16 py-6',
  padding: 'sm:px-16 px-6 sm:py-16 py-10',

  heroHeadText:
    'font-black text-white lg:text-[80px] sm:text-[60px] xs:text-[50px] text-[40px] lg:leading-[98px] mt-2',
  heroSubText:
    'text-[#dfd9ff] font-medium lg:text-[30px] sm:text-[26px] xs:text-[20px] text-[16px] lg:leading-[40px]',

  sectionHeadText:
    'text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px]',
  sectionSubText:
    'sm:text-[18px] text-[14px] text-secondary uppercase tracking-wider',
};

const themes = {
  obsidian: {
    name: 'Obsidian Black',
    '--primary-color': '#0a0a0a',
    '--secondary-color': '#ffffff',
    '--tertiary-color': '#1a1a1a',
    '--black-100-color': '#141414',
    '--black-200-color': '#000000',
    '--white-100-color': '#ffffff',
    '--hero-pattern': `url(${herobg_adjusted})`,
    '--text-color-variable': '#ff6b6b',
    '--gradient-start': '#ff6b6b',
    '--gradient-end': 'rgba(255, 107, 107, 0)',
  },
  cosmicVoyage: {
    name: 'Cosmic Purple',
    '--primary-color': '#0a0514',
    '--secondary-color': '#ffffff',
    '--tertiary-color': '#1a0f2e',
    '--black-100-color': '#140a23',
    '--black-200-color': '#05020a',
    '--white-100-color': '#f8f5ff',
    '--hero-pattern': `url(${herobg})`,
    '--text-color-variable': '#a855f7',
    '--gradient-start': '#a855f7',
    '--gradient-end': 'rgba(168, 85, 247, 0)',
  },
  midnightBlue: {
    name: 'Ocean Blue',
    '--primary-color': '#0c1621',
    '--secondary-color': '#ffffff',
    '--tertiary-color': '#1e293b',
    '--black-100-color': '#0f172a',
    '--black-200-color': '#020617',
    '--white-100-color': '#f1f5f9',
    '--hero-pattern': `url(${herobgMidnightBlue})`,
    '--text-color-variable': '#06b6d4',
    '--gradient-start': '#06b6d4',
    '--gradient-end': 'rgba(6, 182, 212, 0)',
  },
  deepForest: {
    name: 'Matrix Green',
    '--primary-color': '#0a1a0a',
    '--secondary-color': '#ffffff',
    '--tertiary-color': '#14532d',
    '--black-100-color': '#052e16',
    '--black-200-color': '#022c22',
    '--white-100-color': '#f0fdf4',
    '--hero-pattern': `url(${greenbg})`,
    '--text-color-variable': '#10b981',
    '--gradient-start': '#10b981',
    '--gradient-end': 'rgba(16, 185, 129, 0)',
  },
  crimsonFire: {
    name: 'Crimson Fire',
    '--primary-color': '#1a0a0a',
    '--secondary-color': '#ffffff',
    '--tertiary-color': '#7f1d1d',
    '--black-100-color': '#450a0a',
    '--black-200-color': '#0c0404',
    '--white-100-color': '#fef2f2',
    '--hero-pattern': `url(${herobg_adjusted})`,
    '--text-color-variable': '#ef4444',
    '--gradient-start': '#ef4444',
    '--gradient-end': 'rgba(239, 68, 68, 0)',
  },
};

// Function to apply a theme
function applyTheme(themeName) {
  const theme = themes[themeName];
  if (!theme) {
    console.error(`Theme "${themeName}" not found`);
    return;
  }

  Object.entries(theme).forEach(([key, value]) => {
    // Skip the 'name' property as it's not a CSS variable
    if (key !== 'name') {
      document.documentElement.style.setProperty(key, value);
    }
  });

  // Force a repaint
  document.documentElement.offsetHeight;
}

// Function to apply the default theme (obsidian) or saved theme
function applyDefaultTheme() {
  const savedTheme = localStorage.getItem('selectedTheme');
  const themeToApply =
    savedTheme && themes[savedTheme] ? savedTheme : 'obsidian';

  applyTheme(themeToApply);
  localStorage.setItem('selectedTheme', themeToApply);
}

// Function to set and save a theme
function setTheme(themeName) {
  if (themes[themeName]) {
    applyTheme(themeName);
    localStorage.setItem('selectedTheme', themeName);
  } else {
    console.error(`Theme ${themeName} not found in themes object`);
  }
}

// Function to get current theme
function getCurrentTheme() {
  return localStorage.getItem('selectedTheme') || 'obsidian';
}

// Apply theme as early as possible to prevent flash
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', applyDefaultTheme);
} else {
  // Document is already loaded
  applyDefaultTheme();
}

export {
  applyTheme,
  applyDefaultTheme,
  setTheme,
  getCurrentTheme,
  themes,
  styles,
};
