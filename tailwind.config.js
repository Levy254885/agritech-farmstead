/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#f2f7f4',
          100: '#e0ebe4',
          200: '#c3d7cb',
          300: '#9bbba3',
          400: '#6d9977',
          500: '#4d7c58',
          600: '#3a6345',
          700: '#2f4f38',
          800: '#243d2c',
          900: '#1e3a2f',
          950: '#0f1f18',
        },
        cream: {
          50: '#fefdfb',
          100: '#fdf9f3',
          200: '#faf3e6',
          300: '#f5e8d0',
        },
        charcoal: {
          50: '#f7f7f6',
          100: '#e8e8e6',
          200: '#d1d1ce',
          300: '#b0b0ab',
          400: '#888882',
          500: '#6d6d67',
          600: '#5a5a55',
          700: '#4a4a46',
          800: '#3d3d3a',
          900: '#2c2c2a',
          950: '#1a1a18',
        },
        milk: {
          DEFAULT: '#f8f6f1',
          soft: '#faf8f4',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        display: ['Fraunces', 'Georgia', 'Times New Roman', 'serif'],
      },
      fontSize: {
        'display-xl': ['4.5rem', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-lg': ['3.5rem', { lineHeight: '1.08', letterSpacing: '-0.02em' }],
        'display-md': ['2.75rem', { lineHeight: '1.12', letterSpacing: '-0.015em' }],
        'display-sm': ['2.25rem', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
      },
      spacing: {
        18: '4.5rem',
        22: '5.5rem',
        30: '7.5rem',
        34: '8.5rem',
      },
      maxWidth: {
        '8xl': '88rem',
      },
      boxShadow: {
        soft: '0 4px 24px -4px rgba(30, 58, 47, 0.08)',
        card: '0 2px 12px -2px rgba(30, 58, 47, 0.06)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
