import clsx from "clsx";
import Icon from "./Icon";
import IconButton from "./IconButton";
import { colors } from "src/constants/theme";
import { View, Text, Vibration } from "react-native";
import { useTheme } from "@providers/ThemeProvider";
import { Pressable as PressView } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function CustomTabBar({ state, navigation }: BottomTabBarProps) {
  const { theme } = useTheme();
  const { bottom } = useSafeAreaInsets();
  const activeRoute = state.routes[state.index].name.split("/")[0];

  const iconTheme = theme === "dark" ? colors["muted-dark"] : colors["muted"];

  const navigate = (path: string) => {
    Vibration.vibrate(100);
    navigation.navigate(`${path}/index`);
  };

  return (
    <View
      className="flex-row bg-card dark:bg-card-dark px-1 py-2 h-24"
      style={{ paddingBottom: bottom }}
    >
      <PressView
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
      </PressView>
      <PressView
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
      </PressView>
      <PressView
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
      </PressView>
      <PressView
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
      </PressView>
      <PressView
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
      </PressView>
    </View>
  );
}
