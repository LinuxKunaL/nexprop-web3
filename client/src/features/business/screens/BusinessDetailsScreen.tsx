import React from "react";
import { View } from "react-native";

import Header from "../components/Header";
import { BusinessProvider } from "../context";
import PropertyList from "../components/PropertyList";
import BusinessInfo from "../components/BusinessInfo";
import ScrollViewBuiness from "../components/ScrollViewBusiness";

const BusinessDetailsScreen = () => {
  return (
    <BusinessProvider>
      <View className="flex-1">
        <Header />
        <ScrollViewBuiness>
          <BusinessInfo />
          <PropertyList />
        </ScrollViewBuiness>
      </View>
    </BusinessProvider>
  );
};

export default BusinessDetailsScreen;
