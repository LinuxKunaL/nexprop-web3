import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { StatusBar } from "react-native";

export default function _layout() {
  return (
    <SafeAreaView className="flex-1 dark:bg-background-dark bg-background px-4 pt-4">
      <Stack screenOptions={{ headerShown: false }} />
    </SafeAreaView>
  );
}
