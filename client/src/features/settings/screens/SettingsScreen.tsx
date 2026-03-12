import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ScreenHeader from "@components/layout/ScreenHeader";

const SettingsScreen = () => {
  return (
    <SafeAreaView
      edges={["top", "left", "right"]}
      className="dark:bg-background-dark bg-background flex-1 px-4 gap-7"
      testID="screen"
    >
      <ScreenHeader title="Settings" backButtonVisble />
      <View></View>
    </SafeAreaView>
  );
};

export default SettingsScreen;
