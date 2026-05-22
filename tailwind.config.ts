import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["Orbitron", "monospace"],
        body:    ["DM Sans",  "sans-serif"],
        mono:    ["JetBrains Mono", "monospace"],
      },
      colors: {
        cyber: {
          black:  "#020409",
          dark:   "#080d1a",
          card:   "#0a1628",
          border: "#0e2040",
          cyan:   "#00e5ff",
          teal:   "#00b4d8",
          blue:   "#0077b6",
          accent: "#64ffda",
          muted:  "#4a5568",
          text:   "#c8d6e5",
          dim:    "#8892a4",
        },
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(rgba(0,229,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.03) 1px, transparent 1px)",
        "hero-gradient":
          "radial-gradient(ellipse 80% 60% at 50% -20%, rgba(0,180,216,0.15) 0%, transparent 70%)",
        "glow-cyan":
          "radial-gradient(circle, rgba(0,229,255,0.15) 0%, transparent 70%)",
      },
      backgroundSize: {
        grid: "60px 60px",
      },
      animation: {
        "fade-up":    "fadeUp 0.8s ease forwards",
        "fade-in":    "fadeIn 1s ease forwards",
        "pulse-slow": "pulseSlow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float":      "float 6s ease-in-out infinite",
        "border-glow":"borderGlow 2s ease-in-out infinite alternate",
        "scan-line":  "scanLine 8s linear infinite",
        "spin":       "spin 1s linear infinite",
      },
      keyframes: {
        fadeUp: {
          "0%":   { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)"    },
        },
        fadeIn: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        pulseSlow: {
          "0%, 100%": { opacity: "1"   },
          "50%":      { opacity: "0.4" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)"   },
          "50%":      { transform: "translateY(-12px)" },
        },
        borderGlow: {
          "0%":   { boxShadow: "0 0 5px rgba(0,229,255,0.3),  inset 0 0 5px  rgba(0,229,255,0.1)"  },
          "100%": { boxShadow: "0 0 20px rgba(0,229,255,0.6), inset 0 0 15px rgba(0,229,255,0.15)" },
        },
        scanLine: {
          "0%":   { transform: "translateY(-100%)"  },
          "100%": { transform: "translateY(100vh)"  },
        },
        spin: {
          "0%":   { transform: "rotate(0deg)"   },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      boxShadow: {
        "cyber-sm": "0 0 10px rgba(0,229,255,0.2)",
        "cyber-md": "0 0 25px rgba(0,229,255,0.3)",
        "cyber-lg": "0 0 50px rgba(0,229,255,0.4)",
        "glass":    "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)",
      },
      transitionDuration: {
        "400": "400ms",
        "600": "600ms",
      },
    },
  },
  plugins: [],
};

export default config;