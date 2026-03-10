import { ScrollView, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { TProperty } from "@feature/property/types";
import { propertiesData } from "@data/properties";

import OwnerCard from "../components/view-screen/OwnerCard";
import PurchaseCard from "../components/view-screen/PurchaseCard";
import PropertyMeta from "../components/view-screen/PropertyMeta";
import PropertyHeader from "../components/view-screen/PropertyHeader";

export default function PropertyDetailsScreen() {
  const { id } = useLocalSearchParams();
  const [data, setData] = useState<TProperty>();

  useEffect(() => {
    if (id) {
      const property = propertiesData.find((item) => item.id === Number(id));
      setData(property as TProperty);
    }
  }, [id]);

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
          <PropertyHeader property={data} />
          <PurchaseCard property={data} />
          <OwnerCard owner={data?.owner}/>
          <PropertyMeta property={data}/>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
