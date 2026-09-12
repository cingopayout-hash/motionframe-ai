/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        studio: {
          900: '#0a0a0c',
          800: '#121318',
          700: '#1c1e26',
          600: '#2a2d3a',
        }
      }
    },
  },
  plugins: [],
}
