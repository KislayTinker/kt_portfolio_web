import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#070A0F",
        bg2: "#0A0E15",
        surface: "#0E141D",
        surface2: "#121A25",
        line: "rgba(126,148,178,0.12)",
        ink: "#E8EDF4",
        muted: "#9AA6B8",
        dim: "#5D6779",
        blue: "#5B8CFF",
        cyan: "#37D3E0",
        violet: "#B18CFF",
        green: "#3FDD98",
      },
      fontFamily: {
        display: ["var(--ff-display)", "system-ui", "sans-serif"],
        body: ["var(--ff-body)", "system-ui", "sans-serif"],
        mono: ["var(--ff-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
