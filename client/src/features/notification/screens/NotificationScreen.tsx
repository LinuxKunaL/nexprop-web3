import React from "react";
import Icon from "@components/display/Icon";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";;
import ScreenHeader from "@components/layout/ScreenHeader";
import { useThemeStore } from "@stores/theme.store";

const NotificationScreen = () => {
  const colors = useThemeStore((st) => st.colors);
  return (
    <SafeAreaView
      edges={["top", "left", "right"]}
      className="flex-1 dark:bg-background-dark bg-background px-4"
    >
      <ScreenHeader backButtonVisble title="Notifications" />
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

export default NotificationScreen;
