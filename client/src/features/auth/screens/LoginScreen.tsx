import { View, Text } from "react-native";
import HouseBuild from "@assets/images/svgs/house-build";
import TouchableText from "@components/buttons/TouchableText";
import Button from "@components/buttons/Button";
import { useRouter } from "expo-router";

export default function LoginScreen() {
  const router = useRouter();
  return (
    <View
      className="flex-1 dark:bg-background-dark bg-background"
      testID="screen"
    >
      <View testID="building-image">
        <HouseBuild />
      </View>
      <View testID="container" className="mt-3 gap-4 flex-1">
        <View testID="container-test" className="gap-4">
          <Text className="font-semibold dark:text-foreground-dark text-foreground text-2xl">
            Login Here
          </Text>
          <Text className="font-sans dark:text-muted-dark text-muted text-lg">
            Securely buy, sell, or bid on verified properties using
            blockchain-powered escrow
          </Text>
        </View>
        <View testID="google-button">
          <Button
            size="md"
            fontSize="lg"
            variant="solid"
            onPress={() => {
              router.navigate("/connect-wallet");
            }}
            icon={{ name: "google", color: "white" }}
          >
            Continue With Google
          </Button>
        </View>
        <View className="flex-row" testID="term-conditions">
          <Text className="font-sans dark:text-muted-dark text-muted text-lg">
            Read term and conditions{" "}
          </Text>
          <TouchableText textClassName="font-sans text-primary text-lg">
            read here
          </TouchableText>
        </View>
      </View>
    </View>
  );
}
