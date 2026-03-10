import Icon from "@components/display/Icon";
import Input from "@components/inputs/Input";
import Badge from "@components/feedback/Badge";
import React, { useRef } from "react";
import { View, Text } from "react-native";
import TouchableText from "@components/buttons/TouchableText";
import { TSheetRef } from "@types_/bottomSheet";

import LocationBottomSheet from "@feature/search/components/LocationBottomSheet";
import TypeBottomSheet from "@feature/search/components/TypeBottomSheet";
import AreaBottomSheet from "@feature/search/components/AreaBottomSheet";
import PriceBottomSheet from "@feature/search/components/PriceBottomSheet";
import PropertyGlassCard from "@components/display/PropertyCard";
import { propertiesData } from "@data/properties";
import { useRouter } from "expo-router";
type Props = {};

const PropertyList = (props: Props) => {
  const filters = ["Location", "Type", "Area", "Price"] as const;
  const router = useRouter();

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
    <View className="px-4 gap-4">
      <View className="justify-between flex-row items-center" testID="title">
        <Text className="text-foreground dark:text-foreground-dark text-lg font-medium">
          All Properties
        </Text>
        <TouchableText
          onPress={() => router.navigate("/property/add")}
          textClassName="text-primary font-sans underline"
        >
          Add Properties
        </TouchableText>
      </View>
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
        <LocationBottomSheet ref={locationBottomSheetRef} />
        <TypeBottomSheet ref={typeBottomSheetRef} />
        <AreaBottomSheet ref={areaBottomSheetRef} />
        <PriceBottomSheet ref={priceBottomSheetRef} />
      </View>
      <View testID="properties-list" className="mb-10">
        <View className="flex-col gap-6" testID="properties-container">
          {propertiesData.map((item) => (
            <PropertyGlassCard key={item.id} item={item} />
          ))}
        </View>
      </View>
    </View>
  );
};

export default PropertyList;
