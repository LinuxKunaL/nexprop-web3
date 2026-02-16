import React from "react";
import { clsx } from "clsx";
import { TIconName } from "@ui/Icon";
import {
  TouchableOpacity,
  TouchableOpacityProps,
  Vibration,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "@providers/ThemeProvider";
import { colors } from "@constants/theme";

type Props = TouchableOpacityProps & {
  color?: string;
  name: TIconName;
  iconSize?: number;
  className?: string;
  disabled?: boolean;
  onPress?: (params?: any) => void;
  onLongPress?: (params?: any) => void;
  size?: "xs" | "sm" | "md" | "lg";
  variant: "primary" | "secondary" | "tertiary" | "transparent" | "theme";
};

const IconButton: React.FC<Props> = ({
  className,
  name,
  color = "#000",
  onPress,
  disabled,
  variant,
  iconSize = 18,
  size = "sm",
  onLongPress,
}) => {
  const { theme } = useTheme();

  const themeIconColor = theme == "dark" ? colors.card : colors["card-dark"];

  const handlePress = () => {
    if (disabled) return;
    Vibration.vibrate(100);
    onPress?.();
  };

  const handleLongPress = () => {
    if (disabled) return;
    Vibration.vibrate(100);
    onLongPress?.();
  };

  const sizeClasses = {
    xs: "w-[26px] h-[26px] p-[2px]",
    sm: "w-[33px] h-[33px] p-1",
    md: "w-[40px] h-[40px] p-1.5",
    lg: "w-[47px] h-[47px] p-2",
  };

  const variantClasses = {
    primary: "bg-primary",
    secondary: "bg-muted",
    tertiary: "bg-transparent border border-primary",
    transparent: "bg-transparent",
    theme: "",
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={disabled}
      onPress={handlePress}
      onLongPress={handleLongPress}
      className={clsx(
        "items-center justify-center rounded-md",
        disabled && "opacity-50",
        sizeClasses[size],
        variantClasses[variant],
        className,
      )}
    >
      <MaterialCommunityIcons
        name={name}
        size={iconSize}
        color={variant === "theme" ? themeIconColor : color}
      />
    </TouchableOpacity>
  );
};

export default IconButton;
