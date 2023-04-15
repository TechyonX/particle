/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        particle: colors.cyan,
      },
    },
    container: {
      padding: {
        DEFAULT: '1rem',
        sm: '3rem',
        lg: '6rem',
        xl: '8rem',
        '2xl': '10rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
