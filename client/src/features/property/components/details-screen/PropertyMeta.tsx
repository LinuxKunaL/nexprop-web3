import { clsx } from "clsx";
import React, { Fragment, useContext } from "react";
import shortAddress from "@utils/shortAddress";
import splitCamelCase from "@utils/splitCamelCase";
import { View, Text, ScrollView, FlatList } from "react-native";
import TouchableText from "@components/buttons/TouchableText";
import { PropertyDetailsContext } from "@feature/property/details-context";

const PropertyMeta = () => {
  const { property } = useContext(PropertyDetailsContext);
  return (
    <Fragment>
      <View className="gap-2" testID="description">
        <Text className="font-medium text-foreground dark:text-foreground-dark text-lg">
          Description
        </Text>
        <Text className="font-sans text-muted dark:text-muted-dark text-base text-justify">
          {property?.description}
        </Text>
      </View>
      <View className="gap-2" testID="details">
        <Text className="font-medium text-foreground dark:text-foreground-dark text-lg">
          Details
        </Text>
        <View className="gap-3">
          {Object.entries(property?.metadetails || []).map((item, idx) => (
            <View
              key={idx}
              className="p-3 dark:bg-card-dark bg-card rounded-xl flex-row justify-between"
            >
              <Text className="text-foreground dark:text-foreground-dark font-medium capitalize">
                {splitCamelCase(item[0])}:
              </Text>
              <TouchableText
                textClassName={clsx(
                  "underline font-medium",
                  idx >= 2 ? "dark:text-muted-dark text-muted" : "text-primary",
                )}
              >
                {idx === 0 ? shortAddress(item[1]) : item[1]}
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
              <Text className="w-32 font-medium dark:text-foreground-dark text-foreground">
                Time
              </Text>
            </View>
            <FlatList
              data={property?.itemActivity}
              renderItem={({ item }) => (
                <View className="flex-row p-3 border-b-[0.5px] border-muted/10 dark:border-muted-dark/10 bg-card dark:bg-card-dark">
                  <Text className="w-24 font-medium dark:text-muted-dark text-muted">
                    {item.event}
                  </Text>
                  <Text className="w-24 dark:text-muted-dark text-muted font-medium">
                    {item.price}
                  </Text>
                  <Text className="w-32 text-primary underline font-medium">
                    {shortAddress(item.from)}
                  </Text>
                  <Text className="w-32 font-medium text-primary underline">
                    {shortAddress(item.to)}
                  </Text>
                  <Text className="w-32 font-medium dark:text-muted-dark text-muted">
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
