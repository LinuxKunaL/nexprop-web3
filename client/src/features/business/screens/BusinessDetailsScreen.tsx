import React from "react";
import { View } from "react-native";

import Header from "../components/Header";
import { BuinessProvider } from "../context";
import PropertyList from "../components/PropertyList";
import BusinessInfo from "../components/BusinessInfo";
import ScrollViewBuiness from "../components/ScrollViewBuiness";

const BusinessDetailsScreen = () => {
  return (
    <BuinessProvider>
      <View className="flex-1">
        <Header />
        <ScrollViewBuiness>
          <BusinessInfo />
          <PropertyList />
        </ScrollViewBuiness>
      </View>
    </BuinessProvider>
  );
};

export default BusinessDetailsScreen;
