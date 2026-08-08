import { create } from "zustand";
import { TWalletConnection } from "@features/wallet/types/wallet";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type TWalletStore = TWalletConnection & {
  setWalletData: (params: TWalletConnection) => void;
  changeAuthState: (state: TWalletConnection["authState"]) => void;
  clearWallet: () => void;
};

export const useWalletStore = create<TWalletStore>()(
  persist(
    (set) => ({
      address: "",
      chainId: 0,
      topic: "",
      nativeDeepLink: "",
      walletName: "",
      authState: "disconnected",
      setWalletData: (data: TWalletConnection) => set({ ...data }),
      clearWallet: () => {
        console.log("clear");

        return set({
          address: "",
          chainId: 0,
          topic: "",
          nativeDeepLink: "",
          walletName: "",
          authState: "disconnected",
        });
      },
      changeAuthState: (state: TWalletConnection["authState"]) =>
        set((prev) => ({ ...prev, authState: state })),
    }),
    {
      name: "wallet_store",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
