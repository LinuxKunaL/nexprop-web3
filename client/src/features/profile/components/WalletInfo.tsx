import { View, Text } from "react-native";
import React from "react";
import Icon from "@components/display/Icon";
import { useThemeStore } from "@stores/theme.store";
import { useWalletStore } from "@stores/wallet.store";
import shortAddress from "@utils/shortAddress";

const WalletInfo = () => {
  const colors = useThemeStore((st) => st.colors);
  const { address,balance } = useWalletStore();
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
              {shortAddress(address)}
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
            {balance} ETH
          </Text>
        </View>
      </View>
    </View>
  );
};

export default WalletInfo;
