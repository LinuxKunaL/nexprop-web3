import { View } from "react-native";
import Animated, {
  withSpring,
  useAnimatedStyle,
} from "react-native-reanimated";
import React from "react";

export default function Indicator({ translateX }: { translateX: number }) {
  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: withSpring(translateX * 2) }],
  }));

  return (
    <View testID="indicator" className="flex flex-row mb-2">
      <Animated.View
        style={[animatedStyles]}
        className="h-1 w-9 bg-card-secondary-dark m-1 rounded-full absolute z-10"
      />
      <View className="h-1 w-9 bg-gray-300 m-1 rounded-full" />
      <View className="h-1 w-9 bg-gray-300 m-1 rounded-full" />
      <View className="h-1 w-9 bg-gray-300 m-1 rounded-full" />
    </View>
  );
}
