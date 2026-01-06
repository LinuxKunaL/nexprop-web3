import { View, Text } from "react-native";
import BuildHouse from "@assets/images/login-house-build.svg";
import TouchableText from "@ui/TouchableText";
import Button from "@ui/Button";

export default function Login() {
  return (
    <View
      className="flex-1 dark:bg-background-dark bg-background"
      testID="screen"
    >
      <View className="" testID="building-image">
        <BuildHouse />
      </View>
      <View testID="container" className="mt-3 gap-4">
        <View testID="container-test" className="gap-4">
          <Text className="font-semibold dark:text-foreground-dark text-foreground text-3xl">
            Login Here
          </Text>
          <Text className="font-sans dark:text-muted-dark text-muted text-lg">
            Securely buy, sell, or bid on verified properties using
            blockchain-powered escrow
          </Text>
        </View>
        <View testID="google-button">
          <Button
            variant="solid"
            fontSize="lg"
            size="md"
            icon={{ name: "google", color: "white" }}
          >
            Continue With Google
          </Button>
        </View>
        <View className="flex-row" testID="term-conditions">
          <Text className="font-sans dark:text-muted-dark text-muted text-lg">
            Read term and conditions{" "}
          </Text>
          <TouchableText className="font-sans text-primary text-lg">
            read here
          </TouchableText>
        </View>
      </View>
    </View>
  );
}
