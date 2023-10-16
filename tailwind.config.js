/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./resources/**/*.{js,vue,php}"],
  theme: {
    extend: {
      colors: {
        "hydra-amber-600": "#df9312",
        "hydra-amber-700": "#da8508",
        "hydra-cinder-300": "#415E8A",
        "hydra-cinder-400": "#2b3f5c",
        "hydra-cinder-500": "#1E2C42",
        "hydra-cinder-600": "#192436",
        "hydra-cinder-800": "#10121f",
        "hydra-cinder-900": "#01051F",
        "hydra-green-300": "#49a890",
        "hydra-green-500": "#346f78",
        "hydra-green-700": "#2a505f",
      },
      maxWidth: {
        "8xl": "90rem",
      },
    },
  },
  plugins: [],
};
