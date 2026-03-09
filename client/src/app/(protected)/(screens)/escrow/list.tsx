import { View, Text, ScrollView } from "react-native";
import React from "react";
import IconButton from "@ui/IconButton";
import { SafeAreaView } from "react-native-safe-area-context";
import Input from "@ui/Input";
import Icon from "@ui/Icon";
import BackButton from "@ui/BackButton";
import { escrowsData } from "@data/escrow";
import EscrowCard from "@ui/EscrowCard";

const EscrowList = () => {
  return (
    <SafeAreaView
      edges={["top", "left", "right"]}
      className="flex-1 dark:bg-background-dark bg-background px-4"
    >
      <View
        testID="header"
        className="flex-row justify-between items-center pb-5"
      >
        <BackButton />
        <Text className="font-medium text-xl text-foreground dark:text-foreground-dark">
          All Escrow
        </Text>
        <View className="size-[24px]" />
      </View>
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

export default EscrowList;
