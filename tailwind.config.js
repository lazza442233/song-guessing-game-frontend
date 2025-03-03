/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  theme: {
    extend: {
      colors: {
        primary: "#646cff",
        secondary: "#36c5b8",
        background: "#f4f4f9",
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-out",
        "fade-out": "fadeOut 0.3s ease-in",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(-10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeOut: {
          "0%": { opacity: "1", transform: "translateY(0)" },
          "100%": { opacity: "0", transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};
