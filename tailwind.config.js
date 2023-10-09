/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./resources/**/*.{js,vue,php}"],
  theme: {
    extend: {
      colors: {
        "hydra-cinder-600": "#192436",
        "hydra-cinder-800": "#10121f",
        "hydra-green-300": "#49a890",
      },
      maxWidth: {
        "8xl": "90rem",
      },
    },
  },
  plugins: [],
};
