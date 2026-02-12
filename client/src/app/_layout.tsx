// import { BottomSheetProvider } from "@gorhom/bottom-sheet/lib/typescript/contexts";
import { AppProviders } from "@providers/index";
import ThemeToggleButton from "@ui/ThemeToggleButton";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView className="flex-1">
        <AppProviders>
          <Stack screenOptions={{ headerShown: false }} />
          <ThemeToggleButton />
        </AppProviders>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
