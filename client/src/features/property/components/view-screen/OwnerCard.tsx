import { View, Text, Image } from "react-native";
import React from "react";
import IconButton from "@components/buttons/IconButton";
import { TProperty } from "@feature/property/types";

type Props = {
  owner: TProperty["owner"] | undefined;
};

const OwnerCard = ({owner}: Props) => {
  return (
    <View
      className="flex-row justify-between items-center"
      testID="owner-profile"
    >
      <View className="flex-row gap-3">
        <Image
          className="size-14 rounded-full"
          src={owner?.avatar}
        />
        <View className="flex-col gap-0">
          <Text className="font-medium text-foreground dark:text-foreground-dark">
            {owner?.name}
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
