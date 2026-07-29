import { getClient } from "../services/client.service";
import walletService from "../services/wallet.service";
import { TWallet } from "../types/wallet";

export default function useWallet() {
  const connectWallet = async (wallet: TWallet) => {
    const result = await walletService.connect(wallet.nativeDeepLink);
    console.log(result);
  };

  const getWalletDetails = async () => {
    await walletService.disconnect();
  };

  const disconnectWallet = () => {};

  return {
    getWalletDetails,
    connectWallet,
  };
}
