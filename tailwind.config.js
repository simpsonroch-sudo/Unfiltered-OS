/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f4f7ff',
          100: '#e9eeff',
          600: '#4f46e5',
          700: '#4338ca',
          900: '#1f1b4d',
        },
      },
      boxShadow: {
        card: '0 6px 24px rgba(15, 23, 42, 0.08)',
      },
    },
  },
  plugins: [],
};
