import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TWalletConnection } from "@wallet";

export type TWalletStore = TWalletConnection & {
  setWalletData: (params: TWalletConnection) => void;
  changeAuthState: (state: TWalletConnection["authState"]) => void;
  clearWallet: () => void;
  setBalance: (param: number) => void;
};

export const useWalletStore = create<TWalletStore>()(
  persist(
    (set) => ({
      address: "",
      balance: 0,
      chainId: 0,
      topic: "",
      nativeDeepLink: "",
      walletName: "",
      authState: "disconnected",
      setWalletData: (data: TWalletConnection) => set({ ...data }),
      clearWallet: () => {
        return set({
          address: "",
          chainId: 0,
          balance:0,
          topic: "",
          nativeDeepLink: "",
          walletName: "",
          authState: "disconnected",
        });
      },
      changeAuthState: (state: TWalletConnection["authState"]) =>
        set((prev) => ({ ...prev, authState: state })),
      setBalance: (balance: number) => set((prev) => ({ ...prev, balance })),
    }),
    {
      name: "wallet_store",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
