import {
  LayoutChangeEvent,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ViewStyle,
  StyleProp,
  ImageStyle,
} from "react-native";
import React, { createContext, useState } from "react";
import {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { useThemeStore } from "@stores/theme.store";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TTheme, useTheme } from "@providers/ThemeProvider";

type Props = {
  children: React.ReactNode[] | React.ReactNode;
};

type TContextType = {
  theme: TTheme;
  headerHeight: number;
  isHeaderBorder: boolean;

  profileZoom: StyleProp<ImageStyle> | undefined;
  headerFadeColor: StyleProp<ViewStyle> | undefined;

  onProfileLayout: (event: LayoutChangeEvent) => void;
  handleOnScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  onHeaderLayout: (event: LayoutChangeEvent) => void;
};

export const ProfileContext = createContext<TContextType>({} as TContextType);

export const ProfileProvider = ({ children }: Props) => {
  const [headerHeight, setHeaderHeight] = useState<number>(86);
  const [avatarViewHeight, setAvatarViewHeight] = useState<number>(260);
  const [isHeaderBorder, setIsHeaderBorder] = useState<boolean>(false);
  const headerOpacity = useSharedValue<number>(0);
  const colors = useThemeStore((st) => st.colors);
  const bgImageTransform = useSharedValue<number>(0);
  const { top } = useSafeAreaInsets();
  const { theme } = useTheme();

  const onProfileLayout = (event: LayoutChangeEvent) => {
    setAvatarViewHeight(event.nativeEvent.layout.height);
  };

  const handleOnScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollOffsetY = Math.round(event.nativeEvent.contentOffset.y);
    headerOpacity.set(scrollOffsetY);
    bgImageTransform.set(scrollOffsetY);

    // header Bottom Border
    const shouldShowBorder = scrollOffsetY + headerHeight > avatarViewHeight;
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

  const profileZoom = useAnimatedStyle(() => {
    const translateY = interpolate(
      bgImageTransform.value,
      [0, 100],
      [0, 50],
      "extend",
    );
    const scale = interpolate(
      bgImageTransform.value,
      [0, 100],
      [1, 1.5],
      "clamp",
    );
    return {
      transform: [{ translateY }, { scale }],
    };
  });

  return (
    <ProfileContext.Provider
      value={{
        theme,
        headerFadeColor,
        profileZoom,
        headerHeight,
        isHeaderBorder,
        onHeaderLayout,
        handleOnScroll,
        onProfileLayout,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
