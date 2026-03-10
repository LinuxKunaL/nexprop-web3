import { View, Text } from "react-native";
import React from "react";
import TouchableText from "@components/buttons/TouchableText";
import PropertyGlassCard from "@components/display/PropertyCard";
import { propertiesData } from "@data/properties";

type Props = {};

const Properties = (props: Props) => {
  return (
    <View className="px-4 gap-5" testID="properties">
      <View className="justify-between flex-row items-center" testID="title">
        <Text className="text-foreground dark:text-foreground-dark text-lg font-medium">
          My Properties
        </Text>
        <TouchableText textClassName="text-primary font-sans underline">
          View All
        </TouchableText>
      </View>
      <PropertyGlassCard item={propertiesData[0]} />
    </View>
  );
};

export default Properties;
