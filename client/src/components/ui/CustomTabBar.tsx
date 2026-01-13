import clsx from "clsx";
import Icon from "./Icon";
import IconButton from "./IconButton";
import { Pressable } from "react-native";
import { colors } from "src/constants/theme";
import { View, Text, Vibration } from "react-native";
import { useTheme } from "@providers/ThemeProvider";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BlurView } from "expo-blur";

export default function CustomTabBar({ state, navigation }: BottomTabBarProps) {
  const { theme } = useTheme();
  const { bottom } = useSafeAreaInsets();
  const activeRoute = state.routes[state.index].name.split("/")[0];

  const iconTheme = theme === "dark" ? colors["muted-dark"] : colors["muted"];
  const tintThemed =
    theme == "dark"
      ? "systemUltraThinMaterialDark"
      : "systemUltraThinMaterialLight";

  const navigate = (path: string) => {
    Vibration.vibrate(100);
    navigation.navigate(`${path}/index`);
  };

  return (
    <BlurView
      intensity={40}
      className="absolute bottom-0 left-0 right-0"
      tint={tintThemed}
      experimentalBlurMethod="dimezisBlurView"
    >
      <View
        className="flex-row bg-card/50 dark:bg-card-dark/70 px-1 py-2 h-24"
        style={{ paddingBottom: bottom }}
      >
        <Pressable
          className="flex-col gap-1 justify-center items-center flex-1"
          onPress={() => {
            navigate("home");
          }}
        >
          <Icon
            name="home"
            color={activeRoute == "home" ? colors.primary : iconTheme}
          />
          <Text
            className={clsx(
              "font-medium",
              activeRoute == "home"
                ? "text-primary"
                : "dark:text-muted-dark text-muted"
            )}
          >
            Home
          </Text>
        </Pressable>
        <Pressable
          className="flex-col gap-1 justify-center items-center flex-1"
          onPress={() => {
            navigate("search");
          }}
        >
          <Icon
            name="magnify"
            color={activeRoute == "search" ? colors.primary : iconTheme}
          />
          <Text
            className={clsx(
              "font-medium",
              activeRoute == "search"
                ? "text-primary"
                : "dark:text-muted-dark text-muted"
            )}
          >
            Search
          </Text>
        </Pressable>
        <View
          className="justify-center items-center size-20 relative -top-11 rounded-full dark:bg-card-dark bg-card"
          testID="create-property-button"
        >
          <IconButton
            name="plus"
            variant="primary"
            className="!size-14 !rounded-full"
            iconSize={31}
            color="white"
          />
        </View>
        <Pressable
          className="flex-col gap-1 justify-center items-center flex-1"
          onPress={() => {
            navigate("wishlist");
          }}
        >
          <Icon
            name="heart"
            color={activeRoute == "wishlist" ? colors.primary : iconTheme}
          />
          <Text
            className={clsx(
              "font-medium",
              activeRoute == "wishlist"
                ? "text-primary"
                : "dark:text-muted-dark text-muted"
            )}
          >
            Wishlist
          </Text>
        </Pressable>
        <Pressable
          className="flex-col gap-1 justify-center items-center flex-1"
          onPress={() => {
            navigate("profile");
          }}
        >
          <Icon
            name="account"
            color={activeRoute == "profile" ? colors.primary : iconTheme}
          />
          <Text
            className={clsx(
              "font-medium",
              activeRoute == "profile"
                ? "text-primary"
                : "dark:text-muted-dark text-muted"
            )}
          >
            Profile
          </Text>
        </Pressable>
      </View>
    </BlurView>
  );
}

export function TabBarSpacer() {
  return <View className="h-24" />;
}
