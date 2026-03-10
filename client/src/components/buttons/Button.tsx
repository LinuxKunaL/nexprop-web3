import React from "react";
import clsx from "clsx";
import Icon, { TIconName } from "@components/display/Icon";
import { Text, TouchableOpacity, Vibration } from "react-native";

type VariantType =
  | "solid"
  | "secondary"
  | "ghost"
  | "gray"
  | "transparent"
  | "danger"

type SizeType = "xs" | "sm" | "md" | "lg";

type Props = {
  disabled?: boolean;
  textColor?: string;
  className?: string;
  onPress?: (params?: any) => void;
  onLongPress?: (params?: any) => void;
  children: string | React.ReactNode | React.ReactNode[];
  icon?: {
    name: TIconName;
    color?: string;
    size?: number;
  };
  size?: SizeType;
  fontSize?: SizeType;
  variant?: VariantType;
};

const variantStyles: Record<VariantType, string> = {
  solid: "bg-primary",
  secondary: "bg-card-secondary-dark",
  ghost: "bg-primary/30",
  gray: "bg-gray-600",
  transparent: "",
  danger: "bg-red-600",
};

const textVariantStyles: Record<VariantType, string> = {
  solid: "text-white",
  secondary: "text-white",
  ghost: "text-primary",
  gray: "text-white",
  transparent: "text-primary",
  danger: "text-white",
};

const sizeStyles: Record<SizeType, string> = {
  xs: "p-1",
  sm: "p-2",
  md: "p-3",
  lg: "p-4",
};

const fontSizeStyles: Record<SizeType, string> = {
  xs: "text-xs",
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
};

const Button: React.FC<Props> = ({
  disabled,
  textColor,
  className,
  onPress,
  onLongPress,
  children,
  icon,
  size = "md",
  fontSize = "md",
  variant = "solid",
}) => {
  const handlePress = () => {
    Vibration.vibrate(100);
    onPress?.();
  };

  const handleLongPress = () => {
    Vibration.vibrate(100);
    onLongPress?.();
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={disabled}
      onPress={handlePress}
      onLongPress={handleLongPress}
      className={clsx(
        "items-center justify-center rounded-xl flex-row gap-2",
        variantStyles[variant],
        sizeStyles[size],
        disabled && "opacity-70",
        className
      )}
    >
      {icon && (
        <Icon
          name={icon.name}
          color={icon.color}
          size={icon.size}
        />
      )}

      <Text
        className={clsx(
          "font-semibold text-center",
          fontSizeStyles[fontSize],
          !textColor && textVariantStyles[variant]
        )}
        style={textColor ? { color: textColor } : undefined}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;