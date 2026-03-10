import React from "react";
import { View, Text } from "react-native";
import PropertyGlassCard from "@components/display/PropertyCard";
import { SafeAreaView } from "react-native-safe-area-context";
import { propertiesData } from "@data/properties";

import { useLocalSearchParams } from "expo-router";
import EscrowStatus from "../components/EscrowStatus";
import ScreenHeader from "@components/layout/ScreenHeader";

type Props = {};

const EscrowDetailsScreen = (props: Props) => {
  const { id } = useLocalSearchParams();

  return (
    <SafeAreaView
      edges={["top", "left", "right"]}
      className="flex-1 dark:bg-background-dark bg-background px-4"
    >
      <ScreenHeader title="Escrow Procedure" backButtonVisble />
      <View className="gap-5">
        <Text className="text-foreground dark:text-foreground-dark text-lg font-medium">
          Properties Details
        </Text>
        <View testID="property-box">
          <PropertyGlassCard item={propertiesData[0]} />
        </View>
        {/* <EscrowInit /> */}
        <EscrowStatus />
      </View>
    </SafeAreaView>
  );
};

export default EscrowDetailsScreen;
