import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "@providers/ThemeProvider";
import IconButton from "./IconButton";

export default function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        position: "absolute",
        top: insets.top + 10,
        right: 16,
        zIndex: 9999,
      }}
    >
      <IconButton
        onPress={toggleTheme}
        variant="primary"
        iconSize={19}
        name={theme == "dark" ? "white-balance-sunny" : "moon-waning-crescent"}
        size="sm"
        color="white"
      />
    </View>
  );
}
