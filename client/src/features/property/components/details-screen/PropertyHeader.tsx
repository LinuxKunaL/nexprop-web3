import React, { useContext } from "react";
import { View, Text } from "react-native";
import { useThemeStore } from "@stores/theme.store";
import Icon from "@components/display/Icon";
import Badge from "@components/feedback/Badge";
import PropertyImageCarousel from "./PropertyImageCarousel";
import { PropertyDetailsContext } from "@feature/property/details-context";

const PropertyHeader = () => {
  const { property } = useContext(PropertyDetailsContext);
  const colors = useThemeStore((st) => st.colors);
  return (
    <View className="gap-6">
      <PropertyImageCarousel />
      <View className="flex-row gap-2 items-center" testID="business-name">
        <Text className="text-primary font-medium text-lg">
          {property?.businessName}
        </Text>
        <Icon
          name="check"
          className="bg-primary/30 rounded-full p-1"
          size={14}
          color={colors.primary}
        />
      </View>
      <View className="flex-col gap-2" testID="address">
        <View className="flex-row justify-between">
          <Text className="font-medium text-xl capitalize dark:text-foreground-dark text-foreground">
            {property?.address?.street}
          </Text>
          <Badge variant="ghost" textColor={colors.primary}>
            {property?.category}
          </Badge>
        </View>
        <View className="flex-row items-center gap-1">
          <Icon name="map-marker" size={15} color={colors.primary} />
          <Text
            className="font-sans capitalize text-muted dark:text-muted-dark"
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {property?.address?.addressLine}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default PropertyHeader;
