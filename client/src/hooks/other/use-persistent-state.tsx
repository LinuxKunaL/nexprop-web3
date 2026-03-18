import { useState, useEffect, useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type PersistentKeys = "user_location" | "wishlist" | "theme" | "theme_template";

type Props<T> = [
  T | undefined,
  React.Dispatch<React.SetStateAction<T | undefined>>,
  () => void,
];

export function usePersistentState<T>(
  key: PersistentKeys,
  initValue?: T,
): Props<T> {
  const [state, setState] = useState<T | undefined>(undefined);
  const isLoaded = useRef(false);

  useEffect(() => {
    const load = async () => {
      try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
          setState(JSON.parse(value));
        } else if (initValue !== undefined) {
          setState(initValue);
        }
      } catch (error) {
        console.warn("AsyncStorage load error:", error);
      } finally {
        isLoaded.current = true;
      }
    };
    load();
  }, [key]);

  useEffect(() => {
    const save = async () => {
      if (!isLoaded.current) return;
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
    setState(undefined);
  };

  return [state, setState, deleteState];
}
