/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#9558a8',
          hover: '##6d387d',
          text: '#ddd'
        }
      }
    },
  },
  plugins: [],
}