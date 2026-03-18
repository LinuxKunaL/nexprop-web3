import React from "react";
import "../styles/global.css";
import { View } from "react-native";
import { createColorVars } from "@utils/hexToRgb";
import useAppearance from "@hooks/other/use-appearance";

type StyleProviderProps = {
  children: React.ReactNode;
};

export default function StyleProvider({ children }: StyleProviderProps) {
  const { themeTemplate } = useAppearance();

  const safeTemplate = themeTemplate ?? "default";

  return (
    <View
      key={safeTemplate}
      className="flex-1"
      style={createColorVars(safeTemplate)}
    >
      {children}
    </View>
  );
}
