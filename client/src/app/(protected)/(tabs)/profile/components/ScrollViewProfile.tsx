import { View, ScrollView } from "react-native";
import React, { useContext } from "react";
import { ProfileContext } from "../context";

type Props = {
  children: React.ReactNode[] | React.ReactNode;
};

const ScrollViewProfile = ({ children }: Props) => {
  const {handleOnScroll} = useContext(ProfileContext)
  return (
    <ScrollView onScroll={handleOnScroll} showsVerticalScrollIndicator={false}>
      <View
        className="dark:bg-background-dark bg-background flex-1 gap-5 pb-10"
        testID="screen"
      >
        {children}
      </View>
    </ScrollView>
  );
};

export default ScrollViewProfile;
