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
        '--primary-color': '#000b18',
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

    {
        '--primary-color': '#09110a', // Dark Green, almost black
        '--secondary-color': '#E6E6E6', // Light gray for clear text visibility
        '--tertiary-color': '#132F2C', // Even darker green for depth
        '--black-100-color': '#041F1E', // Very dark green, almost black
        '--black-200-color': '#031413', // Darker for added depth
        '--white-100-color': '#FFFFFF', // Crisp white for strong contrast on important text elements
        '--hero-pattern': `url(${greenbg})`,
        '--text-color-variable': '#39FF14', // Muted sage green for a sophisticated accent
        '--gradient-start': '#39FF14', // green start for gradients
        '--gradient-end': 'rgba(57, 255, 20, 0)', // Transparent end for gradient
    },


  {
        '--primary-color': '#060606', // Rich black
        '--secondary-color': '#FFFFFF', // Medium gray for clear text readability
        '--tertiary-color': '#262626', // Dark gray for layers of shadow
        '--black-100-color': '#0A0A0A', // Deep black for depth
        '--black-200-color': '#000000', // True black for contrast
        '--white-100-color': '#EEEEEE', // Light gray almost white for a stark contrast
        '--hero-pattern': `url(${herobg_adjusted})`, // Replace with your actual obsidian or dark-themed background image
        '--text-color-variable': '#DC143C', // Crimson red for a bold accent
        '--gradient-start': '#00BCD4', // Cyan start for gradients
        '--gradient-end': 'rgba(0, 188, 212, 0)', // Transparent gradient end
    },

];

// Function to apply a random theme

// Function to get a random index different from the last
function getRandomThemeIndex(lastIndex) {
    if (themes.length === 1) return 0; // If only one theme, always return 0

    let newIndex;
    do {
        newIndex = Math.floor(Math.random() * themes.length);
    } while (themes.length > 1 && newIndex === lastIndex); // Ensure we have more than one theme to choose from
    return newIndex;
}

// Function to apply a random theme
function applyRandomTheme() {
    const lastThemeIndex = parseInt(localStorage.getItem('lastThemeIndex'), 10);

    // Get a new random index, different from the last
    const newThemeIndex = getRandomThemeIndex(lastThemeIndex);

    // Apply the new theme
    const theme = themes[newThemeIndex];
    for (const key in theme) {
        document.documentElement.style.setProperty(key, theme[key]);
    }

    // Use a timeout to ensure the localStorage is updated after all operations
    setTimeout(() => {
        localStorage.setItem('lastThemeIndex', newThemeIndex);
    }, 0);
}

// Apply a random theme when the page fully loads
window.addEventListener('load', applyRandomTheme);


export {styles};
