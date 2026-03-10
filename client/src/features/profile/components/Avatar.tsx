import Icon from "@components/display/Icon";
import React, { useContext } from "react";
import { ProfileContext } from "../context";
import Animated from "react-native-reanimated";
import { View, Text, Image } from "react-native";

const Avatar = () => {
  const { headerHeight, onProfileLayout, profileZoom } =
    useContext(ProfileContext);

  return (
    <View
      testID="avatar"
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
  );
};

export default Avatar;
