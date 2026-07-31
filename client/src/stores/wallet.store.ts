import { create } from "zustand";
import { TWalletConnection } from "@features/wallet/types/wallet";

export type TWalletStore = TWalletConnection & {
  setWalletData: (params: TWalletConnection) => void;
};

export const useWalletStore = create<TWalletStore>()((set) => ({
  address: "",
  balance: 0,
  isConnected: false,
  chainId: 0,
  topic: "",
  nativeDeepLink:"",
  setWalletData: (data: TWalletConnection) => set({ ...data }),
  clearWallet: () =>
    set({
      isConnected: false,
      topic: "",
      address: "",
      chainId: 0,
    }),
}));
