import Icon from "@components/display/Icon";
import { View, Text } from "react-native";
import React, { useContext } from "react";
import { colors } from "@constants/theme";
import { BuinessContext } from "../context";
import BusinessBgSvg from "@assets/images/business-bg-svg";

const BusinessInfo = () => {
  const { headerHeight, onBusinessAvatarLayout } = useContext(BuinessContext);
  return (
    <View
      testID="business-icon"
      style={{
        paddingTop: headerHeight,
      }}
      onLayout={onBusinessAvatarLayout}
      className="overflow-hidden"
    >
      <BusinessBgSvg className="absolute w-full h-48 opacity-30" />
      <View testID="icon" className="gap-2 justify-center px-4">
        <View className="size-28 rounded-lg dark:bg-card-secondary-dark justify-center items-center bg-card">
          <Icon name="office-building" size={48} isThemed />
        </View>
        <View className="gap-2">
          <Text className="text-foreground dark:text-foreground-dark text-xl font-medium">
            Kunal Developer
          </Text>
          <Text className="font-sans text-muted dark:text-muted-dark">
            Developer
          </Text>
          <View className="flex-row gap-2">
            <Icon name="map-marker" color={colors.primary} size={20} />
            <Text className="font-medium  text-muted dark:text-muted-dark">
              Kharadhi
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default BusinessInfo;
