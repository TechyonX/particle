/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./{src,mdx}/**/*.{js,mjs,jsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
        display: ["Mona Sans", ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        "2xs": ".6875rem",
      },
      colors: {
        particle: colors.cyan,
      },
      opacity: {
        2.5: "0.025",
        7.5: "0.075",
        15: "0.15",
      },
    },
    container: {
      padding: {
        DEFAULT: "1rem",
        sm: "3rem",
        lg: "6rem",
        xl: "8rem",
        "2xl": "10rem",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
