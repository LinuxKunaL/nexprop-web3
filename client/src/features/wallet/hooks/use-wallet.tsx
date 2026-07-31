import { useWalletStore } from "@stores/wallet.store";
import walletService from "../services/wallet.service";
import { TWalletCatlog } from "../types/wallet";
import { v4 as uuidv4 } from "uuid";
import { verifyMessage } from "ethers";
import marketplaceService from "@services/blockchain/marketplace.service";

export default function useWallet() {
  const { setWalletData } = useWalletStore();

  const connectWallet = async (wallet: TWalletCatlog): Promise<boolean> => {
    const result = await walletService.connect(wallet.nativeDeepLink);
    if (result) {
      setWalletData(result);
      const { address } = result;
      // backend call logic here
      const uuid = uuidv4();

      const message = `Connect to NexProp\nNonce: ${uuid}`;

      const signature = (await walletService.signature(address, message)) || "";

      verifyMessage(message, signature);

      console.log(verifyMessage(message, signature));
      //

      return true;
    }
    return false;
  };

  const getWalletDetails = async () => {};

  const disconnectWallet = async () => {};

  const createProperty = async () => {
    await marketplaceService.createProperty();
  };

  return {
    disconnectWallet,
    getWalletDetails,
    connectWallet,
    createProperty,
  };
}
