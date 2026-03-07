import { View, Text, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { propertiesData } from "@data/properties";
import PropertyGlassCard from "@ui/PropertyGlassCard";

export default function index() {
  return (
    <SafeAreaView
      edges={["top", "left", "right"]}
      className="dark:bg-background-dark bg-background flex-1 px-4 pt-4 gap-7"
      testID="screen"
    >
      <ScrollView bounces showsVerticalScrollIndicator={false}>
        <View testID="properties-list" className="mb-10">
          <View className="flex-col gap-6" testID="properties-container">
            {propertiesData.map((item) => (
              <PropertyGlassCard key={item.id} item={item} />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
