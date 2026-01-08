import React from "react";
import { TouchableOpacity, Vibration } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { clsx } from "clsx";
import { TIconName } from "@ui/Icon";

type Props = {
  className?: string;
  onPress?: (params?: any) => void;
  onLongPress?: (params?: any) => void;
  variant: "primary" | "secondary" | "tertiary" | "transparent";
  size?: "xs" | "sm" | "md" | "lg";
  name: TIconName;
  color?: string;
  iconSize?: number;
  disabled?: boolean;
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
        className
      )}
    >
      <MaterialCommunityIcons name={name} size={iconSize} color={color} />
    </TouchableOpacity>
  );
};

export default IconButton;
