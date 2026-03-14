import { View, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ScreenHeader from "@components/layout/ScreenHeader";
import Icon from "@components/display/Icon";
import { Pressable } from "react-native";
import Input from "@components/inputs/Input";
import Button from "@components/buttons/Button";

const EditAccount = () => {
  return (
    <SafeAreaView
      edges={["top", "left", "right"]}
      className="dark:bg-background-dark bg-background flex-1 px-4"
      testID="screen"
    >
      <ScreenHeader title="Edit Account" backButtonVisble />
      <View className="gap-2 justify-center items-center">
        <Pressable>
          <Image
            className="size-28 rounded-full"
            src="https://cdn.pfpfinder.com/uploads/Link-Click-1705112947006.jpg"
          />
          <Icon
            name="pen"
            size={21}
            color="white"
            className="bg-primary border-[3px] dark:border-background-dark border-background p-1 rounded-full absolute bottom-0 right-0"
          />
        </Pressable>
      </View>
      <View className="mt-5 gap-5">
        <Input placeholder="Enter your name" />
        <Input placeholder="Enter your gmail" />
        <Input placeholder="Enter your phone number" />
        <Button variant="solid" fontSize="md" size="md">
          Submit
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default EditAccount;
