import { View, Text } from "react-native";
import React from "react";
import { propertiesData } from "@data/properties";
import PropertyCard from "@components/display/PropertyCard";

const LatestProperties = () => {
  return (
    <View testID="latest-properties">
      <View testID="title" className="flex-row gap-1">
        <Text className="font-semibold dark:text-foreground-dark text-foreground text-lg">
          latest
        </Text>
        <Text className="dark:text-muted-dark text-muted font-sans text-lg">
          Properties
        </Text>
      </View>
      <View className="pt-4 flex-col gap-6" testID="properties-container">
        {propertiesData.map((item) => (
          <PropertyCard key={item.id} item={item} />
        ))}
      </View>
    </View>
  );
};

export default LatestProperties;
