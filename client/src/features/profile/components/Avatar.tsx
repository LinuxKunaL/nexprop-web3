import Icon from "@components/display/Icon";
import React, { useContext } from "react";
import { ProfileContext } from "../context";
import Animated from "react-native-reanimated";
import { View, Text, useWindowDimensions } from "react-native";
import { Avatar as AvatarView } from "@components/display/Avatar";

const Avatar = () => {
  const { headerHeight, onProfileLayout, profileZoom } =
    useContext(ProfileContext);
  const { width } = useWindowDimensions();

  return (
    <View
      testID="avatar"
      style={{
        paddingTop: headerHeight,
      }}
      onLayout={onProfileLayout}
      className="overflow-hidden"
    >
      <Animated.View
        className="absolute w-full h-44 opacity-30s overflow-hidden items-center justify-center"
        style={profileZoom}
      >
        <View className="bg-white/60 dark:bg-black/60 z-10 size-full absolute" />
        <AvatarView isGradient size={width} shape="square" />
      </Animated.View>
      <View
        testID="profile-photo"
        className="gap-2 justify-center items-center"
      >
        <AvatarView size={112} shape="circle" />
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
