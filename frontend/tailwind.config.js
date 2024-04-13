/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryBlack: "#0E0E0E",
        primaryYellow: "#FFB800",
        primaryGray: "#242526",
      },
    },
  },
  plugins: [],
};
