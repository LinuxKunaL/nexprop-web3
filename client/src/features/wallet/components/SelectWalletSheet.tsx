import React, { RefObject } from "react";
import Icon from "@components/display/Icon";
import useWallet from "../hooks/use-wallet";
import { TSheetRef } from "@types_/bottomSheet";
import Button from "@components/buttons/Button";
import { useThemeStore } from "@stores/theme.store";
import IconButton from "@components/buttons/IconButton";
import { View, Text, Image, ScrollView, ToastAndroid } from "react-native";
import BottomSheetContainer from "@components/overlays/BottomSheetContainer";
import useSupportedWallets from "@features/wallet/hooks/use-supported-wallets";
import { TWalletCatlog } from "../types/wallet";
import { useRouter } from "expo-router";

type Props = {
  ref: RefObject<TSheetRef | null>;
  height?: number;
};

export default function SelectWalletSheet({ ref, height = 600 }: Props) {
  const colors = useThemeStore((st) => st.colors);
  const { walletList } = useSupportedWallets();
  const router = useRouter();

  const { connectWallet, loading } = useWallet();

  const handleWalletSelect = async (wallet: TWalletCatlog) => {
    ref.current?.close();
    await connectWallet(wallet);
  };

  return (
    <BottomSheetContainer ref={ref} height={height}>
      <View className="gap-1 flex-1">
        <View className="flex-row justify-between items-center">
          <Text className="font-medium text-xl dark:text-foreground-dark text-foreground">
            Select Wallet
          </Text>
          <IconButton
            onPress={() => {
              if (ref.current != null) {
                ref.current.close();
              }
            }}
            variant="theme"
            name="close"
            iconSize={24}
          />
        </View>
        <Text className="font-normal text-md dark:text-foreground-dark text-foreground">
          Choose a wallet to connect to dApp
        </Text>
        <View className="bg-primary/5 rounded-xl border-[1px] border-primary/30 p-2 flex-row items-center gap-1 mt-3">
          <Icon name="shield-account-variant" color={colors.primary} />
          <View className="gap-1">
            <Text className="text-primary text-sm font-medium">
              Your Connection is secure
            </Text>
            <Text className="font-normal text-xs dark:text-foreground-dark text-foreground">
              We never store you private keys or personal data.
            </Text>
          </View>
        </View>
        {walletList.length == 0 ? (
          <View className="gap-1 flex-row items-center flex-1 justify-center">
            <Icon name="wallet-bifold" color={colors.primary} size={20} />
            <Text className="font-medium text-md dark:text-foreground-dark text-foreground">
              Wallets not found
            </Text>
          </View>
        ) : (
          <View className="mt-4 gap-3 flex-1">
            <View className="flex gap-2 flex-row items-center">
              <Icon size={16} name="creation" color={colors.primary} />
              <Text className="font-semibold text-md dark:text-foreground-dark text-foreground">
                Detected Wallets
              </Text>
            </View>
            <ScrollView>
              <View className="gap-4">
                {walletList.map((wallet, inx) => (
                  <View
                    key={inx}
                    className="bg-primary/5 rounded-xl border-[1px] border-primary/30 p-2 flex-row items-center justify-between"
                  >
                    <View className="flex-row gap-2 items-center">
                      <Image
                        className="size-14 rounded-lg"
                        src={wallet.logoUrl}
                      />
                      <Text className="font-medium text-lg dark:text-foreground-dark text-foreground">
                        {wallet.name}
                      </Text>
                    </View>
                    <Button
                      onPress={() => handleWalletSelect(wallet)}
                      variant="solid"
                      size="md"
                      fontSize="sm"
                      disabled={loading}
                    >
                      Connect
                    </Button>
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>
        )}
      </View>
    </BottomSheetContainer>
  );
}
