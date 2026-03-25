import { HomeContext } from "../context";
import React, { useContext } from "react";
import Icon from "@components/display/Icon";
import { useMeStore } from "@stores/me.store";
import { useThemeStore } from "@stores/theme.store";
import { View, Text, Pressable, Image } from "react-native";
import NotificationBell from "@components/feedback/NotificationBell";

type Props = {};

const Header = (props: Props) => {
  const { locationModel, setLocationModel } = useContext(HomeContext);
  const colors = useThemeStore((st) => st.colors);
  const { userLocation } = useMeStore();

  const openLocationModel = () => {
    setLocationModel(!locationModel);
  };

  return (
    <View testID="header" className="flex-row justify-between items-center">
      <Pressable
        onPress={openLocationModel}
        testID="profile-location"
        className="flex-row gap-3"
      >
        <Image
          className="size-14 rounded-full"
          src="https://cdn.pfpfinder.com/uploads/Link-Click-1705112947006.jpg"
        />
        <View className="flex-col gap-0">
          <Text className="font-medium text-foreground dark:text-foreground-dark">
            Location
          </Text>
          <View className="flex-row items-center">
            <Icon name="map-marker" size={19} color={colors.primary} />
            {userLocation ? (
              <Text className="font-sans capitalize text-muted dark:text-muted-dark">
                {userLocation?.city}, {userLocation?.state}
              </Text>
            ) : (
              <Text className="font-sans italic capitalize text-muted text-sm dark:text-muted-dark">
                Click to set location
              </Text>
            )}
          </View>
        </View>
      </Pressable>
      <NotificationBell count={3} />
    </View>
  );
};

export default Header;
