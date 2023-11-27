/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      "my-primary": "#1FC58D",
      "my-secondary": "#34efae",
    },
    extend: {
      fontFamily: {
        poppins: ["'Poppins', sans-serif"],
      },
    },
  },
  plugins: [require("daisyui")],
};
