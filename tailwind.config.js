/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        'bg-primary': 'var(--color-primary)',
        'bg-secondary': 'var(--color-secondary)',
        'bg-primary-opacity': 'var(--color-primary-opacity)',
        'dark-primary-opacity': 'rgba(28, 33, 40, 0.5)',
        'text-primary': '#0D003F',
        'text-secondary': '#F9F7FF',
        'text-primary-opacity': '#0d003f42',
        'color-primary': 'var(--color-primary)',
        'color-secondary': 'var(--color-secondary)',
        'dark-primary': '#1c2128',
        'dark-secondary': '#2d333b',
        'dark-text-primary': '#adbac7',
        'dark-text-secondary': '#444c56',
        'border-primary': '#0D003F', 
        'border-secondary': '#FFFFFF', 
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'slide-in-right': {
          from: { transform: 'translateX(0)'},
          to: { transform: 'translateX(-100%)' },
        },
        'slide-out-right': {
          from: { transform: 'translateX(-100%)'},
          to: { transform: 'translateX(0)'},
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'slide-in-right': 'slide-in-right 0.3s ease-out forwards',
        'slide-out-right': 'slide-out-right 0.3s ease-in forwards',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
