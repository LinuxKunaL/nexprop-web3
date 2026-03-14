import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ScreenHeader from "@components/layout/ScreenHeader";
import Icon from "@components/display/Icon";
import Hr from "@components/layout/Hr";
import { colors } from "@constants/theme";
import { useRouter } from "expo-router";
import { Pressable } from "react-native";
import { TouchableHighlight } from "react-native";

const SettingsScreen = () => {
  const router = useRouter();

  const handleNavigate = (route: any) => {
    router.navigate(route);
  };
  return (
    <SafeAreaView
      edges={["top", "left", "right"]}
      className="dark:bg-background-dark bg-background flex-1 px-4"
      testID="screen"
    >
      <ScreenHeader title="Settings" backButtonVisble />
      <View className="gap-3">
        <Pressable
          onPress={() => {
            handleNavigate("/settings/edit-account");
          }}
        >
          <View className="gap-3 flex-row items-center p-3">
            <Icon name="account-cog" isThemed />
            <Text className="dark:text-foreground-dark text-foreground font-medium">
              Edit Account
            </Text>
          </View>
        </Pressable>
        <Pressable
          onPress={() => {
            handleNavigate("/business/1232/edit");
          }}
          className="gap-3 flex-row items-center p-3"
        >
          <Icon name="office-building-cog" isThemed />
          <Text className="dark:text-foreground-dark text-foreground font-medium">
            Edit business
          </Text>
        </Pressable>
        <Pressable
          onPress={() => {
            handleNavigate("/settings/notification-settings");
          }}
          className="gap-3 flex-row items-center p-3"
        >
          <Icon name="bell" isThemed />
          <Text className="dark:text-foreground-dark text-foreground font-medium">
            Notification
          </Text>
        </Pressable>
        <View className="gap-3 flex-row items-center p-3">
          <Icon name="theme-light-dark" isThemed />
          <Text className="dark:text-foreground-dark text-foreground font-medium">
            Change Theme
          </Text>
        </View>
        <Hr />
        <View className="gap-3 flex-row items-center p-3">
          <Icon name="head-question" isThemed />
          <Text className="dark:text-foreground-dark text-foreground font-medium">
            FAQ
          </Text>
        </View>
        <View className="gap-3 flex-row items-center p-3">
          <Icon name="message-question" isThemed />
          <Text className="dark:text-foreground-dark text-foreground font-medium">
            About Us
          </Text>
        </View>
        <View className="gap-3 flex-row items-center p-3">
          <Icon name="lock" isThemed />
          <Text className="dark:text-foreground-dark text-foreground font-medium">
            Privacy Policy
          </Text>
        </View>
        <View className="gap-3 flex-row items-center p-3">
          <Icon name="logout" color={colors.danger} />
          <Text className=" font-medium text-danger">logout</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SettingsScreen;
