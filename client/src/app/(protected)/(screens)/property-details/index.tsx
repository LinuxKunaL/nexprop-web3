import { ScrollView, View } from "react-native";
import React from "react";
import PropertyHeader from "./components/PropertyHeader";
import OwnerCard from "./components/OwnerCard";
import PurchaseCard from "./components/PurchaseCard";
import PropertyMeta from "./components/PropertyMeta";

export default function PropertyDetails() {
  return (
    <ScrollView
      className="dark:bg-background-dark bg-background flex-1 px-4 pt-4"
      showsVerticalScrollIndicator={false}
    >
      <View className="gap-7 mb-10" testID="screen">
        <PropertyHeader />
        <PurchaseCard />
        <OwnerCard />
        <PropertyMeta />
      </View>
    </ScrollView>
  );
}
