import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { View } from "react-native";

import SplashLogo from "@assets/images/splash-logo.svg";
import Animated, { FadeIn } from "react-native-reanimated";

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
        <Animated.View entering={FadeIn.duration(800)}>
          <SplashLogo />
        </Animated.View>
        <Animated.Text
          entering={FadeIn.duration(800)}
          className="text- text-3xl font-semibold text-white mt-4"
        >
          NexProp
        </Animated.Text>
      </View>
    </View>
  );
}
