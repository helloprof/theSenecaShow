/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [`./views/*.html`], // all .html files
  daisyui: {
    themes: ["halloween"],
  },
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
}

