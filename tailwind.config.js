// tailwind.config.js
const {nextui} = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // ...
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#ffffff',
      'purple': '#3f3cbb',
      'light-gray': '#A4A4A4',
      'metal': '#565584',
      'light-azure-blue': '#E9FFFD',
      'orange': '#F26419',
      'orange-hard': '#F26419',
      'azure-blue': '#1CACA5',
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
