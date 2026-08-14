import { clsx } from "clsx";
import React, { useContext, useState } from "react";
import Input from "@components/inputs/Input";
import Icon from "@components/display/Icon";
import { View, Text } from "react-native";
import TouchableText from "@components/buttons/TouchableText";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { PropertyFormContext } from "@features/property/form-context";
import InputController from "@components/inputs/InputController";
import DropdownController from "@components/inputs/DropdownController";
import {
  AUCTION_DURATION,
  PROPERTY_CATEGORIES,
  PROPERTY_TYPES,
} from "@data/propertyDropdown";
import { useWatch } from "react-hook-form";
import Switch from "@components/inputs/Switch";
import { EListingType } from "@types_/enum";

const Overview = () => {
  const [listingType, setListingType] = useState<EListingType>(
    EListingType.Direct,
  );
  const { control } = useContext(PropertyFormContext);

  var va: any = [];

  // console.log(va);

  const category = useWatch({
    control,
    name: "category",
  });

  return (
    <View className="flex-1">
      <KeyboardAwareScrollView
        bottomOffset={10}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-col gap-4 flex-1 h-full mb-5">
          <InputController
            isRequired={true}
            control={control}
            name="title"
            placeholder="Property Title"
          />
          <DropdownController
            isRequired
            data={PROPERTY_CATEGORIES}
            control={control}
            name="category"
            placeholder="select category"
          />
          <DropdownController
            isRequired
            data={PROPERTY_TYPES[category] || []}
            disable={!category}
            control={control}
            name="type"
            placeholder="select type"
          />
          <InputController
            multiline
            isRequired
            control={control}
            name="description"
            placeholder="Description"
            numberOfLines={6}
            className="h-28"
            textAlignVertical="top"
          />
          <View className="flex-row justify-between my-2 ml-2">
            <Text className="dark:text-muted-dark text-lg text-muted font-medium">
              Property Status
              <Icon name="information-variant-circle" />
            </Text>
            <Switch control={control} name="propertyStatus" />
          </View>
          <View className="p-2 border border-transparent dark:border-border-dark/30 dark:bg-card-dark bg-card rounded-lg flex-row">
            <TouchableText
              onPress={() => setListingType(EListingType.Direct)}
              textClassName={clsx(
                "text-center font-semibold",
                listingType === EListingType.Direct
                  ? "text-foreground-dark"
                  : "dark:text-foreground-dark text-foreground",
              )}
              className={clsx(
                "flex-1 py-2 rounded-md",
                listingType === EListingType.Direct && "bg-primary",
              )}
            >
              Direct Sale
            </TouchableText>
            <TouchableText
              onPress={() => setListingType(EListingType.Auction)}
              textClassName={clsx(
                "text-center font-semibold",
                listingType === EListingType.Auction
                  ? "text-foreground-dark"
                  : "dark:text-foreground-dark text-foreground",
              )}
              className={clsx(
                "flex-1 py-2 rounded-md",
                listingType === EListingType.Auction
                  ? "bg-primary text-foreground-dark"
                  : "bg-transparent",
              )}
            >
              Auction
            </TouchableText>
          </View>
          {listingType == EListingType.Direct && (
            <InputController
              isRequired
              name="fiatPrice"
              control={control}
              type="number"
              keyboardType="numeric"
              placeholder="Price in fiat, ex ₹ or $"
            />
          )}
          {listingType == EListingType.Auction && (
            <View className="flex-col gap-4">
              <InputController
                isRequired
                type="number"
                name="startingBidfiatPrice"
                keyboardType="numeric"
                control={control}
                placeholder="Starting Bid Price in fiat, ex ₹ or $"
              />
              <DropdownController
                type="number"
                isRequired
                data={AUCTION_DURATION}
                control={control}
                dropdownPosition="top"
                name="auctionDuration"
                placeholder="select type"
              />
            </View>
          )}
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default Overview;
