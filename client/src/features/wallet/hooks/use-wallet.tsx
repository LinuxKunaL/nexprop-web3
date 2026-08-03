import { useRouter } from "expo-router";
import { useToast } from "@components/toast";
import { useWalletStore } from "@stores/wallet.store";
import walletService from "../services/wallet.service";
import { TWalletCatlog, TWalletConnection } from "../types/wallet";
import useSaveCurrentPath from "@hooks/other/use-save-current-path";

export default function useWallet() {
  const { setWalletData } = useWalletStore();
  const { savePath } = useSaveCurrentPath();
  const toast = useToast();
  const router = useRouter();

  const connectWallet = async (wallet: TWalletCatlog) => {
    const result = walletService.connect(wallet.nativeDeepLink);
    savePath();

    toast.promise(result, {
      loading: "connecting to wallet !",
      success: (params) => {
        if (params) onSucess(params);
        return {
          title: `${params?.walletName} Connected!`,
          message: "Redirecting to the business setup",
        };
      },
      error: (e) => ({ title: "Connection Failed", message: String(e) }),
    });

    const onSucess = async (params: TWalletConnection) => {
      setWalletData(params);

      if (params.authState == "connected") {
        setTimeout(() => {
          router.replace("/create-business");
        }, 800);
      }

      // const message = `Connect to NexProp\nNonce: ${uuid}`;

      // const signature =
      //   (await walletService.signature(params.address, message)) || "";

      // verifyMessage(message, signature);

      // console.log(verifyMessage(message, signature));
      //
    };
  };

  const getWalletDetails = async () => {};

  const disconnectWallet = async () => {};

  return {
    disconnectWallet,
    getWalletDetails,
    connectWallet,
  };
}
