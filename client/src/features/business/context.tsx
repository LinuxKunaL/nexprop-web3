import {
  LayoutChangeEvent,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ViewStyle,
  StyleProp,
} from "react-native";
import React, { createContext, useState } from "react";
import {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TTheme, useTheme } from "@providers/ThemeProvider";
import { useThemeStore } from "@stores/theme.store";

type Props = {
  children: React.ReactNode[] | React.ReactNode;
};

type TContextType = {
  theme: TTheme;
  headerHeight: number;
  isHeaderBorder: boolean;

  headerFadeColor: StyleProp<ViewStyle> | undefined;

  onBusinessAvatarLayout: (event: LayoutChangeEvent) => void;
  handleOnScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  onHeaderLayout: (event: LayoutChangeEvent) => void;
};

export const BuinessContext = createContext<TContextType>({} as TContextType);

export const BuinessProvider = ({ children }: Props) => {
  const [headerHeight, setHeaderHeight] = useState<number>(86);
  const [businessAvatarHeight, setBusinessAvatarHeight] = useState<number>(260);
  const [isHeaderBorder, setIsHeaderBorder] = useState<boolean>(false);
  const headerOpacity = useSharedValue<number>(0);
  const colors = useThemeStore((st) => st.colors);
  const { top } = useSafeAreaInsets();
  const { theme } = useTheme();

  const onBusinessAvatarLayout = (event: LayoutChangeEvent) => {
    setBusinessAvatarHeight(event.nativeEvent.layout.height);
  };

  const handleOnScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollOffsetY = Math.round(event.nativeEvent.contentOffset.y);
    headerOpacity.set(scrollOffsetY);

    // header Bottom Border
    const shouldShowBorder = scrollOffsetY + headerHeight > businessAvatarHeight;
    if (shouldShowBorder !== isHeaderBorder) {
      setIsHeaderBorder(shouldShowBorder);
    }
  };

  const onHeaderLayout = (event: LayoutChangeEvent) => {
    setHeaderHeight(event.nativeEvent.layout.height);
  };

  const headerFadeColor = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      headerOpacity.value,
      [0, 150],
      [
        "rgba(0,0,0,0)",
        theme === "dark" ? colors["background-dark"] : colors.card,
      ],
    );
    return {
      backgroundColor,
      paddingTop: top,
    };
  });

  return (
    <BuinessContext.Provider
      value={{
        theme,
        headerFadeColor,
        headerHeight,
        isHeaderBorder,
        onHeaderLayout,
        handleOnScroll,
        onBusinessAvatarLayout,
      }}
    >
      {children}
    </BuinessContext.Provider>
  );
};
