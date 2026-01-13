import React from "react";
import Icon from "@ui/Icon";
import Input from "@ui/Input";
import Badge from "@ui/Badge";
import { colors } from "@constants/theme";
import NotificationBell from "@ui/NotificationBell";
import { Image, ScrollView, Text, View } from "react-native";
import PropertyGlassCard from "@ui/PropertyGlassCard";
import { TabBarSpacer } from "@ui/CustomTabBar";

export default function index() {
  const categories = ["Department", "Office", "Bungalow", "Area", "Villa"];

  const properties = [
    {
      id: 1,
      title: "Samiksha Nivas",
      location: "Lonikand, Pune",
      image:
        "https://cdn.shopify.com/s/files/1/0163/6622/files/realestate8_1024x1024.jpg?v=1665516166",
      price: "2 ETH",
      distance: "9 km Away",
    },
    {
      id: 2,
      title: "Green Valley Heights",
      location: "Wakad, Pune",
      image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994",
      price: "3.5 ETH",
      distance: "4 km Away",
    },
    {
      id: 3,
      title: "Skyline Residency",
      location: "Baner, Pune",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
      price: "1.8 ETH",
      distance: "6 km Away",
    },
    {
      id: 4,
      title: "Blue Pearl Homes",
      location: "Kharadi, Pune",
      image: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6",
      price: "2.2 ETH",
      distance: "3 km Away",
    },
    {
      id: 5,
      title: "Elite Horizon",
      location: "Hadapsar, Pune",
      image: "https://images.unsplash.com/photo-1599423300746-b62533397364",
      price: "4 ETH",
      distance: "11 km Away",
    },
    {
      id: 6,
      title: "Urban Nest",
      location: "Viman Nagar, Pune",
      image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914",
      price: "2.7 ETH",
      distance: "5 km Away",
    },
  ];

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
      <ScrollView bounces showsVerticalScrollIndicator={false}>
        <View className="flex-col gap-7 mb-10">
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
              <View
                className="pt-4 flex-row gap-4"
                testID="properties-container"
              >
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
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>
          <View testID="categories">
            <ScrollView horizontal>
              <View className="flex-row gap-4">
                {categories.map((category, idx) => (
                  <Badge key={idx} variant="graySolid">
                    {category}
                  </Badge>
                ))}
              </View>
            </ScrollView>
          </View>
          <View testID="latest-properties">
            <View testID="title" className="flex-row gap-1">
              <Text className="font-semibold dark:text-foreground-dark text-foreground text-lg">
                latest
              </Text>
              <Text className="dark:text-muted-dark text-muted font-sans text-lg">
                Properties
              </Text>
            </View>
            <View className="pt-4 flex-col gap-6" testID="properties-container">
              {properties.map((item) => (
                <PropertyGlassCard key={item.id} item={item} />
              ))}
            </View>
          </View>
        </View>
        <TabBarSpacer />
      </ScrollView>
    </View>
  );
}
