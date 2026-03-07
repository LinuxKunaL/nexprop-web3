import CustomTabBar from "@ui/CustomTabBar";
import { Tabs } from "expo-router";
import React from "react";
import { View } from "react-native";

export default function TabLayout() {
  return (
    <View className="flex-1 dark:bg-background-dark bg-background">
      <Tabs
        screenOptions={{ headerShown: false, animation: "none" }}
        tabBar={(props) => <CustomTabBar {...props} />}
      />
    </View>
  );
}
