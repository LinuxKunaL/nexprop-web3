import { TColors, TemplateName } from "@constants/theme";

export type ThemeState = {
  template: TemplateName;
  theme: "light" | "dark" | "system";
  isHydrated: boolean;
  setTemplate: (template: TemplateName) => void;
  setTheme: (theme: "light" | "dark" | "system") => void;
  colors: TColors;
};
