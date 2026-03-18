import { View, Text, ScrollView, RefreshControl } from "react-native";
import React, { useCallback, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import PropertyGlassCard from "@components/display/PropertyCard";
import { usePersistentState } from "@hooks/other/use-persistent-state";
import { TProperty } from "@feature/property/types";

export default function WishlistScreen() {
  const [wishlist] = usePersistentState<TProperty[]>("wishlist");

  return (
    <SafeAreaView
      edges={["top", "left", "right"]}
      className="dark:bg-background-dark bg-background flex-1 px-4 pt-4 gap-7"
      testID="screen"
    >
      <ScrollView bounces showsVerticalScrollIndicator={false}>
        <View testID="properties-list" className="mb-10">
          <View className="flex-col gap-6" testID="properties-container">
            {wishlist?.map((item) => (
              <PropertyGlassCard key={item.id} item={item} />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
