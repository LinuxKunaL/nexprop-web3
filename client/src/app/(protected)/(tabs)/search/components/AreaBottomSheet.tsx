import { RefObject, useState } from "react";
import { Text, View } from "react-native";
import { TSheetRef } from "@types_/bottomSheet";
import BottomSheetLayout from "./BottomSheetLayout";
import Slider from "@react-native-community/slider";
import { colors } from "@constants/theme";
import Button from "@ui/Button";
import Badge from "@ui/Badge";

type Props = {
  ref: RefObject<TSheetRef | null>;
};

export default function AreaBottomSheet({ ref }: Props) {
  const [value, setValue] = useState(0);
  const areaUnits = ["Sq ft", "Acre", "Hectare"] as const;
  const [unit, setUnit] = useState<(typeof areaUnits)[number]>("Sq ft");

  const unitViseMaxValues = {
    "Sq ft": 400,
    Acre: 200,
    Hectare: 100,
  };

  const quickValues = {
    "Sq ft": {
      low: 50,
      medium: 200,
      high: 350,
    },
    Acre: {
      low: 20,
      medium: 70,
      high: 150,
    },
    Hectare: {
      low: 20,
      medium: 55,
      high: 70,
    },
  } as const;
  const QUICK_VALUES = ["low", "medium", "high"] as const;

  return (
    <BottomSheetLayout ref={ref} title="Area" height={400}>
      <View className="flex-1 gap-4">
        <View className="gap-2">
          <Text className="dark:text-foreground-dark text-foreground text-lg font-medium">
            Units
          </Text>
          <View className="p-2 dark:bg-card-dark w-full flex-row gap-3 rounded-lg">
            {areaUnits.map((item) => (
              <Button
                key={item}
                variant={unit == item ? "secondary" : "transparent"}
                size="sm"
                fontSize="sm"
                className="flex-1"
                onPress={() => {
                  setUnit(item);
                  setValue(0);
                }}
              >
                {item}
              </Button>
            ))}
          </View>
        </View>
        <View className="gap-2">
          <Text className="text-muted dark:text-muted-dark font-medium text-sm">
            Area ({unit}) - {value} &lt;
          </Text>
          <Slider
            value={value}
            minimumValue={10}
            thumbTintColor={colors.primary}
            minimumTrackTintColor={colors.primary}
            maximumValue={unitViseMaxValues[unit]}
            maximumTrackTintColor={colors["muted-dark"]}
            onValueChange={(val) => setValue(Math.floor(val))}
          />
        </View>
        <View className="gap-3">
          <Text className="dark:text-foreground-dark text-foreground font-medium">
            Quick Values
          </Text>
          <View className="flex-row gap-3">
            {QUICK_VALUES.map((item) => (
              <Badge
                size="lg"
                onPress={() => {
                  setValue(quickValues[unit][item]);
                }}
                variant="ghost"
                containerClassName="flex-auto"
                textAlign="mid"
                className="capitalize"
              >
                {item}
              </Badge>
            ))}
          </View>
        </View>
      </View>
    </BottomSheetLayout>
  );
}
