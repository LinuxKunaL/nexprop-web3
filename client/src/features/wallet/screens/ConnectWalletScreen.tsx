import { useRef } from "react";
import { View, Text } from "react-native";
import { TSheetRef } from "@types_/bottomSheet";
import Button from "@components/buttons/Button";
import WalletEth from "@assets/images/svgs/wallet-eth";
import SelectWalletSheet from "../components/SelectWalletSheet";

export default function ConnectWalletScreen() {
  const selectWalletSheetRef = useRef<TSheetRef | null>(null);

  const connectWallet = () => {
    selectWalletSheetRef.current?.open();
  };

  return (
    <View
      className="flex-1 dark:bg-background-dark bg-background"
      testID="screen"
    >
      <View testID="building-image">
        <WalletEth />
      </View>
      <View testID="container" className="mt-3 gap-4">
        <View testID="container-test" className="gap-4">
          <Text className="font-semibold dark:text-foreground-dark text-foreground text-2xl">
            Connect Your Wallet
          </Text>
          <Text className="font-sans dark:text-muted-dark text-muted text-lg">
            Securely connect your crypto wallet to start buying, bidding, or
            listing properties. quickly and securely.
          </Text>
        </View>
        <View testID="wallet-button">
          <Button
            size="md"
            fontSize="lg"
            onPress={connectWallet}
            variant="secondary"
            icon={{ name: "wallet", color: "white" }}
          >
            Connect Wallet
          </Button>
        </View>
        <SelectWalletSheet ref={selectWalletSheetRef} />
      </View>
    </View>
  );
}
