import React from "react";
import { View, Text, Image } from "react-native";
import { BlurView } from "expo-blur";
import Icon from "./Icon";
import Badge from "./Badge";
import { colors } from "@constants/theme";
import { useTheme } from "@providers/ThemeProvider";

type PropertyGlassCardProps = {
  item: {
    title: string;
    location: string;
    image: string;
    price: string;
    distance: string;
  };
};

const PropertyGlassCard = ({ item }: PropertyGlassCardProps) => {
  const { theme } = useTheme();
  const tintThemed =
    theme == "dark"
      ? "systemUltraThinMaterialDark"
      : "systemUltraThinMaterialLight";

  return (
    <BlurView
      intensity={40}
      className="rounded-lg overflow-hidden"
      tint={tintThemed}
      experimentalBlurMethod="dimezisBlurView"
    >
      <View className="flex-row gap-2 w-full bg-card/80 dark:bg-card-dark/80">
        <Image className="size-28" src={item.image} />
        <View className="flex-col justify-between flex-1 z-10 relative py-2 pr-2">
          <View>
            <Text
              className="text-foreground dark:text-foreground-dark font-medium"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {item.title}
            </Text>

            <View className="flex-row items-center gap-1">
              <Icon name="map-marker" size={15} color={colors.primary} />
              <Text
                className="font-sans capitalize text-muted dark:text-muted-dark"
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {item.location}
              </Text>
            </View>
          </View>
          <View className="flex-row justify-between">
            <Badge
              size="sm"
              iconPlace="after"
              textColor="white"
              variant="primarySolid"
              icon={{ name: "ethereum", color: "white" }}
            >
              {item.price}
            </Badge>

            <Badge size="sm" iconPlace="after" variant="graySolid">
              {item.distance}
            </Badge>
          </View>
        </View>
      </View>
    </BlurView>
  );
};

export default PropertyGlassCard;
