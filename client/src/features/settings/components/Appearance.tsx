import clsx from "clsx";
import React from "react";
import Hr from "@components/layout/Hr";
import Icon, { TIconName } from "@components/display/Icon";
import ScreenHeader from "@components/layout/ScreenHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import ThemePreviewCard from "@components/theme/ThemePreviewCard";
import { View, Text, Pressable, ScrollView } from "react-native";
import { useThemeStore } from "@stores/theme.store";
import { previewThemes } from "@constants/theme";
import useAppearance from "@hooks/other/use-appearance";
import { ThemeState } from "@types_/theme";

type TThemeButtons = {
  icon: TIconName;
  name: ThemeState["theme"];
};

const Appearance = () => {
  const colors = useThemeStore((st) => st.colors);
  const { switchTheme, theme } = useAppearance();

  const themeButtons: TThemeButtons[] = [
    {
      icon: "weather-sunny",
      name: "light",
    },
    {
      icon: "moon-waxing-crescent",
      name: "dark",
    },
    {
      icon: "devices",
      name: "system",
    },
  ];

  return (
    <SafeAreaView
      edges={["top", "left", "right"]}
      className="dark:bg-background-dark bg-background flex-1 px-4"
      testID="screen"
    >
      <ScreenHeader title="Appearance" backButtonVisble />
      <View className="gap-4 flex-1">
        <Text className="text-lg dark:text-foreground-dark text-foreground font-medium">
          Choose Theme
        </Text>
        <View className="p-2 gap-2 flex-row">
          {themeButtons.map((btn) => (
            <Pressable
              android_ripple={{
                color: colors.primary,
                borderless: true,
                radius: 100,
                foreground: true,
              }}
              onPress={() => switchTheme(btn.name)}
              className={clsx(
                "p-4 border-[1px] flex-auto gap-1 size-28 border-border dark:border-border-dark/50 justify-center items-center rounded-xl overflow-hidden",
                theme === btn.name
                  ? "bg-primary/20 !border-primary"
                  : "dark:bg-card-dark bg-card",
              )}
            >
              <Icon name={btn.icon} color="white" size={25} isThemed />
              <Text className="dark:text-foreground-dark text-foreground font-normal">
                {btn.name}
              </Text>
            </Pressable>
          ))}
        </View>
        <Hr />
        <Text className="text-lg dark:text-foreground-dark text-foreground font-medium">
          Theme Templates
        </Text>
        <ScrollView className="h-full">
          <View className="flex-row flex-wrap gap-4 mb-10">
            {previewThemes.map((card) => (
              <ThemePreviewCard key={card.template} {...card} />
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Appearance;
