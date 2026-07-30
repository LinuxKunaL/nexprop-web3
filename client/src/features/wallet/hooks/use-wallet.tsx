import { useWalletStore } from "@stores/wallet.store";
import walletService from "../services/wallet.service";
import { TWalletCatlog } from "../types/wallet";
import { useRouter } from "expo-router";

export default function useWallet() {
  const setWalletData = useWalletStore((state) => state.setWalletData);

  const connectWallet = async (wallet: TWalletCatlog): Promise<boolean> => {
    const result = await walletService.connect(wallet.nativeDeepLink);
    if (result) {
      setWalletData(result);
      return true;
    }
    return false;
  };

  const getWalletDetails = async () => {};

  const disconnectWallet = async () => {};

  return {
    disconnectWallet,
    getWalletDetails,
    connectWallet,
  };
}
