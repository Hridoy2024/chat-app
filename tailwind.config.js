/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#11175D",
        secondary: "#5F35F5",
      },
    },

    fontFamily: {
      nunito: ["Nunito", "sans-serif"],
      opensans: ['Open Sans', 'sans-serif'],
    
    },
  },
  plugins: [],
};
