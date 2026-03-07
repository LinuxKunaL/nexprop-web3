import { View, Text } from "react-native";
import React from "react";
import Icon from "@ui/Icon";
import { colors } from "@constants/theme";

type Props = {};

const Document = (props: Props) => {
  return (
    <View className="flex-1 h-full w-full gap-4">
      <View
        className="flex-row w-full items-center justify-between"
        testID="header"
      >
        <Text className="font-medium dark:text-foreground-dark text-foreground text-xl">
          Add Documents
        </Text>
        <View className="flex-row gap-1 items-center">
          <Icon name="plus-circle-outline" size={21} color={colors.primary} />
          <Text className="font-medium dark:text-foreground-dark text-foreground text-base">
            Add More Files
          </Text>
        </View>
      </View>
      <View className="gap-4" testID="file-upload-screen">
        <View className="bg-card dark:bg-card-dark gap-2 h-24 rounded-lg justify-between flex-row p-4 items-center border-2 border-border border-dashed dark:border-border-dark/30">
          <View className="flex-row gap-2 items-center">
            <Icon name="file-plus-outline" size={24} isThemed />
            <View>
              <Text className="font-medium dark:text-foreground-dark text-foreground text-base">
                Click to upload your files
              </Text>
              <Text className="font-sans dark:text-muted-dark text-muted">
                only .pdf accepted
              </Text>
            </View>
          </View>
          <Icon name="close-circle-outline" isThemed />
        </View>
      </View>
    </View>
  );
};

export default Document;
