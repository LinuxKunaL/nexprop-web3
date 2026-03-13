import { View, Text, Pressable, Image } from "react-native";
import React, { useContext } from "react";
import Icon from "@components/display/Icon";
import NotificationBell from "@components/feedback/NotificationBell";
import { colors } from "@constants/theme";
import { usePersistentState } from "@hooks/other/use-persistent-state";
import { TLocation } from "@components/maps/types";
import { HomeContext } from "../context";

type Props = {};

const Header = (props: Props) => {
  const { locationModel, setLocationModel } = useContext(HomeContext);
  const [userLocation] = usePersistentState<TLocation>("user_location");
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
          <View className="flex-row">
            <Icon name="map-marker" size={19} color={colors.primary} />
            <Text className="font-sans capitalize text-muted dark:text-muted-dark">
              {userLocation?.city}, {userLocation?.state}
            </Text>
          </View>
        </View>
      </Pressable>
      <NotificationBell count={3} />
    </View>
  );
};

export default Header;
