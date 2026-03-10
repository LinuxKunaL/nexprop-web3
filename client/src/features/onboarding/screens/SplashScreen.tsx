import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { View } from "react-native";

import SplashLogo from "@assets/images/splash-logo.svg";
import Animated, { FadeIn } from "react-native-reanimated";
import { StatusBar } from "expo-status-bar";

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push("/welcome");
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <View className="bg-primary flex-1 h-full">
      <StatusBar style="light" />
      <View className="flex-1 justify-center items-center">
        <Animated.View entering={FadeIn.duration(800)}>
          <SplashLogo />
        </Animated.View>
        <Animated.Text
          entering={FadeIn.duration(800)}
          className="font-semibold text-white mt-4 text-3xl"
        >
          NexProp
        </Animated.Text>
      </View>
    </View>
  );
}
