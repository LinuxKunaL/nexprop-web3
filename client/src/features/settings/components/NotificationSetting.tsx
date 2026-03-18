import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ScreenHeader from "@components/layout/ScreenHeader";
import { Switch } from "react-native-gesture-handler";
import Hr from "@components/layout/Hr";
import { useColorScheme } from "react-native";

const NotificationSetting = () => {
  return (
    <SafeAreaView
      edges={["top", "left", "right"]}
      className="dark:bg-background-dark bg-background flex-1 px-4"
      testID="screen"
    >
      <ScreenHeader title="Notification Settings" backButtonVisble />
      <View className="p-2 gap-4">
        <View className="justify-between flex-row">
          <View>
            <Text className="text-foreground dark:text-foreground-dark font-medium">
              Push Notifications
            </Text>
            <Text className="text-muted dark:text-muted-dark font-normal text-sm">
              Shows notifications on your device
            </Text>
          </View>
          <Switch />
        </View>
        <Hr />
        <Text className="text-foreground dark:text-foreground-dark font-medium text-lg">
          Escrow
        </Text>
        <View className="ml-2 justify-between flex-row">
          <View>
            <Text className="text-foreground dark:text-foreground-dark font-medium">
              Timeout Alert
            </Text>
            <Text className="text-muted dark:text-muted-dark font-normal text-sm">
              Notify when escrow is about to expire
            </Text>
          </View>
          <Switch />
        </View>
        <View className="ml-2 justify-between flex-row">
          <View>
            <Text className="text-foreground dark:text-foreground-dark font-medium">
              Escrow Activity
            </Text>
            <Text className="text-muted dark:text-muted-dark font-normal text-sm">
              Notify about escrow status changes
            </Text>
          </View>
          <Switch />
        </View>
        <Hr />
        <Text className="text-foreground dark:text-foreground-dark font-medium text-lg">
          bidding
        </Text>
        <View className="ml-2 justify-between flex-row">
          <View>
            <Text className="text-foreground dark:text-foreground-dark font-medium">
              New Bid
            </Text>
            <Text className="text-muted dark:text-muted-dark font-normal text-sm">
              Notify when someone places a bid
            </Text>
          </View>
          <Switch />
        </View>
        <View className="ml-2 justify-between flex-row">
          <View>
            <Text className="text-foreground dark:text-foreground-dark font-medium">
              Winning Bid
            </Text>
            <Text className="text-muted dark:text-muted-dark font-normal text-sm">
              Notify when you become the highest bidder
            </Text>
          </View>
          <Switch />
        </View>
        <Hr />
        <Text className="text-foreground dark:text-foreground-dark font-medium text-lg">
          Property
        </Text>
        <View className="ml-2 justify-between flex-row">
          <View>
            <Text className="text-foreground dark:text-foreground-dark font-medium">
              New Bid
            </Text>
            <Text className="text-muted dark:text-muted-dark font-normal text-sm">
              Notify when someone places a bid on {"\n"}your property
            </Text>
          </View>
          <Switch />
        </View>
        <View className="ml-2 justify-between flex-row">
          <View>
            <Text className="text-foreground dark:text-foreground-dark font-medium">
              Property Sold
            </Text>
            <Text className="text-muted dark:text-muted-dark font-normal text-sm">
              Notify when your property is successfully {"\n"}sold
            </Text>
          </View>
          <Switch />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default NotificationSetting;
