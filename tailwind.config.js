/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class', // ← aktifkan dark mode berbasis class
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#e8edf5',
          100: '#c5d0e6',
          200: '#9fb1d5',
          300: '#7892c4',
          400: '#5a7ab7',
          500: '#3c62aa',
          600: '#2e4f8e',
          700: '#1e3670',
          800: '#132050',
          900: '#0a1230',
        },
        surface: '#f8fafc',
        'surface-2': '#f1f5f9',
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgba(0,0,0,0.06), 0 1px 2px 0 rgba(0,0,0,0.04)',
        'card-hover': '0 10px 25px -5px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)',
      },
    },
  },
  plugins: [],
};
