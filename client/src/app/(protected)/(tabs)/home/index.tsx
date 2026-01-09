import React from "react";
import Icon from "@ui/Icon";
import Input from "@ui/Input";
import Badge from "@ui/Badge";
import { colors } from "@constants/theme";
import NotificationBell from "@ui/NotificationBell";
import { Image, ScrollView, Text, View } from "react-native";

export default function index() {
  return (
    <View
      className="dark:bg-background-dark bg-background flex-1 px-4 pt-4 gap-7"
      testID="screen"
    >
      <View testID="header" className="flex-row justify-between items-center">
        <View testID="profile-location" className="flex-row gap-3">
          <Image
            className="size-14 rounded-full"
            src="https://cdn.pfpfinder.com/uploads/Link-Click-1705112947006.jpg"
          />
          <View className="flex-col gap-0">
            <Text className="font-medium text-foreground dark:text-foreground-dark">
              Location
            </Text>
            <View className="flex-row">
              <Icon name="map-marker" size={19} color={colors.primary} />
              <Text className="font-sans capitalize text-muted dark:text-muted-dark">
                lonikand , pune
              </Text>
            </View>
          </View>
        </View>
        <NotificationBell count={3} />
      </View>
      <View testID="search">
        <Input placeholder="Search Properties" />
        <Icon className="absolute right-3 top-3" name="magnify" isThemed />
      </View>
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
              <View
                key={key}
                className="size-64 rounded-xl overflow-hidden relative border-[1px]q border-border-dark/20"
              >
                <View
                  testID="float-details"
                  className="z-40 w-full flex-col justify-between h-full"
                >
                  <View className="p-2">
                    <Badge size="sm" textColor={colors.primary} variant="solid">
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
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
      <View testID="latest-properties"></View>
    </View>
  );
}
