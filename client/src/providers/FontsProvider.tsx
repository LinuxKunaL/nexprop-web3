import { useFonts } from "expo-font";
import React, { ReactNode } from "react";

type FontsProviderProps = {
  children: ReactNode;
};

export default function FontsProvider({ children }: FontsProviderProps) {
  const [loaded] = useFonts({
    RubikRegular: require("../assets/fonts/Rubik-Regular.ttf"),
    RubikMedium: require("../assets/fonts/Rubik-Medium.ttf"),
    RubikSemiBold: require("../assets/fonts/Rubik-SemiBold.ttf"),
    RubikBold: require("../assets/fonts/Rubik-Bold.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return <React.Fragment>{children}</React.Fragment>;
}
