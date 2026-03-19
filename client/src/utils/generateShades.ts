export function generateShades(rgbStr: string, factor = 0.2) {
  if (rgbStr) {
    const [r, g, b] = rgbStr.match(/\d+/g).map(Number);

  const clamp = (v) => Math.max(0, Math.min(255, v));

  // Bright for visibility
  const lighten = (v) =>
    clamp(Math.round(v + (255 - v) * (factor + 0.15)));

  // Soft dark
  const darken = (v) =>
    clamp(Math.round(v * (1 - factor * 0.5)));

  // Deeper dark (but still controlled)
  const darker = (v) =>
    clamp(Math.round(v * (1 - factor)));

  return {
    light: `rgb(${lighten(r)}, ${lighten(g)}, ${lighten(b)})`,
    normal: `rgb(${r}, ${g}, ${b})`,
    dark: `rgb(${darken(r)}, ${darken(g)}, ${darken(b)})`,
    darker: `rgb(${darker(r)}, ${darker(g)}, ${darker(b)})`,
  };
  }
}
