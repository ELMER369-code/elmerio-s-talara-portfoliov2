/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          deep: '#0a192f',
        },
        silver: '#ccd6f6',
        cyan: {
          electric: '#64ffda',
        },
      },
      fontFamily: {
        mono: ['"Space Mono"', '"Courier Prime"', 'monospace'],
        sans: ['"Inter"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
