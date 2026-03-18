import { create } from "zustand";
import { ThemeState } from "@types_/theme";
import { templateColors } from "@constants/theme";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      template: "default",
      theme: "light",
      isHydrated: false,
      colors: templateColors["default"],
      setTheme: (theme) => set({ theme }),
      setTemplate: (template) =>
        set({
          template,
          colors: templateColors[template],
        }),
    }),
    {
      name: "theme_template",
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.colors = templateColors[state.template];
        }
        useThemeStore.setState({ isHydrated: true });
      },
    },
  ),
);
