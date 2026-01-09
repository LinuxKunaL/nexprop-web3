import Button from "@ui/Button";
import { View, Text } from "react-native";
import WalletConnect from "@assets/images/wallet-eth.svg";
import { useRouter } from "expo-router";

export default function ConnectWallet() {
    const router = useRouter();
  return (
    <View
      className="flex-1 dark:bg-background-dark bg-background"
      testID="screen"
    >
      <View className="" testID="building-image">
        <WalletConnect />
      </View>
      <View testID="container" className="mt-3 gap-6">
        <View testID="container-test" className="gap-4">
          <Text className="font-semibold dark:text-foreground-dark text-foreground text-2xl">
            Connect Your Wallet
          </Text>
          <Text className="font-sans dark:text-muted-dark text-muted text-lg">
            Securely connect your crypto wallet to start buying, bidding, or
            listing properties.
          </Text>
        </View>
        <View testID="wallet-button">
          <Button
            size="md"
            fontSize="lg"
            onPress={()=>{
                router.navigate("/business-details")
            }}
            variant="secondary"
            icon={{ name: "wallet", color: "white" }}
          >
            Connect Wallet
          </Button>
        </View>
      </View>
    </View>
  );
}
