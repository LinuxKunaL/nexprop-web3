import {
  View,
  Text,
  Pressable,
  TouchableHighlight,
  ActivityIndicator,
} from "react-native";
import React, { useCallback } from "react";
import clsx from "clsx";
import { TEscrow } from "@types_/escrow";
import { useRouter } from "expo-router";
import { colors } from "@constants/theme";

type Props = {
  item: TEscrow;
};

const EscrowCard = ({ item }: Props) => {
  const router = useRouter();

  const statusTextStyle = (status: (typeof item)["status"]) => {
    if (status === "pending") return "text-yellow-500";
    else if (status === "cancel") return "text-red-500";
    else return "text-green-500";
  };

  const handleOpenEscrow = useCallback(() => {
    router.navigate(`/escrow/${item.id}`);
  }, [item.id]);

  return (
    <Pressable
      onPress={handleOpenEscrow}
      className="p-3 gap-2 rounded-lg bg-card dark:bg-card-dark"
    >
      <ActivityIndicator color={colors.primary} />
      <View className="flex-row justify-between">
        <Text className="text-muted dark:text-muted-dark font-medium">
          Escrow ID :
        </Text>
        <Text className="text-primary font-medium underline">{item.id}</Text>
      </View>
      <View className="flex-row justify-between">
        <Text className="text-muted dark:text-muted-dark font-medium">
          Locked Amount :
        </Text>
        <Text className="text-foreground dark:text-foreground-dark font-medium underline">
          {item.lockedAmount}
        </Text>
      </View>
      <View className="flex-row justify-between">
        <Text className="text-muted dark:text-muted-dark font-medium">
          Verification Time :
        </Text>
        <Text className="text-foreground dark:text-foreground-dark font-medium underline">
          {item.verificationTime}
        </Text>
      </View>
      <View className="flex-row justify-between">
        <Text className="text-muted dark:text-muted-dark font-medium">
          Status :
        </Text>
        <Text
          className={clsx(
            "font-medium underline",
            statusTextStyle(item.status),
          )}
        >
          {item.status}
        </Text>
      </View>
    </Pressable>
  );
};

export default EscrowCard;
