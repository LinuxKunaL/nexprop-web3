import AuthProvider from "@providers/AuthProvider";
import FontsProvider from "@providers/FontsProvider";
import StyleProvider from "@providers/StyleProvider";
import ThemeProvider from "@providers/ThemeProvider";
import { KeyboardProvider } from "react-native-keyboard-controller";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <FontsProvider>
        <KeyboardProvider>
          <ThemeProvider>
            <StyleProvider>{children}</StyleProvider>
          </ThemeProvider>
        </KeyboardProvider>
      </FontsProvider>
    </AuthProvider>
  );
}
