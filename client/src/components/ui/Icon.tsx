import { MaterialIcons } from "@expo/vector-icons";
import React from "react";

type IconProps = {
  name: React.ComponentProps<typeof MaterialIcons>["name"];
  size?: number;
  color?: string;
};

export default function Icon({ name, size = 24, color = "black" }: IconProps) {
  return <MaterialIcons name={name} size={size} color={color} />;
}
