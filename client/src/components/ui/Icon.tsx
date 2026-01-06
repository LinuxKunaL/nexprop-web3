import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";

type IconProps = {
  name: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
  size?: number;
  color?: string;
};

export default function Icon({ name, size = 24, color = "black" }: IconProps) {
  return <MaterialCommunityIcons name={name} size={size} color={color} />;
}
