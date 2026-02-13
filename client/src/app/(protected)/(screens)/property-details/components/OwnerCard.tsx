import { View, Text, Image } from "react-native";
import React from "react";
import IconButton from "@ui/IconButton";

type Props = {};

const OwnerCard = (props: Props) => {
  return (
    <View
      className="flex-row justify-between items-center"
      testID="owner-profile"
    >
      <View className="flex-row gap-3">
        <Image
          className="size-14 rounded-full"
          src="https://cdn.pfpfinder.com/uploads/Link-Click-1705112947006.jpg"
        />
        <View className="flex-col gap-0">
          <Text className="font-medium text-foreground dark:text-foreground-dark">
            Kunal lokhande
          </Text>
          <Text className="font-sans capitalize text-muted dark:text-muted-dark">
            Owner
          </Text>
        </View>
      </View>
      <IconButton
        name="storefront-outline"
        variant="primary"
        color="white"
        size="md"
        iconSize={21}
      />
    </View>
  );
};

export default OwnerCard;
