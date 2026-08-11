import React, { useContext, useEffect } from "react";
import { HomeContext, HomeProvider } from "../context";
import LocationModel from "../components/LocationModel";
import { SafeAreaView } from "react-native-safe-area-context";
import { BackHandler, ScrollView, View } from "react-native";
import Header from "../components/Header";
import Search from "../components/Search";
import FeaturedProperties from "../components/FeaturedProperties";
import LatestProperties from "../components/LatestProperties";
import Categories from "../components/Categories";
import { useNavigation } from "expo-router";

export default function HomeScreen() {
  return (
    <HomeProvider>
      <HomeContent />
    </HomeProvider>
  );
}

function HomeContent() {
  const { locationModel } = useContext(HomeContext);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener("beforeRemove", (e) => {
      e.preventDefault();
      BackHandler.exitApp();
    });
    return unsubscribe;
  }, []);

  return (
    <SafeAreaView
      className="dark:bg-background-dark bg-background flex-1 px-4 pt-4 gap-7"
      testID="screen"
      edges={["top", "left", "right"]}
    >
      <Header />
      <Search />
      <ScrollView bounces showsVerticalScrollIndicator={false}>
        <View className="flex-col gap-7 mb-10">
          <FeaturedProperties />
          <Categories />
          <LatestProperties />
        </View>
      </ScrollView>
      {locationModel && <LocationModel />}
    </SafeAreaView>
  );
}
