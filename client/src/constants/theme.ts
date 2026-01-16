export const colors = {
  /* ---------- LIGHT ---------- */
  background: "#F5F5F5",
  card: "#FFFFFF",

  foreground: "#0F0F0F",
  muted: "#5C5C5C",

  border: "#E0E0E0",

  primary: "#14B8A6",

  /* ---------- DARK ---------- */

  "background-dark": "#111315",
  "card-dark": "#1A1C1E",
  "card-secondary-dark": "#2D2F31",

  "foreground-dark": "#FFFFFF",
  "muted-dark": "#B4B6B8",

  "border-dark": "#5C5C5C",
} as const;

export type ThemeColors = typeof colors;
