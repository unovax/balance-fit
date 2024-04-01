/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#9558a8',
          hover: '#6d387d',
          text: '#CCC'
        },
        danger: {
          DEFAULT: '#FF4136',
          hover: '#D13933',
          text: '#CCC'
        }
      }
    },
  },
  plugins: [],
}