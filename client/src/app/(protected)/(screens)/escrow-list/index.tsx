import { View, Text, ScrollView } from "react-native";
import React from "react";
import IconButton from "@ui/IconButton";
import { SafeAreaView } from "react-native-safe-area-context";
import Input from "@ui/Input";
import Icon from "@ui/Icon";
import BackButton from "@ui/BackButton";

type Props = {};

const index = (props: Props) => {
  return (
    <SafeAreaView
      edges={["top", "left", "right"]}
      className="flex-1 dark:bg-background-dark bg-background px-4"
    >
      <View
        testID="header"
        className="flex-row justify-between items-center pb-5"
      >
       <BackButton/>
        <Text className="font-medium text-xl text-foreground dark:text-foreground-dark">
          All Escrow
        </Text>
        <View className="size-[24px]" />
      </View>
      <View testID="search">
        <Input placeholder="Search Escrow" />
        <Icon className="absolute right-3 top-3" name="magnify" isThemed />
      </View>
      <ScrollView className="mt-4">
        <View testID="list" className="gap-4">
          <View className="p-3 gap-2 rounded-lg bg-card dark:bg-card-dark">
            <View className="flex-row justify-between">
              <Text className="text-muted dark:text-muted-dark font-medium">
                Escrow ID :
              </Text>
              <Text className="text-primary font-medium underline">
                ESC-8891
              </Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-muted dark:text-muted-dark font-medium">
                Locked Amount :
              </Text>
              <Text className="text-foreground dark:text-foreground-dark font-medium underline">
                20 ETH
              </Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-muted dark:text-muted-dark font-medium">
                Verification Time :
              </Text>
              <Text className="text-foreground dark:text-foreground-dark font-medium underline">
                72 Hours
              </Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-muted dark:text-muted-dark font-medium">
                Status :
              </Text>
              <Text className="text-yellow-500 font-medium underline">
                Pending
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default index;
