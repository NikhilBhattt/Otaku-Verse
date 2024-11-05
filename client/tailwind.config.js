/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'b612': ['B612', 'sans-serif'],
        'bebas': ['Bebas Neue', 'cursive'],
        'inter': ['Inter', 'sans-serif'],
        'kaushan': ['Kaushan Script', 'cursive'],
        'orbitron': ['Orbitron', 'sans-serif'],
        'shojumaru': ['Shojumaru', 'cursive']
      }
    },
  },
  plugins: [],
}