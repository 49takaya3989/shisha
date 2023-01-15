/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
    colors: {
      color: {
        'black': '#000',
        'white': '#fff',
        'cancel': 'rgba(59, 130, 246, .4)',
        'base': '#fdc1c1',
      },
    },
  },
  plugins: [],
}
