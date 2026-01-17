import Icon from "@ui/Icon";
import Input from "@ui/Input";
import { RefObject } from "react";
import { colors } from "@constants/theme";
import { TSheetRef } from "@types_/bottomSheet";
import { View, Text, ScrollView } from "react-native";
import BottomSheetLayout from "./BottomSheetLayout";

type Props = {
  ref: RefObject<TSheetRef | null>;
};

export default function LocationBottomSheet({ ref }: Props) {
  return (
    <BottomSheetLayout ref={ref} title="Location">
      <View className="">
        <Input placeholder="Enter a location" className=" bg-gray-100" />
        <Icon className="absolute right-3 top-3" name="magnify" isThemed />
      </View>
      <ScrollView>
        <View className="gap-3">
          {Array.from({ length: 10 }).map((_, inx) => (
            <View
              key={inx}
              className="flex-row p-3 rounded-lg gap-2 dark:bg-card-dark bg-gray-100"
            >
              <Icon color={colors.primary} name="map-marker" />
              <Text className="text-foreground dark:text-foreground-dark font-medium">
                Location - Pune
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </BottomSheetLayout>
  );
}
