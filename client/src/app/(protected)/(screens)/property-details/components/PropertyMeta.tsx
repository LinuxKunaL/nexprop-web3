import { View, Text, ScrollView, FlatList } from "react-native";
import React, { Fragment } from "react";
import splitCamelCase from "@utils/splitCamelCase";
import TouchableText from "@ui/TouchableText";
import { clsx } from "clsx";

type Props = {};

const PropertyMeta = (props: Props) => {
  const details = {
    contractAddress: "0x1984...c38f",
    tokenID: "12",
    chain: "Ethereum",
    lastUpdated: "2 Week ago",
    platformEarnings: "2%",
  };

  const activity = [
    {
      event: "Create",
      price: 0.4,
      from: "0x0B11...1e5",
      to: "0x0B11...1e5",
      time: "2-12-10",
    },
    {
      event: "Buy",
      price: 0.4,
      from: "0x0B11...1e5",
      to: "0x0B11...1e5",
      time: "2-12-10",
    },
    {
      event: "Sell",
      price: 0.4,
      from: "0x0B11...1e5",
      to: "0x0B11...1e5",
      time: "2-12-10",
    },
    {
      event: "mint",
      price: 0.4,
      from: "0x0B11...1e5",
      to: "0x0B11...1e5",
      time: "2-12-10",
    },
  ];

  return (
    <Fragment>
      <View className="gap-2" testID="description">
        <Text className="font-medium text-foreground dark:text-foreground-dark text-lg">
          Description
        </Text>
        <Text className="font-sans text-muted dark:text-muted-dark text-base text-justify">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry&apos;s standard dummy text
          ever since the
        </Text>
      </View>
      <View className="gap-2" testID="details">
        <Text className="font-medium text-foreground dark:text-foreground-dark text-lg">
          Details
        </Text>
        <View className="gap-3">
          {Object.entries(details).map((item, idx) => (
            <View
              key={idx}
              className="p-3 dark:bg-card-dark bg-card rounded-xl flex-row justify-between"
            >
              <Text className="text-foreground dark:text-foreground-dark font-medium capitalize">
                {splitCamelCase(item[0])}:
              </Text>
              <TouchableText
                className={clsx(
                  "underline font-medium",
                  idx >= 2 ? "dark:text-muted-dark text-muted" : "text-primary",
                )}
              >
                {item[1]}
              </TouchableText>
            </View>
          ))}
        </View>
      </View>
      <View className="gap-2" testID="item-activity">
        <Text className="font-medium text-foreground dark:text-foreground-dark text-lg">
          Item Activity
        </Text>
        <ScrollView horizontal className="overflow-hidden rounded-xl">
          <View className="overflow-hidden rounded-xl">
            <View className="flex-row dark:bg-muted-dark/10 bg-muted/10 p-3">
              <Text className="w-24 font-medium dark:text-foreground-dark text-foreground">
                Event
              </Text>
              <Text className="w-24 font-medium dark:text-foreground-dark text-foreground">
                Price
              </Text>
              <Text className="w-32 font-medium dark:text-foreground-dark text-foreground">
                From
              </Text>
              <Text className="w-32 font-medium dark:text-foreground-dark text-foreground">
                To
              </Text>
              <Text className="w-20 font-medium dark:text-foreground-dark text-foreground">
                Time
              </Text>
            </View>
            <FlatList
              data={activity}
              renderItem={({ item }) => (
                <View className="flex-row p-3 border-b-[0.5px] border-muted/10 dark:border-muted-dark/10 bg-card dark:bg-card-dark">
                  <Text className="w-24 font-medium dark:text-muted-dark text-muted">
                    {item.event}
                  </Text>
                  <Text className="w-24 dark:text-muted-dark text-muted font-medium">
                    {item.price} ETH
                  </Text>
                  <Text className="w-32 text-primary underline font-medium">
                    {item.from}
                  </Text>
                  <Text className="w-32 font-medium text-primary underline">
                    {item.to}
                  </Text>
                  <Text className="w-20 font-medium dark:text-muted-dark text-muted">
                    {item.time}
                  </Text>
                </View>
              )}
            />
          </View>
        </ScrollView>
      </View>
    </Fragment>
  );
};

export default PropertyMeta;
