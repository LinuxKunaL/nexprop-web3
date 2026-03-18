import { View, Text } from "react-native";
import React from "react";
import Icon from "@components/display/Icon";
import { useThemeStore } from "@stores/theme.store";

type Props = {};

const WalletInfo = (props: Props) => {
  const colors = useThemeStore((st) => st.colors);
  return (
    <View className="px-4 gap-5" testID="wallet-info">
      <View className="flex-row gap-2">
        <View className=" size-12 rounded-lg justify-center items-center bg-primary/20">
          <Icon name="ethereum" color={colors.primary} size={25} />
        </View>
        <View>
          <Text className="text-foreground dark:text-foreground-dark text-lg font-medium">
            Ethereum Address
          </Text>
          <View className="flex-row gap-2 items-center">
            <Text className="text-muted dark:text-muted-dark font-sans">
              0xAb5....aeC9B
            </Text>
            <Icon
              name="clipboard-text-outline"
              color={colors.primary}
              size={18}
            />
          </View>
        </View>
      </View>
      <View className="flex-row gap-2">
        <View className=" size-12 rounded-lg justify-center items-center bg-primary/20">
          <Icon name="wallet-outline" color={colors.primary} size={25} />
        </View>
        <View>
          <Text className="text-foreground dark:text-foreground-dark text-lg font-medium">
            Wallet Balance
          </Text>
          <Text className="text-muted dark:text-muted-dark font-sans">
            12.34 ETH
          </Text>
        </View>
      </View>
    </View>
  );
};

export default WalletInfo;
