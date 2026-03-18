import { View } from "react-native";
import React, { RefObject } from "react";
import { useTheme } from "@providers/ThemeProvider";
import BottomSheet from "react-native-raw-bottom-sheet";
import { TSheetRef } from "@types_/bottomSheet";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useThemeStore } from "@stores/theme.store";

type props = {
  children: React.ReactElement;
  height?: number;
  ref: RefObject<TSheetRef | null>;
};

export default function BottomSheetContainer({
  children,
  ref,
  height = 500,
}: props) {
  const { theme } = useTheme();
  const { bottom } = useSafeAreaInsets();
  const colors = useThemeStore((st) => st.colors);
  const SheetBackgroundThemed =
    theme === "dark" ? colors["background-dark"] : colors.card;

  return (
    <BottomSheet
      ref={ref}
      draggable
      height={height}
      customStyles={{
        wrapper: {
          backgroundColor: "rgba(0,0,0,0.5)",
        },
        container: {
          backgroundColor: SheetBackgroundThemed,
          borderTopEndRadius: 10,
          borderTopStartRadius: 10,
          paddingBottom: bottom,
        },
        draggableIcon: {
          backgroundColor: colors.primary,
          height: 4,
          width: 60,
        },
      }}
      customModalProps={{ animationType: "fade", statusBarTranslucent: true }}
    >
      <View className="flex-1 p-4">{children}</View>
    </BottomSheet>
  );
}
