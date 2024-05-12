/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      flex: {
        2.5: "2.5 2.5 0%",
        5: "5 5 0%",
        3: "3 3 0%",
        2: "2 2 0%",
        1: "1 1 0%",
        4: "4 4 0%",
        7: "7 7 0%",
      },
    },
    screens: {
      tablet: "640px",
      // => @media (min-width: 640px) { ... }

      laptop: "1024px",
      // => @media (min-width: 1024px) { ... }
    },
  },
  plugins: [],
};
