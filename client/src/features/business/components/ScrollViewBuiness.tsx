import { View, ScrollView } from "react-native";
import React, { useContext } from "react";
import { BuinessContext } from "../context";

type Props = {
  children: React.ReactNode[] | React.ReactNode;
};

const ScrollViewBuiness = ({ children }: Props) => {
  const { handleOnScroll } = useContext(BuinessContext);
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

export default ScrollViewBuiness;
