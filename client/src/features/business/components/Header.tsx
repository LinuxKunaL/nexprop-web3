import clsx from "clsx";
import React, { useContext } from "react";
import ScreenHeader from "@components/layout/ScreenHeader";
import Animated from "react-native-reanimated";
import { BuinessContext } from "../context";
import { useRouter } from "expo-router";

const Header = () => {
  const { headerFadeColor, onHeaderLayout, isHeaderBorder, theme } =
    useContext(BuinessContext);
  const router = useRouter();

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
        title="My Business"
        backButtonVisble
        icon={{ name: "pencil", variant: "theme" }}
        onPressIcon={() => router.navigate("/business/100/edit")}
      />
    </Animated.View>
  );
};

export default Header;
