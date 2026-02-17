import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import TouchableText from "@ui/TouchableText";
import { clsx } from "clsx";
import Input from "@ui/Input";
import Icon from "@ui/Icon";

type Props = {};

const Overview = (props: Props) => {
  const [saleType, setSaleType] = useState("direct");

  return (
    <View className="flex-1">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex-col gap-4 flex-1 h-full mb-5">
          <Input placeholder="Property Title" />
          <Input placeholder="Category" />
          <Input placeholder="Type" />
          <Input
            placeholder="Description"
            multiline
            numberOfLines={6}
            className="h-28"
            textAlignVertical="top"
          />
          <View className="flex-row justify-between">
            <Text className="dark:text-muted-dark text-lg text-muted font-medium">
              Visible
            <Icon name="information-variant-circle"/>
            </Text>
          </View>
          <View className="p-2 border border-transparent dark:border-border-dark/30 dark:bg-card-dark bg-card rounded-lg flex-row">
            <TouchableText
              onPress={() => setSaleType("direct")}
              textClassName={clsx(
                "text-center font-semibold",
                saleType === "direct"
                  ? "text-foreground-dark"
                  : "dark:text-foreground-dark text-foreground",
              )}
              className={clsx(
                "flex-1 py-2 rounded-md",
                saleType === "direct" && "bg-primary",
              )}
            >
              Direct Sale
            </TouchableText>
            <TouchableText
              onPress={() => setSaleType("auction")}
              textClassName={clsx(
                "text-center font-semibold",
                saleType === "auction"
                  ? "text-foreground-dark"
                  : "dark:text-foreground-dark text-foreground",
              )}
              className={clsx(
                "flex-1 py-2 rounded-md",
                saleType === "auction"
                  ? "bg-primary text-foreground-dark"
                  : "bg-transparent",
              )}
            >
              Auction
            </TouchableText>
          </View>
          <View className="flex-col gap-4">
            <Input placeholder="ETH Price" />
          </View>
          <View className="flex-col gap-4">
            <Input placeholder="Starting Bid Price" />
            <Input placeholder="Start Date & Time" />
            <Input placeholder="End Date & Time" />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Overview;
