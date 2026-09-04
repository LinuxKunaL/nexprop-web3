import React, { useContext, useState } from "react";

import { clsx } from "clsx";
import { View, Text } from "react-native";
import TouchableText from "@components/buttons/TouchableText";

import Button from "@components/buttons/Button";

import { SafeAreaView } from "react-native-safe-area-context";

import Overview from "../components/form-screen/Overview";
import Location from "../components/form-screen/Location";
import Media from "../components/form-screen/Media";
import Document from "../components/form-screen/Documents";
import BackButton from "@components/navigation/BackButton";
import PropertyFormProvider, {
  PropertyFormContext,
  TCreateProperty,
  TTabs,
} from "../form-context";
import { useToast } from "@components/toast";
import { EListingType } from "@types_/enum";
import useProperty from "../hooks/use-property";

const AddPropertyScreen = () => {
  return (
    <PropertyFormProvider>
      <AddPropertyScreenContend />
    </PropertyFormProvider>
  );
};

const AddPropertyScreenContend = () => {
  const TABS = ["Overview", "Location", "Media", "Document"] as const;
  const [currentTab, setCurrentTab] = useState<TTabs>("Overview");
  const { uploadMetadata } = useProperty();
  const { handleSubmit, setErrorTabLevel } = useContext(PropertyFormContext);
  const toast = useToast();

  const onSubmit = async (params: TCreateProperty) => {
    try {
      tabLevelValidation(params);
      uploadMetadata(params);
    } catch (error) {
      if (error instanceof Error) {
        toast.warning(error.message);
        const cause = error.cause as TTabs;
        setErrorTabLevel({ tab: cause, trigger: true });
        setCurrentTab(cause);
      }
    }
  };

  const tabLevelValidation = (params: TCreateProperty) => {
    if (
      !(params.title &&
      params.category &&
      params.type &&
      params.description &&
      params.listingType == EListingType.Direct
        ? params.fiatPrice
        : params.auctionDuration && params.startingBidfiatPrice)
    ) {
      throw new Error("Overview details are missing.", {
        cause: "Overview",
      });
    }

    if (!(Object.values(params.address).filter((i) => i).length === 5)) {
      throw new Error("Location details are missing.", {
        cause: "Location",
      });
    }

    if (params.media.length !== 5) {
      throw new Error("Media details are missing.", {
        cause: "Media",
      });
    }

    if (!params.documents.every((item) => item?.name?.trim())) {
      throw new Error("Documents details are missing.", {
        cause: "Document",
      });
    }
  };

  return (
    <SafeAreaView
      className="dark:bg-background-dark bg-background flex-1 pt-4"
      testID="screen"
      edges={["top", "left", "right"]}
    >
      <View className="flex-1" testID="screen">
        <View className="flex-row justify-between px-4" testID="header">
          <BackButton />
          <Text className="font-medium text-xl dark:text-foreground-dark text-foreground">
            Add Property
          </Text>
          <View className="size-[24px]" />
        </View>
        <View
          className="w-full border-b-2 px-4 border-border dark:border-border-dark flex-row items-center mt-7"
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
        <View className="mt-7 mb-3 px-4 flex-1" testID="rendered-tab-screens">
          {currentTab === "Overview" && <Overview />}
          {currentTab === "Location" && <Location />}
          {currentTab === "Media" && <Media />}
          {currentTab === "Document" && <Document />}
        </View>
        <View className="px-4 pb-6">
          <Button
            onPress={handleSubmit(onSubmit, (e) => {
              console.log("error in form");
            })}
            variant="solid"
            size="md"
            fontSize="md"
          >
            Add Propriety
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AddPropertyScreen;
