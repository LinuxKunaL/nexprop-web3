import AuthProvider from "@providers/AuthProvider";
import FontsProvider from "@providers/FontsProvider";
import StyleProvider from "@providers/StyleProvider";
import ThemeProvider from "@providers/ThemeProvider";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { ToastProvider } from "@components/toast";

export function AppProviders({ children }: { children: React.ReactNode }) {

  return (
    <FontsProvider>
      <KeyboardProvider>
        <ThemeProvider>
          <StyleProvider>
            <ToastProvider maxToasts={6} defaultPosition="top">
              <AuthProvider>
                {children}
              </AuthProvider>
            </ToastProvider>
          </StyleProvider>
        </ThemeProvider>
      </KeyboardProvider>
    </FontsProvider>
  );
}
