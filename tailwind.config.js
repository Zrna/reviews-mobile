/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        white: "#FFFFFF",
        black: "#000000",
        primary: "#23C06B",
        "light-dark": "#202020",
        dark: "#0E0E0E",
        dimmed: "#D0D0D0",
        warning: "#C09423",
        error: "#C02323",
        green: {
          default: "#23C06B",
          50: "#e9f9f0",
          100: "#bbebd1",
          200: "#9ae2bb",
          300: "#6cd59c",
          400: "#4fcd89",
          500: "#23c06b",
          600: "#20af61",
          700: "#19884c",
          800: "#136a3b",
          900: "#0f512d",
        },
      },
      fontFamily: {
        "pop-thin": ["Poppins-Thin", "sans-serif"],
        "pop-extralight": ["Poppins-ExtraLight", "sans-serif"],
        "pop-light": ["Poppins-Light", "sans-serif"],
        "pop-regular": ["Poppins-Regular", "sans-serif"],
        "pop-medium": ["Poppins-Medium", "sans-serif"],
        "pop-semibold": ["Poppins-SemiBold", "sans-serif"],
        "pop-bold": ["Poppins-Bold", "sans-serif"],
        "pop-extrabold": ["Poppins-ExtraBold", "sans-serif"],
        "pop-black": ["Poppins-Black", "sans-serif"],
      },
    },
  },
  plugins: [],
};
