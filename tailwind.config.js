/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary:   { DEFAULT: '#1D6A5A', light: '#2A9278', dark: '#14503F' },
        secondary: { DEFAULT: '#F5A623', light: '#FBBF49', dark: '#D4880A' },
        dark:      { DEFAULT: '#1E293B', sidebar: '#0F2027', hover: '#1A3540' },
        light:     { DEFAULT: '#F9F6F0', card: '#FFFFFF' },
        accent:    '#E8F5F2',
      },
      fontFamily: {
        heading: ['Nunito', 'sans-serif'],
        body:    ['Inter', 'sans-serif'],
      },
      boxShadow: {
        card:      '0 4px 20px rgba(0,0,0,0.08)',
        cardHover: '0 8px 40px rgba(0,0,0,0.14)',
        sidebar:   '4px 0 24px rgba(0,0,0,0.12)',
      },
      borderRadius: { xl: '1rem', '2xl': '1.5rem' },
    },
  },
  plugins: [],
};
