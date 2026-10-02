/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#202520",
        muted: "#626960",
        paper: "#f8f7f2",
        peach: "#f6d8c4",
        accent: "#c45031",
        line: "#e3e1d8",
        forest: "#2d4438",
      },
      fontFamily: {
        sans: ["Arial", "Helvetica Neue", "Helvetica", "sans-serif"],
        display: ["Georgia", "Times New Roman", "serif"],
      },
      boxShadow: {
        soft: "0 18px 55px -28px rgba(31, 39, 32, 0.24)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
