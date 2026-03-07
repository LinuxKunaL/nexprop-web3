import React from "react";
import Icon from "@ui/Icon";
import Button from "@ui/Button";
import { colors } from "@constants/theme";
import { View, Text } from "react-native";
import { TProperty } from "@types_/property";
import { useTheme } from "@providers/ThemeProvider";

type Props = {
  property: TProperty | undefined;
};

const PurchaseCard = ({ property }: Props) => {
  const { theme } = useTheme();
  const sellingType = property?.sellingType === "direct";
  
  return (
    <View
      className="p-5 dark:bg-card-dark bg-card rounded-xl gap-4"
      testID="price-card"
    >
      <View className="flex-row gap-2">
        {sellingType ? (
          <Text className="font-medium dark:text-foreground-dark text-foreground text-base">
            Current price
          </Text>
        ) : (
          <>
            <Icon name="timer-outline" size={21} color={colors.primary} />
            <Text className="font-medium dark:text-foreground-dark text-foreground text-base">
              {property?.bidDetails.time}
            </Text>
          </>
        )}
      </View>
      <View className="flex-row gap-2 items-baseline">
        <Text className="text-primary text-2xl font-medium">
          {property?.price}
        </Text>
        <Text className="font-sans text-muted dark:text-muted-dark">
          ₹ 12,223,000
        </Text>
      </View>
      <Button
        size="md"
        fontSize="md"
        variant={theme === "dark" ? "ghost" : "secondary"}
        icon={{
          name: sellingType ? "arrow-top-right" : "gavel",
          color: colors.primary,
        }}
      >
        {sellingType ? "Buy" : "Place a bid"}
      </Button>
    </View>
  );
};

export default PurchaseCard;
