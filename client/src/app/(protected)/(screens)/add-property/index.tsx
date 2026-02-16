import { clsx } from "clsx";
import React, { useState } from "react";
import IconButton from "@ui/IconButton";
import { View, Text } from "react-native";
import TouchableText from "@ui/TouchableText";
import Overview from "./components/Overview";
import Location from "./components/Location";

type Props = {};

const AddProperty = (props: Props) => {
  const [currentTab, setCurrentTab] = useState("Media");

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
        {/* <Overview /> */}
        <Location />
      </View>
    </View>
  );
};

export default AddProperty;
