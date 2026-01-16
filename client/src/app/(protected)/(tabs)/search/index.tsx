import Icon from "@ui/Icon";
import Badge from "@ui/Badge";
import Input from "@ui/Input";
import { View } from "react-native";
import React, { useRef, useState } from "react";
import { TSheetRef } from "@types_/bottomSheet";
import LocationBottomSheet from "./components/LocationBottomSheet";

export default function index() {
  const filters = ["Location", "Type", "Area", "Price"] as const;
  const [currentSheet, setCurrentSheet] = useState<string>();

  const locationBottomSheetRef = useRef<TSheetRef | null>(null);
  const typeBottomSheetRef = useRef<TSheetRef | null>(null);
  const areaBottomSheetRef = useRef<TSheetRef | null>(null);
  const priceBottomSheetRef = useRef<TSheetRef | null>(null);

  type FilterKey = (typeof filters)[number];

  const sheetRefs: Record<FilterKey, React.RefObject<TSheetRef | null>> = {
    Location: locationBottomSheetRef,
    Type: typeBottomSheetRef,
    Area: areaBottomSheetRef,
    Price: priceBottomSheetRef,
  };

  const handleOpenFilterSheet = (key: (typeof filters)[number]) => {
    sheetRefs[key].current?.open();
  };

  return (
    <View
      className="dark:bg-background-dark bg-background flex-1 px-4 pt-4 gap-7"
      testID="screen"
    >
      <View testID="search">
        <Input placeholder="Search Properties" />
        <Icon className="absolute right-3 top-3" name="magnify" isThemed />
      </View>
      <View testID="filters" className="">
        <View className="flex-row gap-4">
          {filters.map((item, idx) => (
            <Badge
              key={idx}
              iconPlace="after"
              variant="graySolid"
              onPress={() => {
                handleOpenFilterSheet(item);
              }}
              containerClassName="flex-auto"
              icon={{ name: "arrow-down", size: 15, themed: true }}
            >
              {item}
            </Badge>
          ))}
        </View>
      </View>
      <LocationBottomSheet ref={locationBottomSheetRef} />
    </View>
  );
}
