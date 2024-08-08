/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {
      colors: {
        brightGold: '#FFC400',
        darkGold: '#664D00',
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    darkTheme: 'light',
  },
}
