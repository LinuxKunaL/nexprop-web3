import { View, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ScreenHeader from "@components/layout/ScreenHeader";
import Icon from "@components/display/Icon";
import { Pressable } from "react-native";
import Input from "@components/inputs/Input";
import Button from "@components/buttons/Button";

const NotificationSetting = () => {
  return (
    <SafeAreaView
      edges={["top", "left", "right"]}
      className="dark:bg-background-dark bg-background flex-1 px-4"
      testID="screen"
    >
      <ScreenHeader title="Notification Settings" backButtonVisble />
    </SafeAreaView>
  );
};

export default NotificationSetting;
