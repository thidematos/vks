/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        montserrat: "Montserrat",
        vks: "Bebas Neue",
        lato: "Lato",
      },
      animation: {
        "spin-slow": "spin 2s linear infinite",
      },
      colors: {
        blueTeam: "#238dca",
        redTeam: "#9e2c25",
      },
    },
  },
  plugins: [],
};
