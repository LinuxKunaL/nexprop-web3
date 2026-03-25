import React from "react";
import { View, Text, ScrollView } from "react-native";
import { propertiesData } from "@data/properties";
import PropertyCardv2 from "@components/display/PropertyCardv2";

const FeaturedProperties = () => {
  return (
    <View testID="featured-properties">
      <View testID="title" className="flex-row gap-1">
        <Text className="font-semibold dark:text-foreground-dark text-foreground text-lg">
          Featured
        </Text>
        <Text className="dark:text-muted-dark text-muted font-sans text-lg">
          Properties
        </Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View className="pt-4 flex-row gap-4" testID="properties-container">
          {propertiesData.map((item) => (
            <PropertyCardv2 key={item.id} item={item} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default FeaturedProperties;
