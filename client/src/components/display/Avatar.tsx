import clsx from "clsx";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useWalletStore } from "@stores/wallet.store";
import AvatarView, {
  genConfig,
  NiceAvatarProps,
} from "@zamplyy/react-native-nice-avatar";
import { generateAvatarConfig } from "@utils/generateAvatarConfig";

export type AvatarProps = NiceAvatarProps & {
  size?: number;
};

export const Avatar = (props: AvatarProps) => {
  const { address } = useWalletStore();
  const avatarConfig = generateAvatarConfig(address);
  const config = genConfig(avatarConfig);

  return (
    <LinearGradient
      className={clsx(
        "overflow-hidden",
        props.shape == "circle" && "rounded-full",
      )}
      colors={[avatarConfig.gradientColors[0], avatarConfig.gradientColors[1]]}
      start={{ x: 0.93, y: 0.75 }}
      end={{ x: 0.07, y: 0.25 }}
    >
      <AvatarView
        size={props.size}
        shape={props.shape}
        {...config}
        bgColor="transparent"
        isGradient
      />
    </LinearGradient>
  );
};
