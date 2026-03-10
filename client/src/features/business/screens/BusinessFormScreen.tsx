import clsx from "clsx";
import React from "react";
import Input from "@components/inputs/Input";
import Button from "@components/buttons/Button";
import { View, Text } from "react-native";
import ScreenHeader from "@components/layout/ScreenHeader";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

export default function BusinessFormScreen() {
  const { id } = useLocalSearchParams();
  const { top } = useSafeAreaInsets();
  const isEdit = id ? true : false;

  const router = useRouter();
  return (
    <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      className={clsx(
        "flex-1 dark:bg-background-dark bg-background",
        isEdit && "px-4",
      )}
      style={isEdit && { paddingTop: top }}
      testID="screen"
    >
      {!isEdit && (
        <View testID="title" className="gap-4 flex flex-col">
          <Text className="font-semibold dark:text-foreground-dark text-foreground text-2xl">
            Business Details
          </Text>
          <Text className="font-sans dark:text-muted-dark text-muted text-lg">
            Securely buy, sell, or bid on verified properties using
            blockchain-powered escrow
          </Text>
        </View>
      )}
      {isEdit && <ScreenHeader title="Edit Business" backButtonVisble />}
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
        <Button
          className="mt-2"
          variant="solid"
          fontSize="md"
          size="md"
          onPress={() => {
            router.navigate("/(protected)/(tabs)/home");
          }}
        >
          Submit
        </Button>
      </View>
    </KeyboardAwareScrollView>
  );
}
