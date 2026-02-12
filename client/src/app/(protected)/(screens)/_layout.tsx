import { Stack } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TabLayout() {
  return (
    <SafeAreaView
      edges={["top", "left", "right"]}
      className="flex-1 dark:bg-background-dark bg-background"
    >
      <Stack screenOptions={{ headerShown: false }} />
    </SafeAreaView>
  );
}
