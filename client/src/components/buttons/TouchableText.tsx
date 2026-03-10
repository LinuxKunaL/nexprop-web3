import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";
import React from "react";

type TTouchableTextProps = TouchableOpacityProps & {
  children?: string;
  textClassName?: string;
};

export default function TouchableText(props: TTouchableTextProps) {
  return (
    <TouchableOpacity {...props} activeOpacity={0.5}>
      <Text className={props.textClassName}>{props.children}</Text>
    </TouchableOpacity>
  );
}
