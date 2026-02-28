import React, { useState } from "react";
import Icon from "@ui/Icon";
import Button from "@ui/Button";
import { properties } from "../home";
import IconButton from "@ui/IconButton";
import { colors } from "@constants/theme";
import TouchableText from "@ui/TouchableText";
import PropertyGlassCard from "@ui/PropertyGlassCard";
import {
  View,
  Text,
  Image,
  ScrollView,
  LayoutChangeEvent,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { clsx } from "clsx";
import { useTheme } from "@providers/ThemeProvider";
import { useRouter } from "expo-router";

export default function Profile() {
  const router = useRouter();
  const { top } = useSafeAreaInsets();
  const [headerHeight, setHeaderHeight] = useState<number>(86);
  const [profileViewHeight, setProfileViewHeight] = useState<number>(260);
  const [isHeaderBorder, setIsHeaderBorder] = useState<boolean>(false);
  const headerOpacity = useSharedValue<number>(0);
  const bgImageTransform = useSharedValue<number>(0);
  const { theme } = useTheme();

  const onHeaderLayout = (event: LayoutChangeEvent) => {
    setHeaderHeight(event.nativeEvent.layout.height);
  };

  const onProfileLayout = (event: LayoutChangeEvent) => {
    setProfileViewHeight(event.nativeEvent.layout.height);
  };

  const handleOnScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollOffsetY = Math.round(event.nativeEvent.contentOffset.y);
    headerOpacity.set(scrollOffsetY);
    bgImageTransform.set(scrollOffsetY);

    // header Bottom Border
    const shouldShowBorder = scrollOffsetY + headerHeight > profileViewHeight;
    if (shouldShowBorder !== isHeaderBorder) {
      setIsHeaderBorder(shouldShowBorder);
    }
  };

  const headerFadeColor = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      headerOpacity.value,
      [0, 150],
      [
        "rgba(0,0,0,0)",
        theme === "dark" ? colors["background-dark"] : colors.card,
      ],
    );
    return {
      backgroundColor,
      paddingTop: top + 10,
    };
  });

  const profileZoom = useAnimatedStyle(() => {
    const translateY = interpolate(
      bgImageTransform.value,
      [0, 100],
      [0, 50],
      "extend",
    );
    const scale = interpolate(
      bgImageTransform.value,
      [0, 100],
      [1, 1.5],
      "clamp",
    );
    return {
      transform: [{ translateY }, { scale }],
    };
  });

  return (
    <View>
      <Animated.View
        style={headerFadeColor}
        className={clsx(
          "px-4 z-10 absolute w-full border-[1px] border-transparent",
          isHeaderBorder &&
            (theme === "dark" ? "border-b-border-dark/50" : "border-b-border"),
        )}
        onLayout={onHeaderLayout}
      >
        <View className="flex-row justify-between items-center pb-5">
          <Text className="font-medium text-xl text-foreground dark:text-foreground-dark">
            Profile
          </Text>
          <IconButton name="cog-outline" iconSize={24} variant="theme" />
        </View>
      </Animated.View>
      <ScrollView
        onScroll={handleOnScroll}
        showsVerticalScrollIndicator={false}
      >
        <View
          className="dark:bg-background-dark bg-background flex-1 gap-5 pb-10"
          testID="screen"
        >
          <View
            testID="header"
            style={{
              paddingTop: headerHeight,
            }}
            onLayout={onProfileLayout}
            className="overflow-hidden"
          >
            <Animated.Image
              className="absolute w-full h-44 opacity-30"
              style={profileZoom}
              src="https://cdn.pfpfinder.com/uploads/Link-Click-1705112947006.jpg"
            />
            <View
              testID="profile-photo"
              className="gap-2 justify-center items-center"
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
          <View className="px-4 gap-5" testID="business">
            <View
              className="justify-between flex-row items-center"
              testID="title"
            >
              <Text className="text-foreground dark:text-foreground-dark text-lg font-medium">
                My Business
              </Text>
              <TouchableText
                onPress={() => {
                  router.navigate(
                    "/(protected)/(screens)/business-detail/BusinessDetails",
                  );
                }}
                textClassName="text-primary font-sans underline"
              >
                Edit Business
              </TouchableText>
            </View>
            <View className="flex-row gap-2" testID="business-card">
              <View className="size-20 rounded-lg dark:bg-card-secondary-dark justify-center items-center bg-card">
                <Icon name="office-building" size={32} isThemed />
              </View>
              <View>
                <Text className="font-semibold text-foreground dark:text-foreground-dark">
                  Kunal Developer
                </Text>
                <View className="flex-row gap-2">
                  <Icon
                    name="home-map-marker"
                    color={colors.primary}
                    size={20}
                  />
                  <Text className="font-sans text-muted dark:text-muted-dark">
                    2 - Items
                  </Text>
                </View>
                <Text className="font-sans text-muted dark:text-muted-dark">
                  Developer
                </Text>
              </View>
            </View>
          </View>
          <View className="px-4 gap-5" testID="action">
            <View
              className="justify-between flex-row items-center"
              testID="title"
            >
              <Text className="text-foreground dark:text-foreground-dark text-lg font-medium">
                Action
              </Text>
            </View>
            <View className="flex-col gap-4" testID="button-list">
              <Button
                size="lg"
                className="bg-[#EA4335]/20"
                fontSize="md"
                textColor="#EA4335"
                variant="transparent"
                icon={{ name: "logout", color: "#EA4335", size: 20 }}
              >
                Logout
              </Button>
              <Button
                size="lg"
                className="bg-[#EA4335]/20"
                fontSize="md"
                textColor="#EA4335"
                variant="transparent"
                icon={{ name: "link-off", color: "#EA4335", size: 20 }}
              >
                Disconnect Wallet{" "}
              </Button>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
