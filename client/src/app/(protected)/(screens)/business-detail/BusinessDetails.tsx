import {
  View,
  Text,
  ScrollView,
  Image,
  LayoutChangeEvent,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Modal,
} from "react-native";
import React, { useRef, useState } from "react";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import clsx from "clsx";
import IconButton from "@ui/IconButton";
import Icon from "@ui/Icon";
import { useTheme } from "@providers/ThemeProvider";
import { colors } from "@constants/theme";
import TouchableText from "@ui/TouchableText";
import Input from "@ui/Input";
import Badge from "@ui/Badge";
import { TSheetRef } from "@types_/bottomSheet";

import LocationBottomSheet from "@screen/(protected)/(tabs)/search/components/LocationBottomSheet";
import TypeBottomSheet from "@screen/(protected)/(tabs)/search/components/TypeBottomSheet";
import AreaBottomSheet from "@screen/(protected)/(tabs)/search/components/AreaBottomSheet";
import PriceBottomSheet from "@screen/(protected)/(tabs)/search/components/PriceBottomSheet";
import { properties } from "@screen/(protected)/(tabs)/home";
import PropertyGlassCard from "@ui/PropertyGlassCard";
import BusinessBgSvg from "@assets/images/business-bg-svg";

type Props = {};

const BusinessDetails = (props: Props) => {
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
  const filters = ["Location", "Type", "Area", "Price"] as const;

  const locationBottomSheetRef = useRef<TSheetRef | null>(null);
  const typeBottomSheetRef = useRef<TSheetRef | null>(null);
  const areaBottomSheetRef = useRef<TSheetRef | null>(null);
  const priceBottomSheetRef = useRef<TSheetRef | null>(null);

  type FilterKey = (typeof filters)[number];

  const sheetRefs: Record<FilterKey, React.RefObject<TSheetRef | null>> = {
    Location: locationBottomSheetRef,
    Type: typeBottomSheetRef,
    Area: areaBottomSheetRef,
    Price: priceBottomSheetRef,
  };
  const handleOpenFilterSheet = (key: (typeof filters)[number]) => {
    sheetRefs[key].current?.open();
  };
  return (
    <View className="flex-1">
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
          <IconButton name="arrow-left" iconSize={24} variant="theme" />
          <Text className="font-medium text-xl text-foreground dark:text-foreground-dark">
            My Business
          </Text>
          <IconButton name="pencil" iconSize={24} variant="theme" />
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
            <BusinessBgSvg className="absolute w-full h-48 opacity-30" />
            <View testID="profile-photo" className="gap-2 justify-center px-4">
              <View className="size-28 rounded-lg dark:bg-card-secondary-dark justify-center items-center bg-card">
                <Icon name="office-building" size={48} isThemed />
              </View>
              <View className="gap-2">
                <Text className="text-foreground dark:text-foreground-dark text-xl font-medium">
                  Kunal Developer
                </Text>
                <Text className="font-sans text-muted dark:text-muted-dark">
                  Developer
                </Text>
                <View className="flex-row gap-2">
                  <Icon name="map-marker" color={colors.primary} size={20} />
                  <Text className="font-medium  text-muted dark:text-muted-dark">
                    Kharadhi
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View className="px-4 gap-4">
            <View
              className="justify-between flex-row items-center"
              testID="title"
            >
              <Text className="text-foreground dark:text-foreground-dark text-lg font-medium">
                All Properties
              </Text>
              <TouchableText textClassName="text-primary font-sans underline">
                Add Properties
              </TouchableText>
            </View>
            <View testID="search">
              <Input placeholder="Search Properties" />
              <Icon
                className="absolute right-3 top-3"
                name="magnify"
                isThemed
              />
            </View>
            <View testID="filters" className="">
              <View className="flex-row gap-4">
                {filters.map((item, idx) => (
                  <Badge
                    key={idx}
                    iconPlace="after"
                    variant="graySolid"
                    onPress={() => {
                      handleOpenFilterSheet(item);
                    }}
                    containerClassName="flex-auto"
                    icon={{ name: "arrow-down", size: 15, themed: true }}
                  >
                    {item}
                  </Badge>
                ))}
              </View>
              <LocationBottomSheet ref={locationBottomSheetRef} />
              <TypeBottomSheet ref={typeBottomSheetRef} />
              <AreaBottomSheet ref={areaBottomSheetRef} />
              <PriceBottomSheet ref={priceBottomSheetRef} />
            </View>
            <View testID="properties-list" className="mb-10">
              <View className="flex-col gap-6" testID="properties-container">
                {properties.map((item) => (
                  <PropertyGlassCard key={item.id} item={item} />
                ))}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default BusinessDetails;
