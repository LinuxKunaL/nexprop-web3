import React from "react";
import IconButton from "./IconButton";
import { useRouter } from "expo-router";

const BackButton = () => {
  const router = useRouter();
  return (
    <IconButton
      name="arrow-left"
      onPress={() => {
        router.back();
      }}
      iconSize={24}
      variant="theme"
    />
  );
};

export default BackButton;
