import type { Config } from 'tailwindcss'

const config = {
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
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      colors: {
        primary: {
          '50': '#FDE4CD',
          '100': '#FCD6B4',
          '200': '#FBC89B',
          '300': '#F9AD69',
          '400': '#F79137',
          '500': '#F57605',
          '600': '#C45E04',
          '700': '#934703',
          '800': '#622F02',
          '900': '#4A2302',
          '950': '#311801',
        },
      },
      gridTemplateColumns: {
        home: '439px 1fr',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config

export default config
