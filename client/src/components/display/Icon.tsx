import { colors } from "@constants/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "@providers/ThemeProvider";
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
  color = colors["background-dark"],
  isThemed = false,
  className,
}: IconProps) {
  const { theme } = useTheme();
  const themedColor =
    theme === "dark" ? colors.background : colors["background-dark"];

  return (
    <MaterialCommunityIcons
      name={name}
      size={size}
      color={isThemed ? themedColor : color}
      className={className}
    />
  );
}
