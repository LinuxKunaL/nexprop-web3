import { useTheme } from "@providers/ThemeProvider";
import { useThemeStore } from "@stores/theme.store";
import React from "react";
import { View, StyleSheet } from "react-native";
import Svg, { Circle } from "react-native-svg";

type Props = {
  size?: number;
  strokeWidth?: number;
  progress?: number;
  className?: string;
  children?: React.ReactNode;
};

const CircleWithStroke = ({
  size = 70,
  strokeWidth = 3,
  progress = 50,
  className = "",
  children,
}: Props) => {
  const radius = (size - strokeWidth) / 2;
  const center = size / 2;
  const circumference = 2 * Math.PI * radius - 3;

  const { theme } = useTheme();
  const colors = useThemeStore((st) => st.colors);

  const strokeColor =
    theme === "dark" ? colors["border-dark/30"] : colors["border/70"];

  const dashOffset = circumference - (circumference * progress) / 100;

  return (
    <View
      className={`justify-center items-center ${className}`}
      style={{ width: size, height: size }}
    >
      <Svg
        width={size}
        height={size}
        style={[
          StyleSheet.absoluteFillObject,
          { transform: [{ rotate: "182deg" }] },
        ]}
      >
        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={dashOffset + 1}
          strokeLinecap="square"
        />
      </Svg>
      <View
        className="items-center justify-center overflow-hidden"
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
        }}
      >
        {children}
      </View>
    </View>
  );
};

export default CircleWithStroke;
