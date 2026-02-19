import { View, Text, Image, StatusBar, ScrollView } from "react-native";
import React from "react";
import Icon from "@ui/Icon";
import IconButton from "@ui/IconButton";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "@constants/theme";
import TouchableText from "@ui/TouchableText";
import PropertyGlassCard from "@ui/PropertyGlassCard";
import { properties } from "../home";

export default function Profile() {
  const { top } = useSafeAreaInsets();
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View
        className="dark:bg-background-dark bg-background flex-1 gap-5"
        testID="screen"
      >
        <View testID="header">
          <View
            className="flex-row justify-between items-center px-4 z-10"
            style={{ paddingTop: top + 10 }}
          >
            <Text className="font-medium text-xl text-foreground dark:text-foreground-dark">
              Profile
            </Text>
            <IconButton name="cog-outline" iconSize={24} variant="theme" />
          </View>
          <Image
            className="absolute w-full h-44 opacity-30"
            src="https://cdn.pfpfinder.com/uploads/Link-Click-1705112947006.jpg"
          />
          <View
            testID="profile-photo"
            className="gap-2 justify-center items-center mt-5"
          >
            <Image
              className="size-28 rounded-full"
              src="https://cdn.pfpfinder.com/uploads/Link-Click-1705112947006.jpg"
            />
            <View className="gap-2 items-center">
              <Text className="text-foreground dark:text-foreground-dark text-xl font-medium">
                Kunal lokhande
              </Text>
              <View className="flex-row gap-2">
                <Icon name="pen" isThemed size={20} />
                <Text className="text-muted dark:text-muted-dark font-medium">
                  Edit Profile
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View className="px-4 gap-5" testID="wallet-info">
          <View className="flex-row gap-2">
            <View className=" size-12 rounded-lg justify-center items-center bg-primary/20">
              <Icon name="ethereum" color={colors.primary} size={25} />
            </View>
            <View>
              <Text className="text-foreground dark:text-foreground-dark text-lg font-medium">
                Ethereum Address
              </Text>
              <View className="flex-row gap-2 items-center">
                <Text className="text-muted dark:text-muted-dark font-sans">
                  0xAb5....aeC9B
                </Text>
                <Icon
                  name="clipboard-text-outline"
                  color={colors.primary}
                  size={18}
                />
              </View>
            </View>
          </View>
          <View className="flex-row gap-2">
            <View className=" size-12 rounded-lg justify-center items-center bg-primary/20">
              <Icon name="wallet-outline" color={colors.primary} size={25} />
            </View>
            <View>
              <Text className="text-foreground dark:text-foreground-dark text-lg font-medium">
                Wallet Balance
              </Text>
              <Text className="text-muted dark:text-muted-dark font-sans">
                12.34 ETH
              </Text>
            </View>
          </View>
        </View>
        <View className="px-4 gap-5" testID="escrow">
          <View
            className="justify-between flex-row items-center"
            testID="title"
          >
            <Text className="text-foreground dark:text-foreground-dark text-lg font-medium">
              Current Escrow
            </Text>
            <TouchableText textClassName="text-primary font-sans underline">
              View All
            </TouchableText>
          </View>
          <View className="p-3 gap-2 border-2 rounded-lg border-border/50 dark:border-border-dark/50">
            <View className="flex-row justify-between">
              <Text className="text-muted dark:text-muted-dark font-medium">
                Escrow ID :
              </Text>
              <Text className="text-primary font-medium underline">
                ESC-8891
              </Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-muted dark:text-muted-dark font-medium">
                Locked Amount :
              </Text>
              <Text className="text-foreground dark:text-foreground-dark font-medium underline">
                20 ETH
              </Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-muted dark:text-muted-dark font-medium">
                Verification Time :
              </Text>
              <Text className="text-foreground dark:text-foreground-dark font-medium underline">
                72 Hours
              </Text>
            </View>
          </View>
        </View>
        <View className="px-4 gap-5" testID="properties">
          <View
            className="justify-between flex-row items-center"
            testID="title"
          >
            <Text className="text-foreground dark:text-foreground-dark text-lg font-medium">
              My Properties
            </Text>
            <TouchableText textClassName="text-primary font-sans underline">
              View All
            </TouchableText>
          </View>
          <PropertyGlassCard item={properties[0]} />
        </View>
      </View>
    </ScrollView>
  );
}
