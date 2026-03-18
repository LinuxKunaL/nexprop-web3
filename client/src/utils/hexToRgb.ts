import { templateColors, TemplateName } from "@constants/theme";
import { vars } from "nativewind";

const hexToRgb = (color: string) => {
  if (color.startsWith("rgb")) {
    const values = color
      .replace(/^rgba?\(|\)$/g, "")
      .split(",")
      .map((v) => v.trim());

    const [r, g, b] = values;
    return `${r} ${g} ${b}`;
  }

  let hex = color.replace("#", "");

  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((c) => c + c)
      .join("");
  }

  const bigint = parseInt(hex, 16);

  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return `${r} ${g} ${b}`;
};

export const createColorVars = (template: TemplateName) => {
  const colors = templateColors[template];

  const result: Record<string, string> = {};

  Object.entries(colors).forEach(([key, value]) => {
    const cssVar = `--color-${key}`;

    result[cssVar] = hexToRgb(value);
  });

  return vars(result);
};
