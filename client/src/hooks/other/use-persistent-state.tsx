import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type PersistentKeys = "user_location"|"wishlist";

export function usePersistentState<T>(
  key: PersistentKeys,
): [T | undefined, React.Dispatch<React.SetStateAction<T | undefined>>] {
  const [state, setState] = useState<T>();

  useEffect(() => {
    const load = async () => {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) setState(JSON.parse(value));
    };

    load();
  }, []);

  useEffect(() => {
    if (state !== undefined) {
      AsyncStorage.setItem(key, JSON.stringify(state));
    }
  }, [state, key]);

  return [state, setState];
}
