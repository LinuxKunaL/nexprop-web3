import React from "react";
import Icon from "@components/display/Icon";
import Input from "@components/inputs/Input";
import EscrowCard from "@components/display/EscrowCard";
import { escrowsData } from "@data/escrow";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ScreenHeader from "@components/layout/ScreenHeader";

const EscrowListScreen = () => {
  return (
    <SafeAreaView
      edges={["top", "left", "right"]}
      className="flex-1 dark:bg-background-dark bg-background px-4"
    >
      <ScreenHeader title="All Escrow" backButtonVisble />
      <View testID="search">
        <Input placeholder="Search Escrow" />
        <Icon className="absolute right-3 top-3" name="magnify" isThemed />
      </View>
      <ScrollView className="mt-4" showsVerticalScrollIndicator={false}>
        <View testID="list" className="gap-4">
          {escrowsData.map((item) => (
            <EscrowCard item={item} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EscrowListScreen;
