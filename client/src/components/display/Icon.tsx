import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "@providers/ThemeProvider";
import { useThemeStore } from "@stores/theme.store";
import React from "react";

type IconProps = {
  name: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
  size?: number;
  color?: string;
  isThemed?: boolean;
  className?: string;
};

export type TIconName = React.ComponentProps<
  typeof MaterialCommunityIcons
>["name"];

export default function Icon({
  name,
  size = 24,
  color,
  isThemed = false,
  className,
}: IconProps) {
  const { theme } = useTheme();

  // ✅ hook inside component
  const colors = useThemeStore((st) => st.colors);

  const defaultColor = colors["background-dark"];

  const themedColor =
    theme === "dark" ? colors.background : colors["background-dark"];

  return (
    <MaterialCommunityIcons
      name={name}
      size={size}
      color={isThemed ? themedColor : (color ?? defaultColor)}
      className={className}
    />
  );
}
