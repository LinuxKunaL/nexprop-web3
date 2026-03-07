import { clsx } from "clsx";
import { View, Text } from "react-native";
import React, { useContext } from "react";
import Animated from "react-native-reanimated";
import IconButton from "@ui/IconButton";
import { ProfileContext } from "../context";

const Header = () => {
  const { headerFadeColor, onHeaderLayout, isHeaderBorder, theme } =
    useContext(ProfileContext);

  return (
    <Animated.View
      style={headerFadeColor}
      className={clsx(
        "px-4 z-10 absolute w-full border-[1px] border-transparent",
        isHeaderBorder &&
          (theme === "dark" ? "border-b-border-dark/50" : "border-b-border"),
      )}
      onLayout={onHeaderLayout}
    >
      <View className="flex-row justify-between items-center pb-5">
        <Text className="font-medium text-xl text-foreground dark:text-foreground-dark">
          Profile
        </Text>
        <IconButton name="cog-outline" iconSize={24} variant="theme" />
      </View>
    </Animated.View>
  );
};

export default Header;
