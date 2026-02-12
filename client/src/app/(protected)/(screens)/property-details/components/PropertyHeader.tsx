import { View, Text } from "react-native";
import React from "react";
import PropertyImageCarousel from "./PropertyImageCarousel";
import Icon from "@ui/Icon";
import { colors } from "@constants/theme";

type Props = {};

const PropertyHeader = (props: Props) => {
  return (
    <View className="gap-4">
      <PropertyImageCarousel />
      <View className="flex-row gap-2 items-center">
        <Text className="text-primary font-medium text-lg">Kunal Builds</Text>
        <Icon
          name="check"
          className="bg-primary/30 rounded-full p-1"
          size={14}
          color={colors.primary}
        />
      </View>
    </View>
  );
};

export default PropertyHeader;
