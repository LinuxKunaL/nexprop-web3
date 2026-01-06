import AuthProvider from "@providers/AuthProvider";
import FontsProvider from "@providers/FontsProvider";
import StyleProvider from "@providers/StyleProvider";
import ThemeProvider from "@providers/ThemeProvider";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <FontsProvider>
        <ThemeProvider>
          <StyleProvider>{children}</StyleProvider>
        </ThemeProvider>
      </FontsProvider>
    </AuthProvider>
  );
}
