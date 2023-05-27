/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      height:{
        'dd':"200px"
      },
      backgroundColor:{
        'white':"white"
      },
      colors: {
        'rose': '#D1825B',
      }
    },
  },
  plugins: [],
}
