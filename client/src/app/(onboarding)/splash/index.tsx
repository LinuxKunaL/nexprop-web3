import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { Text, View } from "react-native";

import SplashLogo from "@assets/images/splash-logo.svg";


export default function Splash() {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push("/(onboarding)/welcome");
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <View className="bg-primary h-screen">
      <View className="flex-1 justify-center items-center">
        <SplashLogo />
        <Text className="text- text-3xl font-semibold text-white mt-4">
          NexProp
        </Text>
      </View>
    </View>
  );
}
