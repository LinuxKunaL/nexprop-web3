import React from "react";
import Icon from "./Icon";
import { Image } from "react-native";
import { useRouter } from "expo-router";
import Badge from "@components/feedback/Badge";
import { TProperty } from "@feature/property/types";
import { useThemeStore } from "@stores/theme.store";
import { View, Text, Pressable } from "react-native";

type PropertyGlassCardProps = {
  item: TProperty | undefined;
};
const PropertyCardv2 = ({ item }: PropertyGlassCardProps) => {
  const router = useRouter();
  const { colors } = useThemeStore();

  return (
    <Pressable
      key={item?.id}
      className="size-64 rounded-xl overflow-hidden relative border-[1px]q border-border-dark/20"
      onPress={() => {
        router.navigate(`/property/${item?.id}`);
      }}
    >
      <View
        testID="float-details"
        className="z-40 w-full flex-col justify-between h-full"
      >
        <View className="p-2">
          <Badge size="sm" textColor={colors.primary} variant="whiteSolid">
            2 Km away
          </Badge>
        </View>
        <View className="dark:bg-foreground/80 bg-foreground-dark p-2 flex-row justify-between items-center">
          <View className="flex-col">
            <Text className="dark:text-foreground-dark font-semibold">
              {item?.title}
            </Text>
            <Text className="dark:text-muted-dark text-muted font-sans">
              {item?.businessName}
            </Text>
          </View>
          <Icon name="bookmark" isThemed />
        </View>
      </View>
      <Image className="absolute size-64" src={item?.image} />
    </Pressable>
  );
};

export default PropertyCardv2;
