import { useThemeStore } from "@stores/theme.store";

const useAppearance = () => {
  const themeTemplate = useThemeStore((s) => s.template);
  const setThemeTemplate = useThemeStore((s) => s.setTemplate);

  const theme = useThemeStore((s) => s.theme);
  const setTheme = useThemeStore((s) => s.setTheme);

  const switchTemplate = (template: typeof themeTemplate) => {
    setThemeTemplate(template);
  };

  const switchTheme = (_theme: typeof theme) => {
    setTheme(_theme);
  };

  return { switchTemplate, switchTheme, themeTemplate, theme };
};

export default useAppearance;
