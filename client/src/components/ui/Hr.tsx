import { View } from "react-native";
import React from "react";
import clsx from "clsx";

type Props = {
  height?: "h-[1px]" | "h-[2px]" | "h-[3px]";
};

const Hr = ({ height = "h-[1px]" }: Props) => {
  return <View className={clsx("bg-muted-dark/30 dark:bg-muted/30", height)} />;
};

export default Hr;
