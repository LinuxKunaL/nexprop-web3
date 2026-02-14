import { View, Text, ScrollView, Switch } from "react-native";
import React, { useState } from "react";
import IconButton from "@ui/IconButton";
import TouchableText from "@ui/TouchableText";
import clsx from "clsx";
import Input from "@ui/Input";
import { TextInput } from "react-native-gesture-handler";
import Icon from "@ui/Icon";
import Button from "@ui/Button";

type Props = {};

const AddProperty = (props: Props) => {
  const [currentTab, setCurrentTab] = useState("Media");
  const [saleType, setSaleType] = useState("direct");

  const TABS = ["Overview", "Location", "Media", "Document"];
  return (
    <View className="dark:bg-background-dark bg-background flex-1 pt-4">
      <View className="gap-7 flex-1" testID="screen">
        <View className="flex-row justify-between px-4" testID="header">
          <IconButton name="arrow-left" iconSize={24} variant="theme" />
          <Text className="font-medium text-xl dark:text-foreground-dark text-foreground">
            Add Property
          </Text>
          <View className="size-[24px]" />
        </View>
        <View
          className="w-full border-b-2 px-4 border-border dark:border-border-dark flex-row items-center"
          testID="tab-details"
        >
          {TABS.map((item) => (
            <TouchableText
              key={item}
              textClassName={clsx(
                "text-center font-semibold text-base",
                currentTab === item
                  ? "dark:text-foreground-dark text-foreground"
                  : "dark:text-muted-dark text-muted/60",
              )}
              onPress={() => {
                setCurrentTab(item);
              }}
              className={clsx(
                "flex-1 pb-2 border-b-2",
                item === currentTab ? "border-primary" : "border-transparent",
              )}
            >
              {item}
            </TouchableText>
          ))}
        </View>
        <View className="flex-1 mb-6 px-4">
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
          <Button variant="solid" size="md" fontSize="md">
            Add Propriety
          </Button>
        </View>
      </View>
    </View>
  );
};

export default AddProperty;
