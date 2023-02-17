/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      spacing: {
        '128': '32rem',
        '132': '34rem',
        '142': '38rem',
      }
    },
  },
  plugins: [],
}
