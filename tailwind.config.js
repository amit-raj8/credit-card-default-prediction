/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'navy-dark': '#071E2B',
        'navy-secondary': '#0D2A38',
        'navy-sidebar': '#061923',
        'warm-bg': '#F7F5F0',
        'warm-card': '#FFFFFF',
        'warm-beige': '#EEE9DF',
        'gold-primary': '#C99A4A',
        'gold-muted': '#D9B875',
        'gold-light': '#F8F4EC',
        'financial-text': '#182028',
        'financial-secondary': '#6F7478',
        'financial-border': '#E4E1DB',
        'safe-green': '#2A9D72',
        'risk-yellow': '#D5AD43',
        'risk-orange': '#E69B45',
        'risk-red': '#D84C4C',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        enterprise: '0 1px 3px rgba(7, 30, 43, 0.05), 0 1px 2px rgba(7, 30, 43, 0.03)',
        card: '0 2px 8px rgba(7, 30, 43, 0.04), 0 1px 3px rgba(7, 30, 43, 0.02)',
        elevated: '0 8px 24px rgba(7, 30, 43, 0.08), 0 2px 6px rgba(7, 30, 43, 0.04)',
      }
    },
  },
  plugins: [],
}
