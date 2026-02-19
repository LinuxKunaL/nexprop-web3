import { useRoute } from "@react-navigation/native";
import CustomTabBar from "@ui/CustomTabBar";
import { Tabs, useNavigation } from "expo-router";
import React, { useState } from "react";
import { View } from "react-native";

export default function TabLayout() {
  const [isProfile, setIsProfile] = useState<boolean>(false);
  const nav = useRoute();

  console.log(nav);

  return (
    <View className="flex-1 dark:bg-background-dark bg-background">
      <Tabs
        screenOptions={{ headerShown: false }}
        tabBar={(props) => <CustomTabBar {...props} />}
      />
    </View>
  );
}
