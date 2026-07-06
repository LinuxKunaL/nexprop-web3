export function generateDarkShades(
  rgbStr: string,
  intensity: number = 0.25
): { dark: string; darker: string } {
  const matches = rgbStr.match(/\d+/g);

  if (!matches || matches.length < 3) {
    throw new Error("Invalid RGB string. Expected format: rgb(255, 255, 255)");
  }

  const [r, g, b] = matches.map(Number);

  // --- RGB → HSL ---
  const r1 = r / 255;
  const g1 = g / 255;
  const b1 = b / 255;

  const max = Math.max(r1, g1, b1);
  const min = Math.min(r1, g1, b1);

  let h = 0;
  let s = 0;
  let l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;

    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r1:
        h = (g1 - b1) / d + (g1 < b1 ? 6 : 0);
        break;

      case g1:
        h = (b1 - r1) / d + 2;
        break;

      case b1:
        h = (r1 - g1) / d + 4;
        break;
    }

    h /= 6;
  }

  // Clamp intensity
  const i = Math.max(0.5, Math.min(2, intensity));

  // --- HSL → RGB ---
  const toRgb = (h: number, s: number, l: number): string => {
    const hue2rgb = (p: number, q: number, t: number): number => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    let r2: number;
    let g2: number;
    let b2: number;

    if (s === 0) {
      r2 = g2 = b2 = l;
    } else {
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;

      r2 = hue2rgb(p, q, h + 1 / 3);
      g2 = hue2rgb(p, q, h);
      b2 = hue2rgb(p, q, h - 1 / 3);
    }

    return `rgb(${Math.round(r2 * 255)}, ${Math.round(g2 * 255)}, ${Math.round(b2 * 255)})`;
  };

  return {
    dark: toRgb(h, s * (0.85 - 0.1 * (i - 1)), l * (0.45 / i)),
    darker: toRgb(h, s * (0.8 - 0.1 * (i - 1)), l * (0.38 / i)),
  };
}