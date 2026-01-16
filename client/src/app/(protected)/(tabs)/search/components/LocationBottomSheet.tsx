import { colors } from "@constants/theme";
import Button from "@ui/Button";
import Icon from "@ui/Icon";
import IconButton from "@ui/IconButton";
import Input from "@ui/Input";
import { View, Text, ScrollView } from "react-native";
import BottomSheetContainer from "@components/bottom-sheet/BottomSheetContainer";
import { TSheetRef } from "@types_/bottomSheet";
import { RefObject } from "react";

type Props = {
  ref: RefObject<TSheetRef | null>;
};

export default function LocationBottomSheet({ ref }: Props) {
  return (
    <BottomSheetContainer ref={ref}>
      <View className="gap-3 flex-1">
        <View className="flex-row justify-between items-center">
          <Text className="font-medium text-lg dark:text-foreground-dark text-foreground">
            Location
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

        <View className="">
          <Input placeholder="Enter a location" />
          <Icon className="absolute right-3 top-3" name="magnify" isThemed />
        </View>

        <ScrollView>
          <View className="gap-3">
            {Array.from({ length: 10 }).map((_, inx) => (
              <View
                key={inx}
                className="flex-row p-3 rounded-lg gap-2 dark:bg-card-dark"
              >
                <Icon color={colors.primary} name="map-marker" />
                <Text className="text-foreground dark:text-foreground-dark font-medium">
                  Location - Pune
                </Text>
              </View>
            ))}
          </View>
        </ScrollView>

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
