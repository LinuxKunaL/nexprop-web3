import React from "react";

import { useRouter } from "expo-router";
import IconButton from "@components/buttons/IconButton";

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
