import { View, Text } from "react-native";
import React from "react";
import TouchableText from "@ui/TouchableText";
import { useRouter } from "expo-router";

type Props = {};

const Escrow = (props: Props) => {
  const router = useRouter();

  const handleViewAll = () => {
    router.navigate("/escrow/list");
  };
  return (
    <View className="px-4 gap-5" testID="escrow">
      <View className="justify-between flex-row items-center" testID="title">
        <Text className="text-foreground dark:text-foreground-dark text-lg font-medium">
          Current Escrow
        </Text>
        <TouchableText
          onPress={handleViewAll}
          textClassName="text-primary font-sans underline"
        >
          View All
        </TouchableText>
      </View>
      <View className="p-3 gap-2 border-2 rounded-lg border-border/50 dark:border-border-dark/50">
        <View className="flex-row justify-between">
          <Text className="text-muted dark:text-muted-dark font-medium">
            Escrow ID :
          </Text>
          <Text className="text-primary font-medium underline">ESC-8891</Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="text-muted dark:text-muted-dark font-medium">
            Locked Amount :
          </Text>
          <Text className="text-foreground dark:text-foreground-dark font-medium underline">
            20 ETH
          </Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="text-muted dark:text-muted-dark font-medium">
            Verification Time :
          </Text>
          <Text className="text-foreground dark:text-foreground-dark font-medium underline">
            72 Hours
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Escrow;
