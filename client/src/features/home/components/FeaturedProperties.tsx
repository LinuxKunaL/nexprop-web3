import React from "react";
import { useRouter } from "expo-router";
import Icon from "@components/display/Icon";
import Badge from "@components/feedback/Badge";
import { View, Text, ScrollView, Pressable, Image } from "react-native";
import { useThemeStore } from "@stores/theme.store";

const FeaturedProperties = () => {
  const router = useRouter();
const colors = useThemeStore((st) => st.colors);
  return (
    <View testID="featured-properties">
      <View testID="title" className="flex-row gap-1">
        <Text className="font-semibold dark:text-foreground-dark text-foreground text-lg">
          Featured
        </Text>
        <Text className="dark:text-muted-dark text-muted font-sans text-lg">
          Properties
        </Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View className="pt-4 flex-row gap-4" testID="properties-container">
          {Array.from({ length: 3 }).map((_, key) => (
            <Pressable
              key={key}
              className="size-64 rounded-xl overflow-hidden relative border-[1px]q border-border-dark/20"
              onPress={() => {
                router.navigate("/property/10");
              }}
            >
              <View
                testID="float-details"
                className="z-40 w-full flex-col justify-between h-full"
              >
                <View className="p-2">
                  <Badge
                    size="sm"
                    textColor={colors.primary}
                    variant="whiteSolid"
                  >
                    2 Km away
                  </Badge>
                </View>

                <View className="dark:bg-foreground/80 bg-foreground-dark p-2 flex-row justify-between items-center">
                  <View className="flex-col">
                    <Text className="dark:text-foreground-dark font-semibold">
                      Revanta, parks
                    </Text>
                    <Text className="dark:text-muted-dark text-muted font-sans">
                      lonikand , 12 va mail
                    </Text>
                  </View>
                  <Icon name="bookmark" isThemed />
                </View>
              </View>
              <Image
                className="absolute size-64"
                src="https://cdn.shopify.com/s/files/1/0163/6622/files/realestate8_1024x1024.jpg?v=1665516166"
              />
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default FeaturedProperties;
