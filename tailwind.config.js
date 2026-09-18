/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#f5f7f5',
          100: '#e8ece8',
          200: '#d1d9d1',
          300: '#a8b5a8',
          400: '#7a8c7a',
          500: '#5a6e5a',
          600: '#455845',
          700: '#384638',
          800: '#2d382d',
          900: '#1a3328',
          950: '#0f1c16',
        },
        cream: {
          50: '#fafaf9',
          100: '#f5f5f4',
          200: '#e7e5e4',
          300: '#d6d3d1',
        },
        charcoal: {
          50: '#fafafa',
          100: '#f4f4f5',
          200: '#e4e4e7',
          300: '#d4d4d8',
          400: '#a1a1aa',
          500: '#71717a',
          600: '#52525b',
          700: '#3f3f46',
          800: '#27272a',
          900: '#18181b',
          950: '#09090b',
        },
        milk: {
          DEFAULT: '#fafaf9',
          soft: '#fafaf9',
        },
      },
      fontFamily: {
        sans: ['"Source Sans 3"', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        display: ['"Source Serif 4"', 'Georgia', 'Times New Roman', 'serif'],
      },
      boxShadow: {
        soft: 'none',
        card: 'none',
      },
    },
  },
  plugins: [],
};
