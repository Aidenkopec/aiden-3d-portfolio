/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#0a192f",
        secondary: "#a8b2d1",
        tertiary: "#2c3f5a",
        "black-100": "#102a43",
        "black-200": "#011627",
        "white-100": "#e6f1ff",
      },
      boxShadow: {
        card: "0px 35px 120px -15px #211e35",
      },
      screens: {
        xs: "450px",
      },
      backgroundImage: {
        "hero-pattern": "url('/src/assets/herobg_midnight_blue.png')",
      },
    },
  },
  plugins: [],
};
