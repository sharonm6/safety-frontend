/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'light-purple': '#512589'
      },
    },
  },
  plugins: [require("@headlessui/tailwindcss")],
};
