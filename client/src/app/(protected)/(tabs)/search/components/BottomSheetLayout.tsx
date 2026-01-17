import Button from "@ui/Button";
import IconButton from "@ui/IconButton";
import React, { RefObject } from "react";
import { View, Text } from "react-native";
import { TSheetRef } from "@types_/bottomSheet";
import BottomSheetContainer from "@components/bottom-sheet/BottomSheetContainer";

type Props = {
  ref: RefObject<TSheetRef | null>;
  children: React.ReactElement | React.ReactElement[];
  title: string;
  height?: number;
};

export default function BottomSheetLayout({
  ref,
  children,
  title,
  height = 500,
}: Props) {
  return (
    <BottomSheetContainer ref={ref} height={height}>
      <View className="gap-3 flex-1">
        <View className="flex-row justify-between items-center">
          <Text className="font-medium text-xl dark:text-foreground-dark text-foreground">
            {title}
          </Text>
          <IconButton
            onPress={() => {
              if (ref.current != null) {
                ref.current.close();
              }
            }}
            variant="theme"
            name="close"
            iconSize={24}
          />
        </View>
        {children}
        <View className="flex-row gap-4">
          <Button variant="solid" size="md" fontSize="md" className="flex-1">
            Save
          </Button>
          <Button
            variant="secondary"
            size="md"
            fontSize="md"
            className="flex-1"
          >
            Reset
          </Button>
        </View>
      </View>
    </BottomSheetContainer>
  );
}
