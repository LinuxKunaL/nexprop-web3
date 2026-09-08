import clsx from "clsx";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useWalletStore } from "@stores/wallet.store";
import AvatarView, {
  genConfig,
  NiceAvatarProps,
} from "@zamplyy/react-native-nice-avatar";
import { generateAvatarConfig } from "@utils/generateAvatarConfig";
import { View } from "react-native";

export type AvatarProps = NiceAvatarProps & {
  size?: number;
};

export const Avatar = (props: AvatarProps) => {
  const { address } = useWalletStore();

  const avatarConfig = generateAvatarConfig(address);
  const config = genConfig(avatarConfig);

  const size = props.size ?? 128;
  const isCircle = props.shape === "circle";

  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: isCircle ? size / 2 : 0,
        overflow: "hidden",
      }}
    >
      <LinearGradient
        colors={[
          avatarConfig.gradientColors[0],
          avatarConfig.gradientColors[1],
        ]}
        start={{ x: 0.93, y: 0.75 }}
        end={{ x: 0.07, y: 0.25 }}
        style={{
          width: size,
          height: size,
        }}
      >
        <AvatarView
          size={size}
          shape={props.shape}
          {...config}
          bgColor="transparent"
          isGradient
        />
      </LinearGradient>
    </View>
  );
};