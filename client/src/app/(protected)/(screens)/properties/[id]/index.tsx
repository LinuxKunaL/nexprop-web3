import { ScrollView, View } from "react-native";
import React, { useEffect, useState } from "react";
import PropertyHeader from "./components/PropertyHeader";
import OwnerCard from "./components/OwnerCard";
import PurchaseCard from "./components/PurchaseCard";
import PropertyMeta from "./components/PropertyMeta";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { propertiesData } from "@data/properties";
import { TProperty } from "@types_/property";

export default function PropertyDetails() {
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
