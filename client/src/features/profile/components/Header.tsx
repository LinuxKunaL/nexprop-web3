import { clsx } from "clsx";
import IconButton from "@components/buttons/IconButton";
import { View, Text } from "react-native";
import React, { useContext } from "react";
import { ProfileContext } from "../context";
import ScreenHeader from "@components/layout/ScreenHeader";
import Animated from "react-native-reanimated";

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
      <ScreenHeader
        title="Profile"
        icon={{ name: "cog-outline", variant: "theme" }}
      />
    </Animated.View>
  );
};

export default Header;
