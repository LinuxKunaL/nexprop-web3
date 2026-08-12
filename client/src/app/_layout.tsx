import { useEffect } from "react";
import { Stack } from "expo-router";
import { AppProviders } from "@providers/index";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { InitWalletEvents } from "@wallet";

export default function RootLayout() {
  useEffect(() => {
    InitWalletEvents.getInstance().then();
  }, []);

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView className="flex-1">
        <AppProviders>
          <Stack screenOptions={{ headerShown: false, animation: "fade_from_bottom" }} />
        </AppProviders>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
