/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#6C47FF",
        "primary-soft": "#D0BCFF",
        secondary: "#0EA5E9",
        background: "#0F0F13",
        surface: "#1A1A24",
        "surface-high": "#211E27",
        "text-primary": "#F1F0FF",
        "text-muted": "#7B7A8E",
        success: "#22C55E",
        error: "#EF4444",
        amber: "#FFB869"
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Geist", "Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"]
      },
      borderRadius: {
        xl: "0.75rem",
        "2xl": "1rem"
      },
      spacing: {
        "container-x": "clamp(1rem, 4vw, 4rem)"
      },
      boxShadow: {
        glow: "0 0 30px rgba(108, 71, 255, 0.22)"
      }
    }
  },
  plugins: []
};
