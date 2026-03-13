import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type PersistentKeys = "user_location" | "wishlist";

export function usePersistentState<T>(
  key: PersistentKeys,
): [
  T | undefined,
  React.Dispatch<React.SetStateAction<T | undefined>>,
  () => void,
] {
  const [state, setState] = useState<T | undefined>(undefined);

  useEffect(() => {
    const load = async () => {
      try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
          setState(JSON.parse(value));
        }
      } catch (error) {
        console.warn("AsyncStorage load error:", error);
      }
    };
    load();
  }, [key]);

  useEffect(() => {
    const save = async () => {
      try {
        if (state !== undefined) {
          await AsyncStorage.setItem(key, JSON.stringify(state));
        }
      } catch (error) {
        console.warn("AsyncStorage save error:", error);
      }
    };
    save();
  }, [state, key]);

  const deleteState = async () => {
    await AsyncStorage.removeItem(key);
  };

  return [state, setState, deleteState];
}
