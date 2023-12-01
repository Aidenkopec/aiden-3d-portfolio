import herobg from './assets/herobg.png';
import herobgMidnightBlue from './assets/herobg_midnight_blue.png';
import greenbg from './assets/greenbg.png';
import heroblack from './assets/herobg_black.png';
import herobg_adjusted from './assets/herobg_adjusted.png';

const styles = {
    paddingX: "sm:px-16 px-6",
    paddingY: "sm:py-16 py-6",
    padding: "sm:px-16 px-6 sm:py-16 py-10",

    heroHeadText:
        "font-black text-white lg:text-[80px] sm:text-[60px] xs:text-[50px] text-[40px] lg:leading-[98px] mt-2",
    heroSubText:
        "text-[#dfd9ff] font-medium lg:text-[30px] sm:text-[26px] xs:text-[20px] text-[16px] lg:leading-[40px]",

    sectionHeadText:
        "text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px]",
    sectionSubText:
        "sm:text-[18px] text-[14px] text-secondary uppercase tracking-wider",
};


const themes = {
    cosmicVoyage: {
        '--primary-color': '#050816',
        '--secondary-color': '#aaa6c3',
        '--tertiary-color': '#151030',
        '--black-100-color': '#100d25',
        '--black-200-color': '#090325',
        '--white-100-color': '#f3f3f3',
        '--hero-pattern': `url(${herobg})`, // Replace with actual image reference
        '--text-color-variable': '#915EFF',
        '--gradient-start': '#915EFF',
        '--gradient-end': 'rgba(0, 150, 255, 0)',
    },
    midnightBlue: {
        '--primary-color': '#000b18',
        '--secondary-color': '#e6f1ff',
        '--tertiary-color': '#2c3f5a',
        '--black-100-color': '#102a43',
        '--black-200-color': '#011627',
        '--white-100-color': '#e6f1ff',
        '--hero-pattern': `url(${herobgMidnightBlue})`, // Replace with actual image reference
        '--text-color-variable': '#0096FF',
        '--gradient-start': '#0096FF',
        '--gradient-end': 'rgba(0, 150, 255, 0)',
    },
    deepForest: {
        '--primary-color': '#09110a',
        '--secondary-color': '#E6E6E6',
        '--tertiary-color': '#132F2C',
        '--black-100-color': '#041F1E',
        '--black-200-color': '#031413',
        '--white-100-color': '#FFFFFF',
        '--hero-pattern': `url(${greenbg})`, // Replace with actual image reference
        '--text-color-variable': '#39FF14',
        '--gradient-start': '#39FF14',
        '--gradient-end': 'rgba(57, 255, 20, 0)',
    },
    obsidian: {
        '--primary-color': '#060606',
        '--secondary-color': '#FFFFFF',
        '--tertiary-color': '#262626',
        '--black-100-color': '#0A0A0A',
        '--black-200-color': '#000000',
        '--white-100-color': '#EEEEEE',
        '--hero-pattern': `url(${herobg_adjusted})`, // Replace with actual image reference
        '--text-color-variable': '#DC143C',
        '--gradient-start': '#00BCD4',
        '--gradient-end': 'rgba(0, 188, 212, 0)',
    },
    // ... Add more themes as needed
};


// Get all theme names as an array
const themeNames = Object.keys(themes);

// Function to get a random theme name
function getRandomThemeName(excludeTheme) {
    let randomTheme;
    do {
        randomTheme = themeNames[Math.floor(Math.random() * themeNames.length)];
    } while (randomTheme === excludeTheme);
    return randomTheme;
}

// Function to apply a theme
function applyTheme(themeName) {
    const theme = themes[themeName];
    Object.entries(theme).forEach(([key, value]) => {
        document.documentElement.style.setProperty(key, value);
    });
}

// Function to apply a random theme
function applyRandomTheme() {
    const lastThemeName = localStorage.getItem('lastThemeName');
    const newThemeName = getRandomThemeName(lastThemeName);

    applyTheme(newThemeName);
    localStorage.setItem('lastThemeName', newThemeName);
}

window.addEventListener('load', applyRandomTheme);

export {applyRandomTheme, applyTheme, styles};


