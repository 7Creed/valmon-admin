/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {
      colors: {
        brightGold: '#CFB159',
        darkGold: '#8B6914',
        valmon_yellow: '#FFEBB8',
        labels: 'rgba(110, 113, 145, 1)',
        primary_bg: '#F5F1F1',
        valmon_dark: '#151212',
        valmon_Gold: '#C09742',
        valmon_menu: '#232222',
        card: '#8181A5',
        valmon_green: '#00B69B',
      },
      screens: {
        'xs': '480px', // Small mobile devices (e.g., iPhone SE)
        'sm': '640px', // Standard mobile devices (e.g., iPhone 6/7/8)
        'md': '768px', // Tablets (e.g., iPad)
        'lg': '1024px', // Small laptops and desktops
        'xl': '1280px', // Standard laptops and desktops
        'xxl': '1536px', // Large desktops and high-resolution displays
        '2xl': '1536px', // Same as xxl, for consistency with Tailwind CSS
      },

    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    darkTheme: 'light',
  },
}
