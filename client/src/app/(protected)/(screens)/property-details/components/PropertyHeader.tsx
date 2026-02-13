import { View, Text } from "react-native";
import React from "react";
import PropertyImageCarousel from "./PropertyImageCarousel";
import Icon from "@ui/Icon";
import { colors } from "@constants/theme";
import Badge from "@ui/Badge";

type Props = {};

const PropertyHeader = (props: Props) => {
  return (
    <View className="gap-7">
      <PropertyImageCarousel />
      <View className="flex-row gap-2 items-center" testID="business-name">
        <Text className="text-primary font-medium text-lg">Kunal Builds</Text>
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
            SoftNet,IT Park
          </Text>
          <Badge variant="ghost" textColor={colors.primary}>
            Building
          </Badge>
        </View>
        <View className="flex-row items-center gap-1">
          <Icon name="map-marker" size={15} color={colors.primary} />
          <Text
            className="font-sans capitalize text-muted dark:text-muted-dark"
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            kharadi .e nsad asdd
          </Text>
        </View>
      </View>
    </View>
  );
};

export default PropertyHeader;
