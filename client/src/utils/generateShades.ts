export function generateShades(
  rgbStr: string,
  factor: number = 0.2
): {
  light: string;
  normal: string;
  dark: string;
  darker: string;
} {
  const matches = rgbStr.match(/\d+/g);

  if (!matches || matches.length < 3) {
    throw new Error("Invalid RGB string. Expected format: rgb(255, 255, 255)");
  }

  const [r, g, b] = matches.map(Number);

  const clamp = (v: number): number =>
    Math.max(0, Math.min(255, v));

  // Bright for visibility
  const lighten = (v: number): number =>
    clamp(Math.round(v + (255 - v) * (factor + 0.15)));

  // Soft dark
  const darken = (v: number): number =>
    clamp(Math.round(v * (1 - factor * 0.5)));

  // Deeper dark
  const darker = (v: number): number =>
    clamp(Math.round(v * (1 - factor)));

  return {
    light: `rgb(${lighten(r)}, ${lighten(g)}, ${lighten(b)})`,
    normal: `rgb(${r}, ${g}, ${b})`,
    dark: `rgb(${darken(r)}, ${darken(g)}, ${darken(b)})`,
    darker: `rgb(${darker(r)}, ${darker(g)}, ${darker(b)})`,
  };
}