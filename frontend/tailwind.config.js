/** @type {import('tailwindcss').Config} */
export default {
  daisyui: {
    themes: ["cupcake"],
  },
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Raleway', 'sans-serif'],
      }
    },
  },
  plugins: [require("daisyui")]
}