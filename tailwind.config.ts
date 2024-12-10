import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // tango
        primary: {
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
          800: "#92400e",
          900: "#78350f",
          950: "#451a03",
        },
        destructive: "#ff0035",
        // carnation
        accent: "#f2414c",
        white: "#ffffff",
        black: "#000",
        white_powder: "#fdfdfd",
      },
      fontSize: {
        display: [
          "4rem",
          {
            lineHeight: "100%",
            fontWeight: "700",
          },
        ],
        "title-lg": [
          "1.5rem",
          {
            lineHeight: "100%",
            fontWeight: "700",
          },
        ],
        "title-base": [
          "1.2rem",
          {
            lineHeight: "100%",
            fontWeight: "700",
          },
        ],
        "title-sm": [
          "1rem",
          {
            lineHeight: "100%",
            fontWeight: "700",
          },
        ],
        "title-xs": [
          "0.75rem",
          {
            lineHeight: "100%",
            fontWeight: "600",
          },
        ],
        "body-lg": [
          "1.2rem",
          {
            lineHeight: "100%",
            fontWeight: "400",
          },
        ],
        "body-base": [
          "1rem",
          {
            lineHeight: "100%",
            fontWeight: "400",
          },
        ],
        "body-sm": [
          "0.75rem",
          {
            lineHeight: "100%",
            fontWeight: "400",
          },
        ],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
