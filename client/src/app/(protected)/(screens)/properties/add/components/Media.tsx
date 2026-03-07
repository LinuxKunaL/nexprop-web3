import { View, ScrollView, Text } from "react-native";
import React from "react";
import Icon from "@ui/Icon";

type Props = {};

const Media = (props: Props) => {
  return (
    <View className="flex-1 h-full w-full">
      <ScrollView scrollEnabled showsVerticalScrollIndicator={false}>
        <View className="gap-4" testID="images-preview">
          <View
            className="bg-card dark:bg-card-dark gap-2 h-80 rounded-lg justify-center items-center border-2 border-border border-dashed dark:border-border-dark/30"
            testID="main-image"
          >
            <Icon name="image-plus-outline" size={30} isThemed />
            <Text className="font-sans dark:text-muted-dark text-muted">
              Upload Your Thumbnail
            </Text>
          </View>
          <View className="flex-row h-40 gap-4">
            <View className="bg-card dark:bg-card-dark flex-auto rounded-lg justify-center items-center border-2 border-border border-dashed dark:border-border-dark/30">
              <Icon name="image-plus-outline" size={30} isThemed />
            </View>
            <View className="bg-card dark:bg-card-dark flex-auto rounded-lg justify-center items-center border-2 border-border border-dashed dark:border-border-dark/30">
              <Icon name="image-plus-outline" size={30} isThemed />
            </View>
          </View>
          <View className="flex-row h-40  gap-4">
            <View className="bg-card dark:bg-card-dark flex-auto rounded-lg justify-center items-center border-2 border-border border-dashed dark:border-border-dark/30">
              <Icon name="image-plus-outline" size={30} isThemed />
            </View>
            <View className="bg-card dark:bg-card-dark flex-auto rounded-lg justify-center items-center border-2 border-border border-dashed dark:border-border-dark/30">
              <Icon name="image-plus-outline" size={30} isThemed />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Media;
