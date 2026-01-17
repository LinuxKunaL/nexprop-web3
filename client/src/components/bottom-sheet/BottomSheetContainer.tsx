import { View } from "react-native";
import React, { RefObject, useRef } from "react";
import { colors } from "@constants/theme";
import { useTheme } from "@providers/ThemeProvider";
import BottomSheet from "react-native-raw-bottom-sheet";
import { TSheetRef } from "@types_/bottomSheet";
import { useSafeAreaInsets } from "react-native-safe-area-context";

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
