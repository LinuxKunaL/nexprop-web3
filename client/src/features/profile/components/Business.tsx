import { View, Text, Pressable } from "react-native";
import React from "react";
import TouchableText from "@components/buttons/TouchableText";
import Icon from "@components/display/Icon";
import { useThemeStore } from "@stores/theme.store";
import { useRouter } from "expo-router";

type Props = {};

const Business = (props: Props) => {
  const router = useRouter();
  const colors = useThemeStore((st) => st.colors);
  return (
    <View className="px-4 gap-5" testID="business">
      <View className="justify-between flex-row items-center" testID="title">
        <Text className="text-foreground dark:text-foreground-dark text-lg font-medium">
          My Business
        </Text>
        <TouchableText
          onPress={() => {
            router.navigate("/business/100");
          }}
          textClassName="text-primary font-sans underline"
        >
          Edit Business
        </TouchableText>
      </View>
      <Pressable
        onPress={() => {
          router.navigate("/business/100");
        }}
        className="flex-row gap-2"
        testID="business-card"
      >
        <View className="size-20 rounded-lg dark:bg-card-secondary-dark justify-center items-center bg-card">
          <Icon name="office-building" size={32} isThemed />
        </View>
        <View>
          <Text className="font-semibold text-foreground dark:text-foreground-dark">
            Kunal Developer
          </Text>
          <View className="flex-row gap-2">
            <Icon name="home-map-marker" color={colors.primary} size={20} />
            <Text className="font-sans text-muted dark:text-muted-dark">
              2 - Items
            </Text>
          </View>
          <Text className="font-sans text-muted dark:text-muted-dark">
            Developer
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

export default Business;
