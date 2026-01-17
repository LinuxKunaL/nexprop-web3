import clsx from "clsx";
import { RefObject } from "react";
import { View } from "react-native";
import { Text } from "react-native";
import { Pressable } from "react-native";
import { colors } from "@constants/theme";
import Icon, { TIconName } from "@ui/Icon";
import { TSheetRef } from "@types_/bottomSheet";
import BottomSheetLayout from "./BottomSheetLayout";

type Props = {
  ref: RefObject<TSheetRef | null>;
};

type TTypesCard = {
  name: string;
  icon: TIconName;
};

export default function TypeBottomSheet({ ref }: Props) {
  const typesCard: TTypesCard[] = [
    {
      name: "Apartment",
      icon: "domain",
    },
    {
      name: "House",
      icon: "home",
    },
    {
      name: "Villa",
      icon: "home-silo",
    },
    {
      name: "Office",
      icon: "office-building",
    },
    {
      name: "Land",
      icon: "island",
    },
    {
      name: "warehouse",
      icon: "warehouse",
    },
  ];
  return (
    <BottomSheetLayout ref={ref} title="Type" height={350}>
      <View
        className="flex-row flex-wrap flex-1 gap-4 items-center"
        style={{ height: 300 }}
      >
        {typesCard.map((item, idx) => (
          <Pressable
            key={idx}
            android_ripple={{
              color: colors.primary,
              borderless: true,
              radius: 100,
              foreground: true,
            }}
            className={clsx(
              "p-3 border-[1px] gap-1 border-border dark:border-border-dark/50 w-28 justify-center items-center rounded-xl overflow-hidden",
              "bg-primary/20 !border-primary"
            )}
          >
            <Icon name={item.icon} color={colors.primary} />
            <Text className="dark:text-foreground-dark font-medium text-sm">
              {item.name}
            </Text>
          </Pressable>
        ))}
      </View>
    </BottomSheetLayout>
  );
}
