/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Quicksand', 'Arial', 'sans-serif'],
        'serif': ['Quicksand', 'Georgia', 'serif'],
        'mono': ['Quicksand', 'Courier New', 'monospace']
      },
      backgroundColor: {
        'custom-bg': 'rgba(240, 240, 240, 0.3)',
      },
      width: {
        'fit-content': 'fit-content',
      },
    },
  },
  plugins: ['prettier-plugin-tailwindcss'],
}
