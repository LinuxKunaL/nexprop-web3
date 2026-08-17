
import { BackHandler, Platform } from "react-native";

export const exitApp = () => {
  if (Platform.OS === "android") {
    BackHandler.exitApp();
  }
};