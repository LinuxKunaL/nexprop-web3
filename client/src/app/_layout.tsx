import { Stack } from "expo-router";
import { AppProviders } from "@providers/index";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView className="flex-1">
        <AppProviders>
          <Stack screenOptions={{ headerShown: false, animation: "none" }} />
        </AppProviders>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
