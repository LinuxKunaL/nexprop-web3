import { View } from "react-native";
import React from "react";
import PropertyHeader from "./components/PropertyHeader";

export default function PropertyDetails() {
  return (
    <View
      className="dark:bg-background-dark bg-background flex-1 px-4 pt-4 gap-7"
      testID="screen"
    >
      <PropertyHeader />
    </View>
  );
}
