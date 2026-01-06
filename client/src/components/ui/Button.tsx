import React from "react";
import { Text, TouchableOpacity, Vibration } from "react-native";
import clsx from "clsx";

type Props = {
  children: string | React.ReactNode | React.ReactNode[];
  onPress?: (params?: any) => void;
  onLongPress?: (params?: any) => void;
  variant: "solid" | "secondary" | "ghost" | "gray";
  size: "xs" | "sm" | "md" | "lg";
  fontSize: "xs" | "sm" | "md" | "lg";
  disabled?: boolean;
  textColor?: string;
  className?: string;
};

const Button: React.FC<Props> = ({
  children,
  onPress,
  onLongPress,
  variant,
  size,
  fontSize,
  disabled,
  textColor,
  className,
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
        className,
        "w-full items-center justify-center rounded-xl",
        disabled && "opacity-70",
        variant === "solid" && "bg-primary",
        variant === "secondary" && "bg-black border border-primary",
        variant === "ghost" && "bg-primary/30",
        variant === "gray" && "bg-gray-600",
        size === "xs" && "p-1",
        size === "sm" && "p-2",
        size === "md" && "p-3",
        size === "lg" && "p-4"
      )}
    >
      <Text
        className={clsx(
          "font-semibold text-center",
          fontSize === "xs" && "text-xs",
          fontSize === "sm" && "text-sm",
          fontSize === "md" && "text-base",
          fontSize === "lg" && "text-lg",
          !textColor && "text-white",
          variant === "ghost" && "text-primary"
        )}
        style={textColor ? { color: textColor } : undefined}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
