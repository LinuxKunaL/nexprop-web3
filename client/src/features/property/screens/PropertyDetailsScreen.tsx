import React, { useContext } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import OwnerCard from "../components/details-screen/OwnerCard";
import PurchaseCard from "../components/details-screen/PurchaseCard";
import PropertyMeta from "../components/details-screen/PropertyMeta";
import PropertyHeader from "../components/details-screen/PropertyHeader";
import {
  PropertyDetailsContext,
  PropertyDetailsProvider,
} from "../details-context";

export default function PropertyDetailsScreen() {
  return (
    <PropertyDetailsProvider>
      <PropertyDetailsContent />
    </PropertyDetailsProvider>
  );
}

function PropertyDetailsContent() {
  return (
    <SafeAreaView
      edges={["top", "left", "right"]}
      className="flex-1 dark:bg-background-dark bg-background"
    >
      <ScrollView
        className="dark:bg-background-dark bg-background flex-1 px-4 pt-4"
        showsVerticalScrollIndicator={false}
      >
        <View className="gap-6 mb-10" testID="screen">
          <PropertyHeader />
          <PurchaseCard />
          <OwnerCard />
          <PropertyMeta />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
