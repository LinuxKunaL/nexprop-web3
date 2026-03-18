/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/features/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: "rgb(var(--color-background) / <alpha-value>)",
        card: "rgb(var(--color-card) / <alpha-value>)",

        foreground: "rgb(var(--color-foreground) / <alpha-value>)",
        muted: "rgb(var(--color-muted) / <alpha-value>)",

        border: "rgb(var(--color-border) / <alpha-value>)",

        primary: "rgb(var(--color-primary) / <alpha-value>)",

        /* DARK */
        "background-dark": "rgb(var(--color-background-dark) / <alpha-value>)",
        "card-dark": "rgb(var(--color-card-dark) / <alpha-value>)",
        "card-secondary-dark": "rgb(var(--color-card-secondary-dark) / <alpha-value>)",

        "foreground-dark": "rgb(var(--color-foreground-dark) / <alpha-value>)",
        "muted-dark": "rgb(var(--color-muted-dark) / <alpha-value>)",

        "border-dark": "rgb(var(--color-border-dark) / <alpha-value>)",
        success: "rgb(var(--color-success) / <alpha-value>)",
        danger:"rgb(var(--color-danger) / <alpha-value>)"
      },
      fontFamily: {
        sans: ["RubikRegular"],
        medium: ["RubikMedium"],
        semibold: ["RubikSemiBold"],
        bold: ["RubikBold"],
      },
    },
  },
  plugins: [],
};
