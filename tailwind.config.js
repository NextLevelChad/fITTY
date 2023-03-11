/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./Components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
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
        tahiti: "#06b6d4",
        aquamarine: {
          DEFAULT: "#49F6B8",
          50: "#F8FFFC",
          100: "#E5FEF5",
          200: "#BEFCE5",
          300: "#97FAD6",
          400: "#70F8C7",
          500: "#49F6B8",
          600: "#14F3A3",
          700: "#0AC582",
          800: "#07905F",
          900: "#045A3B",
        },
        orient: {
          DEFAULT: "#005B8E",
          50: "#47BDFF",
          100: "#32B5FF",
          200: "#09A7FF",
          300: "#008FE0",
          400: "#0075B7",
          500: "#005B8E",
          600: "#003756",
          700: "#00131E",
          800: "#000000",
          900: "#000000",
        },
        pizazz: {
          DEFAULT: "#FF8A00",
          50: "#FFDEB8",
          100: "#FFD5A3",
          200: "#FFC27A",
          300: "#FFAF52",
          400: "#FF9D29",
          500: "#FF8A00",
          600: "#C76C00",
          700: "#8F4D00",
          800: "#572F00",
          900: "#1F1100",
        },
        "red-orange": {
          DEFAULT: "#F83B3B",
          50: "#FEECEC",
          100: "#FED9D9",
          200: "#FCB1B1",
          300: "#FB8A8A",
          400: "#F96262",
          500: "#F83B3B",
          600: "#F20909",
          700: "#BC0707",
          800: "#860505",
          900: "#500303",
        },
      },
      boxShadow: {
        "dashboard-card": "0px 0px 6px 1px rgba(0, 0, 0, 0.25)",
      },
    },
  },
  plugins: [],
};
