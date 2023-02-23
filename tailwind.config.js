/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./Components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xL": "6rem",
      },
    },
    extend: {
      colors: {
        "green-badge-text": "#008E75",
        "green-badge-fill": "#EBFFFE",
        "green-badge-border": "#49F6B8",
        "orange-accent": "#D7945A",
        "light-white-fill": "#FEFFFD",
      },
      boxShadow: {
        "dashboard-card": "0px 0px 6px 1px rgba(0, 0, 0, 0.25)",
      },
    },
  },
  plugins: [],
};
