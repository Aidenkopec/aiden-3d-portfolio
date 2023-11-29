import herobg from './assets/herobg.png';
import herobgMidnightBlue from './assets/herobg_midnight_blue.png';

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

// styles.js

// Define a list of theme objects with colors
const themes = [
    {
        '--primary-color': '#050816',
        '--secondary-color': '#aaa6c3',
        '--tertiary-color': '#151030',
        '--black-100-color': '#100d25',
        '--black-200-color': '#090325',
        '--white-100-color': '#f3f3f3',
        '--hero-pattern': `url(${herobg})`,
        '--text-color-variable': '#915EFF',
        '--gradient-start': '#915EFF',
        '--gradient-end': 'rgba(0, 150, 255, 0)',
    },
    {
        '--primary-color': '#0a192f',
        '--secondary-color': '#e6f1ff',
        '--tertiary-color': '#2c3f5a',
        '--black-100-color': '#102a43',
        '--black-200-color': '#011627',
        '--white-100-color': '#e6f1ff',
        '--hero-pattern': `url(${herobgMidnightBlue})`,
        '--text-color-variable': '#0096FF',
        '--gradient-start': '#0096FF',
        '--gradient-end': 'rgba(0, 150, 255, 0)',
    },
];

// Function to apply a random theme
function applyRandomTheme() {
    const theme = themes[Math.floor(Math.random() * themes.length)];
    for (const key in theme) {
        document.documentElement.style.setProperty(key, theme[key]);
    }

}


// Apply a random theme on page load
document.addEventListener('DOMContentLoaded', applyRandomTheme);


export {styles};
