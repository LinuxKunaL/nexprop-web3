import React from "react";
import clsx from "clsx";
import Icon from "./Icon";
import { Text, TouchableOpacity, Vibration } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type Props = {
  disabled?: boolean;
  textColor?: string;
  className?: string;
  onPress?: (params?: any) => void;
  onLongPress?: (params?: any) => void;
  children: string | React.ReactNode | React.ReactNode[];
  icon?: {
    name: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
    color?: string;
    size?: number;
  };
  size: "xs" | "sm" | "md" | "lg";
  fontSize: "xs" | "sm" | "md" | "lg";
  variant: "solid" | "secondary" | "ghost" | "gray";
};

const Button: React.FC<Props> = (props) => {
  const handlePress = () => {
    Vibration.vibrate(100);
    props.onPress?.();
  };

  const handleLongPress = () => {
    Vibration.vibrate(100);
    props.onLongPress?.();
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={props.disabled}
      onPress={handlePress}
      onLongPress={handleLongPress}
      className={clsx(
        props.className,
        "w-full items-center justify-center rounded-xl flex flex-row gap-1",
        props.disabled && "opacity-70",
        props.variant === "solid" && "bg-primary",
        props.variant === "secondary" && "bg-black border border-primary",
        props.variant === "ghost" && "bg-primary/30",
        props.variant === "gray" && "bg-gray-600",
        props.size === "xs" && "p-1",
        props.size === "sm" && "p-2",
        props.size === "md" && "p-3",
        props.size === "lg" && "p-4"
      )}
    >
      {props.icon && (
        <Icon
          name={props.icon.name}
          color={props.icon.color}
          size={props.icon.size}
        />
      )}
      <Text
        className={clsx(
          "font-semibold text-center",
          props.fontSize === "xs" && "text-xs",
          props.fontSize === "sm" && "text-sm",
          props.fontSize === "md" && "text-base",
          props.fontSize === "lg" && "text-lg",
          !props.textColor && "text-white",
          props.variant === "ghost" && "text-primary"
        )}
        style={props.textColor ? { color: props.textColor } : undefined}
      >
        {props.children}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
