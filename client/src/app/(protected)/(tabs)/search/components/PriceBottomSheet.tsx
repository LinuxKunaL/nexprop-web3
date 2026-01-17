import { RefObject, useState } from "react";
import BottomSheetLayout from "./BottomSheetLayout";
import { TSheetRef } from "@types_/bottomSheet";
import { View } from "react-native";
import { Text } from "react-native";
import Slider from "@react-native-community/slider";
import { colors } from "@constants/theme";
import Badge from "@ui/Badge";

type Props = {
  ref: RefObject<TSheetRef | null>;
};

export default function PriceBottomSheet({ ref }: Props) {
  const [values, setValues] = useState({ min: 100, max: 300 });

  return (
    <BottomSheetLayout ref={ref} title="Price" height={360}>
      <View className="flex-1 gap-4">
        <View className="gap-2">
          <Text className="text-foreground dark:text-foreground-dark font-medium text-sm">
            Min Price (ETH)- {values.min}
          </Text>
          <Slider
            minimumValue={0.000001}
            maximumValue={10}
            value={values.min}
            thumbTintColor={colors.primary}
            onValueChange={(val) =>
              setValues((prev) => ({
                ...prev,
                min: Number(val.toFixed(4)),
              }))
            }
            minimumTrackTintColor={colors.primary}
            maximumTrackTintColor={colors["muted-dark"]}
          />
        </View>
        <View className="gap-2">
          <Text className="text-foreground dark:text-foreground-dark font-medium text-sm">
            Max Price (ETH) - {values.max}
          </Text>
          <Slider
            minimumValue={0.00001}
            maximumValue={10}
            value={values.max}
            thumbTintColor={colors.primary}
            onValueChange={(val) =>
              setValues((prev) => ({ ...prev, max: Number(val.toFixed(4)) }))
            }
            minimumTrackTintColor={colors.primary}
            maximumTrackTintColor={colors["muted-dark"]}
          />
        </View>
        <View className="gap-3">
          <Text className="dark:text-foreground-dark text-foreground font-medium">
            Quick budget
          </Text>
          <View className="flex-row gap-3">
            <Badge
              size="lg"
              onPress={() => {
                setValues({ min: 0.050, max: 1.0 });
              }}
              variant="ghost"
              containerClassName="flex-auto"
              textAlign="mid"
            >
              Low
            </Badge>
            <Badge
              size="lg"
              variant="ghost"
              onPress={() => {
                setValues({ min: 3.500, max: 5.500 });
              }}
              containerClassName="flex-auto"
              textAlign="mid"
            >
              Medium
            </Badge>
            <Badge
              size="lg"
              variant="ghost"
              onPress={() => {
                setValues({ min: 7.500, max: 9.500 });
              }}
              containerClassName="flex-auto"
              textAlign="mid"
            >
              High
            </Badge>
          </View>
        </View>
      </View>
    </BottomSheetLayout>
  );
}
