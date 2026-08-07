import { useState } from "react";
import { SignatureLike } from "ethers";
import { useRouter } from "expo-router";
import { useToast } from "@components/toast";
import { useWalletStore } from "@stores/wallet.store";
import walletService from "../services/wallet.service";
import authService from "@services/api/auth.service";
import { TWalletCatlog, TWalletConnection } from "../types/wallet";
import useSaveCurrentPath from "@hooks/other/use-save-current-path";

export default function useWallet() {
  const { setWalletData, changeAuthState } = useWalletStore();
  const [loading, setLoading] = useState(false);
  const { savePath } = useSaveCurrentPath();
  const toast = useToast();
  const router = useRouter();

  const connectWallet = async (wallet: TWalletCatlog) => {
    setLoading(true);
    savePath();

    try {
      const result = await toast.promise(
        walletService.connect(wallet.nativeDeepLink),
        {
          loading: "Connecting to wallet!",
          success: (params) => {
            return {
              title: `${params?.walletName} Connected!`,
            };
          },
          error: (e) => {
            setLoading(false);
            return { title: "Connection Failed", message: String(e) };
          },
          presentation: "alert",
        },
      );
      if (result) {
        await onWalletConnected(result);
      }
    } catch (error) {}
  };

  const onWalletConnected = async (params: TWalletConnection) => {
    setWalletData(params);

    const result = await authService.createUser({
      address: params.address,
      walletName: params.walletName,
      name: "kunal",
    });

    try {
      if (!result.isNewUser) {
        changeAuthState("signature_pending");
        const signature = await toast.promise(
          walletService.signature(params.address, result.nonce),
          {
            loading: {
              title: "Waiting for Signature",
              message: "Approve the signature request in your wallet.",
            },
            success: "Sign Approved",
            error: (e) => {
              setLoading(false);
              return { title: "Verification Failed", message: String(e) };
            },
            presentation: "alert",
          },
        );
        if (signature) {
          await onSignatureVerify(signature, params.address);
        }
      } else {
        setTimeout(() => {
          changeAuthState("connected");
          router.replace("/create-business");
        }, 800);
      }
    } catch (error) {}
  };

  const onSignatureVerify = async (
    signature: SignatureLike,
    address: string,
  ) => {
    const data = await authService.verifySignature({
      signature,
      address: address,
    });

    if (data.signatureVerify) {
      setLoading(false);
      toast.success("Signature is verified", "Navigating to home screen");
      changeAuthState("connected");
      router.replace("/home");
    }
  };

  const getWalletDetails = async () => {};

  const disconnectWallet = async () => {};

  return {
    loading,
    disconnectWallet,
    getWalletDetails,
    connectWallet,
  };
}
