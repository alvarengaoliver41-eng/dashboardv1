import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#06142A",
          900: "#0B2447",
          800: "#19376D",
          700: "#1E4080",
          600: "#2D5AA0",
          500: "#576CBC",
          400: "#7B8FCC",
          300: "#A5B4DB",
          200: "#D0D8EE",
          100: "#EEF2FF",
          50:  "#F5F7FF",
        },
      },
      fontFamily: {
        sans: ["var(--font-montserrat)", "Montserrat", "sans-serif"],
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.25rem",
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
