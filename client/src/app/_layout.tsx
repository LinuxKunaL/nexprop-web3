import { AppProviders } from "@providers/index";
import ThemeToggleButton from "@ui/ThemeToggleButton";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AppProviders>
        <Stack screenOptions={{ headerShown: false }} />
        <ThemeToggleButton />
      </AppProviders>
    </SafeAreaProvider>
  );
}
