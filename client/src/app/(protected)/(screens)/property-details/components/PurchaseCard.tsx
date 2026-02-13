import { View, Text } from "react-native";
import React from "react";
import Icon from "@ui/Icon";
import { colors } from "@constants/theme";
import Button from "@ui/Button";
import { useTheme } from "@providers/ThemeProvider";

type Props = {};

const PurchaseCard = (props: Props) => {
  const { theme } = useTheme();

  return (
    <View
      className="p-5 dark:bg-card-dark bg-card rounded-xl gap-4"
      testID="price-card"
    >
      <View className="flex-row gap-2">
        <Icon name="timer-outline" size={21} color={colors.primary} />
        <Text className="font-medium dark:text-foreground-dark text-foreground text-base">
          14d 2h 5m 38s
        </Text>
      </View>
      <View className="flex-row gap-2 items-baseline">
        <Text className="text-primary text-2xl font-medium">23.34 ETH</Text>
        <Text className="font-sans text-muted dark:text-muted-dark">
          ₹ 12,223,000
        </Text>
      </View>
      <Button
        variant={theme === "dark" ? "ghost" : "secondary"}
        size="md"
        fontSize="md"
      >
        Place a bid
      </Button>
    </View>
  );
};

export default PurchaseCard;
