import { View, Text } from "react-native";
import React from "react";
import Button from "@ui/Button";

type Props = {};

const Action = (props: Props) => {
  return (
    <View className="px-4 gap-5" testID="action">
      <View className="justify-between flex-row items-center" testID="title">
        <Text className="text-foreground dark:text-foreground-dark text-lg font-medium">
          Action
        </Text>
      </View>
      <View className="flex-col gap-4" testID="button-list">
        <Button
          size="lg"
          className="bg-[#EA4335]/20"
          fontSize="md"
          textColor="#EA4335"
          variant="transparent"
          icon={{ name: "logout", color: "#EA4335", size: 20 }}
        >
          Logout
        </Button>
        <Button
          size="lg"
          className="bg-[#EA4335]/20"
          fontSize="md"
          textColor="#EA4335"
          variant="transparent"
          icon={{ name: "link-off", color: "#EA4335", size: 20 }}
        >
          Disconnect Wallet{" "}
        </Button>
      </View>
    </View>
  );
};

export default Action;
