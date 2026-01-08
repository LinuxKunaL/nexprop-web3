import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";

type IconProps = {
  name: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
  size?: number;
  color?: string;

  className?:string
};

export type TIconName = React.ComponentProps<
  typeof MaterialCommunityIcons
>["name"];

export default function Icon({ name, size = 24, color = "black",className }: IconProps) {
  return <MaterialCommunityIcons name={name} size={size} color={color} className={className}/>;
}
