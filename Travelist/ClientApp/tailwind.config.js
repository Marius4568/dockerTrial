/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    container: {
      center: true,
      screens: {
        sm: '100%',
        md: '100%',
        lg: '100%',
        xl: '1280px',
      },
    },
    colors: {
      current: 'currentColor',
      'black': '#000000',
      'black-hover': '#333',
      'white': '#ffffff',
      'green': '#177542',
      'green-hover': '#178B4C',
      'gray': '#F1F1F1',
      'gray-hover': '#E7E6E6',
      'gray-focus': '#666',
    },
  },
  plugins: [],
};
