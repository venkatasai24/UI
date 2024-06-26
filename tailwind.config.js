/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        indigo: "#4B0082",
        teal: "#008080",
      },
      fontFamily: {
        sans: ["Nunito Sans", "sans-serif"],
      },
      width: {
        70: "70%",
        30: "30%",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
