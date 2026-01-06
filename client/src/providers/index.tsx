import AuthProvider from "@providers/AuthProvider";
import FontsProvider from "@providers/FontsProvider";
import StyleProvider from "@providers/StyleProvider";
import ThemeSwitch from "@providers/ThemeSwitch";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <FontsProvider>
        {/* <ThemeSwitch> */}
          <StyleProvider>{children}</StyleProvider>
        {/* </ThemeSwitch> */}
      </FontsProvider>
    </AuthProvider>
  );
}
