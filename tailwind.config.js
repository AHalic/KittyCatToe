/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        "area": 'repeat(3, minmax(0, 6rem))',
      },
    },
    fontFamily: {
      'sans': ['"Roboto"', 'sans-serif'],
      'mono': ['"Roboto Mono"', 'monospace'],
      'hand': ['"Patrick Hand"', 'sans-serif'],
      'play': ['"Playpen Sans"', 'sans-serif'],
    }
  },
  plugins: [],
}

