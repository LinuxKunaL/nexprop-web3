import { createContext, useContext, useEffect } from "react";
import { colorScheme } from "nativewind";
import useAppearance from "@hooks/other/use-appearance";
import { ThemeState } from "@types_/theme";

type ThemeContextType = {
  theme: ThemeState["theme"];
};

const ThemeContext = createContext<ThemeContextType | null>(null);

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme } = useAppearance();

  useEffect(() => {
    colorScheme.set(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme }}>{children}</ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
};

export default ThemeProvider;
