/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        sage: {
          50: '#f7faf7',
          100: '#f0f5f0',
          200: '#dde7db',
          300: '#c9d8c5',
          400: '#a1bf96',
          500: '#7aa668',
          600: '#5f8a4f',
          700: '#4a6b3e',
          800: '#3a5330',
          900: '#2d4226',
        },
        clay: {
          50: '#faf8f5',
          100: '#f4efeb',
          200: '#e8dcd2',
          300: '#dcc9b8',
          400: '#c9a383',
          500: '#b57d4f',
          600: '#9d6c41',
          700: '#805a35',
          800: '#66472b',
          900: '#523922',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },
    },
  },
  plugins: [],
};
