
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",

  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],

  theme: {
    extend: {
      colors: {
        brand: {
          primary: "var(--brand-primary)",
          hover: "var(--brand-hover)",
        },

        surface: {
          canvas: "var(--bg-canvas)",
          card: "var(--bg-surface)",
          muted: "var(--bg-muted)",
        },

        border: {
          DEFAULT: "var(--border-default)",
        },

        text: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
        },

        status: {
          available: "#16A34A",
          waitlist: "#D97706",
          conflict: "#DC2626",
          promo: "#7C3AED",
        },
      },
    },
  },

  plugins: [],
};
