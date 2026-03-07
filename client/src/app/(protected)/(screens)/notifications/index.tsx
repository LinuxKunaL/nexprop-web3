import React from "react";
import Icon from "@ui/Icon";
import BackButton from "@ui/BackButton";
import { colors } from "@constants/theme";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const notification = () => {
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
          Notifications
        </Text>
        <View className="size-[24px]" />
      </View>
      <View testID="notifications-list" className="gap-5 flex-col">
        <Text className="font-medium dark:text-foreground-dark text-foreground">
          Today
        </Text>
        <View className="flex-row gap-1 p-3 bg-green-400/20 rounded-lg items-center">
          <View className="gap-5 flex-row items-center">
            <Icon name="gavel" color={colors.success} size={24} />
            <View>
              <Text className="text-foreground dark:text-foreground-dark font-sans">
                <Text className="font-semibold">You Won The bid : </Text>
                SoftNet, IT Park ..
              </Text>
              <Text className="text-foreground dark:text-foreground-dark font-sans">
                Today At 12 Dec 2025
              </Text>
            </View>
          </View>
        </View>
        <View className="flex-row gap-1 p-3 bg-yellow-400/20 rounded-lg items-center">
          <View className="gap-5 flex-row items-center">
            <Icon name="shield-home" color={colors.warring} size={24} />
            <View>
              <Text className="text-foreground dark:text-foreground-dark font-sans">
                <Text className="font-semibold">Escrow Start : </Text>SoftNet,
                IT Park ..
              </Text>
              <Text className="text-foreground dark:text-foreground-dark font-sans">
                Today At 12 Dec 2025
              </Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default notification;
