import React from "react";
import IconButton from "@ui/IconButton";
import { View, Text } from "react-native";
import EscrowInit from "./components/EscrowInit";
import PropertyGlassCard from "@ui/PropertyGlassCard";
import { properties } from "@screen/(protected)/(tabs)/home";
import { SafeAreaView } from "react-native-safe-area-context";
import EscrowStatus from "./components/EscrowStatus";

type Props = {};

const index = (props: Props) => {
  return (
    <SafeAreaView
      edges={["top", "left", "right"]}
      className="flex-1 dark:bg-background-dark bg-background px-4"
    >
      <View
        testID="header"
        className="flex-row justify-between items-center pb-5"
      >
        <IconButton name="arrow-left" iconSize={24} variant="theme" />
        <Text className="font-medium text-xl text-foreground dark:text-foreground-dark">
          Escrow Procedure
        </Text>
        <View className="size-[24px]" />
      </View>
      <View className="gap-5">
        <Text className="text-foreground dark:text-foreground-dark text-lg font-medium">
          Properties Details
        </Text>
        <View testID="property-box">
          <PropertyGlassCard item={properties[0]} />
        </View>
        {/* <EscrowInit /> */}
        <EscrowStatus/>
      </View>
    </SafeAreaView>
  );
};

export default index;
