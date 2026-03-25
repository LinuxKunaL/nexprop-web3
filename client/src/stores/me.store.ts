import { TMe } from "@types_/me";
import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createJSONStorage, persist } from "zustand/middleware";

export const useMeStore = create<TMe>()(
  persist(
    (set) => ({
      userLocation: null,
      setUserLocation: (value) =>
        set({
          userLocation: value,
        }),
    }),
    {
      name: "me",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
