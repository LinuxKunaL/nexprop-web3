import { clsx } from "clsx";
import Icon from "../display/Icon";
import IconButton from "../buttons/IconButton";
import { useTheme } from "@providers/ThemeProvider";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  View,
  Text,
  Vibration,
  Pressable as PressView,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { useThemeStore } from "@stores/theme.store";
import CustomCircle from "@components/layout/CustomCircle";

export default function CustomTabBar({ state, navigation }: BottomTabBarProps) {
  const router = useRouter();
  const { theme } = useTheme();
  const { bottom } = useSafeAreaInsets();
  const colors = useThemeStore((st) => st.colors);
  const activeRoute = state.routes[state.index].name.split("/")[0];
  const iconTheme = theme === "dark" ? colors["muted-dark"] : colors["muted"];

  const navigate = (path: string) => {
    if (Platform.OS === "android") {
      Vibration.vibrate(100);
    }
    navigation.navigate(path);
  };

  const openAddpropery = () => {
    router.navigate("/property/add");
  };

  return (
    <View
      className="flex-row bg-card dark:bg-card-dark px-1 py-2 max-h-full border-t-[0.9px] border-border/70 dark:border-border-dark/30"
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
          color={activeRoute === "home" ? colors.primary : iconTheme}
        />
        <Text
          className={clsx(
            "font-medium",
            activeRoute === "home"
              ? "text-primary"
              : "dark:text-muted-dark text-muted",
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
          color={activeRoute === "search" ? colors.primary : iconTheme}
        />
        <Text
          className={clsx(
            "font-medium",
            activeRoute === "search"
              ? "text-primary"
              : "dark:text-muted-dark text-muted",
          )}
        >
          Search
        </Text>
      </PressView>
      <PressView
        className="justify-center items-center size-20 relative -top-12 rounded-full dark:bg-card-dark bg-card"
        onPress={openAddpropery}
        testID="create-property-button"
      >
        <CustomCircle size={72} strokeWidth={0.9}>
          <IconButton
            name="plus"
            variant="primary"
            className="!size-14 !rounded-full"
            onPress={openAddpropery}
            iconSize={31}
            color="white"
          />
        </CustomCircle>
      </PressView>
      <PressView
        className="flex-col gap-1 justify-center items-center flex-1"
        onPress={() => {
          navigate("wishlist");
        }}
      >
        <Icon
          name="heart"
          color={activeRoute === "wishlist" ? colors.primary : iconTheme}
        />
        <Text
          className={clsx(
            "font-medium",
            activeRoute === "wishlist"
              ? "text-primary"
              : "dark:text-muted-dark text-muted",
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
          color={activeRoute === "profile" ? colors.primary : iconTheme}
        />
        <Text
          className={clsx(
            "font-medium",
            activeRoute === "profile"
              ? "text-primary"
              : "dark:text-muted-dark text-muted",
          )}
        >
          Profile
        </Text>
      </PressView>
    </View>
  );
}
