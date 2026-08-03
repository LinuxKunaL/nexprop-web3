import walletService from "@features/wallet/services/wallet.service";
import { useWalletStore } from "@stores/wallet.store";
import { transactionSimulator } from "./transactionSimulator";
import { parseEther } from "ethers";

export const walletSendTransaction = async <T>(
  contract: string,
  data: string,
  value?: string,
): Promise<{ hash: string | undefined; revert?: string }> => {
  const { address } = useWalletStore.getState();

  const ether = value ? `0x${parseEther(value).toString(16)}` : "0x0";

  const tx = {
    from: address,
    to: contract,
    data,
    value: ether,
  };

  const { success, error } = await transactionSimulator(tx);

  if (success) {
    try {
      const result = await walletService.walletRequest<string>(
        "eth_sendTransaction",
        [tx],
      );
      return { hash: result };
    } catch (error) {
      console.log(error);
      return { hash: undefined, revert: "rejected" };
    }
  } else {
    return { hash: undefined, revert: error };
  }
};
