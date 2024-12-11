/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
      },
    },
  },
  plugins: [],
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
};
