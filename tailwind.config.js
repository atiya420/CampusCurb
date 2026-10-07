/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        peach: {
          50: '#FFF9F5',
          100: '#FFF1E6',
          200: '#FFE5D4',
          300: '#FFE8D8',
          400: '#FFD9C0',
        },
        accent: {
          DEFAULT: '#E76F51',
          light: '#F4A261',
        },
        ink: {
          DEFAULT: '#292522',
          muted: '#756F69',
        },
        border: {
          peach: '#EBD8CA',
        },
        green: {
          soft: '#5C8D62',
        },
      },
      fontFamily: {
        sans: ['Manrope', 'Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        'eyebrow': '0.18em',
      },
      animation: {
        'fade-up': 'fadeUp 0.7s ease-out forwards',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'count': 'countUp 1s ease-out forwards',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
