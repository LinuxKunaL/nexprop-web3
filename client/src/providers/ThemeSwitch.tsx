import { View, Text, Pressable } from "react-native";
import React, { Fragment } from "react";
import { colorScheme } from "nativewind";
import Button from "@ui/Button";

export default function ThemeSwitch({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentTheme = colorScheme.get();

  return (
    <Fragment>
      {children}
      {/* <View className="db-g w-10 h-10 rounded-full"> */}
        <Button
          onPress={() => {
            colorScheme.set(currentTheme === "dark" ? "light" : "dark");
          }}
          variant="ghost"
          size="sm"
          fontSize="md"
          className="m-4"
        >
          {currentTheme === "dark" ? "Dark" : "Light"}
        </Button>
      {/* </View> */}
    </Fragment>
  );
}
