/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        "primary-soft": "var(--color-primary-soft)",
        secondary: "var(--color-secondary)",
        background: "var(--color-background)",
        surface: "var(--color-surface)",
        "surface-high": "var(--color-surface-high)",
        "text-primary": "var(--color-text-primary)",
        "text-muted": "var(--color-text-muted)",
        border: "var(--color-border)",
        success: "var(--color-success)",
        error: "var(--color-error)",
        amber: "#FFB869"
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Geist", "Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"]
      },
      borderRadius: {
        xl: "0.5rem",
        "2xl": "0.75rem"
      },
      spacing: {
        "container-x": "clamp(1rem, 4vw, 4rem)"
      },
      boxShadow: {
        glow: "0 0 30px rgba(108, 71, 255, 0.15)"
      }
    }
  },
  plugins: []
};
