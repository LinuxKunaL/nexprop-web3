import { View, Text } from "react-native";
import React from "react";
import Input from "@ui/Input";
import Button from "@ui/Button";
import { useRouter } from "expo-router";

export default function BusinessDetails() {
  const router = useRouter()
  return (
    <View
      className="flex-1 dark:bg-background-dark bg-background"
      testID="screen"
    >
      <View testID="title" className="gap-4 flex flex-col">
        <Text className="font-semibold dark:text-foreground-dark text-foreground text-2xl">
          Business Details
        </Text>
        <Text className="font-sans dark:text-muted-dark text-muted text-lg">
          Securely buy, sell, or bid on verified properties using
          blockchain-powered escrow
        </Text>
      </View>
      <View className="mt-4 gap-5" testID="form-container">
        <View className="gap-4" testID="form-input">
          <Text className="font-medium dark:text-foreground-dark text-foreground">
            Business name
          </Text>
          <Input placeholder="Enter business name" />
        </View>
        <View className="gap-4" testID="form-input">
          <Text className="font-medium dark:text-foreground-dark text-foreground">
            Business Type
          </Text>
          <Input placeholder="Enter business Type" />
        </View>
        <View className="gap-4" testID="form-input">
          <Text className="font-medium dark:text-foreground-dark text-foreground">
            Business address
          </Text>
          <Input placeholder="Enter business address" />
        </View>
        <View className="gap-4" testID="form-input">
          <Text className="font-medium dark:text-foreground-dark text-foreground">
            Your name
          </Text>
          <Input placeholder="Enter your name" />
        </View>
        <View className="gap-4" testID="form-input">
          <Text className="font-medium dark:text-foreground-dark text-foreground">
            Contact
          </Text>
          <Input placeholder="Enter your contact" />
        </View>
        <Button className="mt-2" variant="solid" fontSize="md" size="md" onPress={()=>{
          router.navigate("/(protected)/(tabs)/home")
        }}>
          Submit
        </Button>
      </View>
    </View>
  );
}
