import { useState } from "react";
import { ethers, SignatureLike } from "ethers";
import { useRouter } from "expo-router";
import { useToast } from "@components/toast";
import { useWalletStore } from "@stores/wallet.store";
import walletService from "../services/wallet.service";
import authService from "@services/api/auth.service";
import { type TWalletCatlog, TWalletConnection } from "@wallet";
import useSaveCurrentPath from "@hooks/other/use-save-current-path";
import { usePersistentState } from "@hooks/other/use-persistent-state";
import { web3provider } from "@services/blockchain/web3provider";

export default function useWallet() {
  const { setWalletData, changeAuthState, setBalance } = useWalletStore();
  const [loading, setLoading] = useState(false);
  const { savePath } = useSaveCurrentPath();
  const toast = useToast();
  const router = useRouter();
  const [_, setToken] = usePersistentState("token");

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
      name: null,
    });
    setToken(result.jwtToken);

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
        changeAuthState("business_pending");
        setBalance(await getBalance(params.address));
        router.replace("/create-business");
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
      changeAuthState("connected");
      setBalance(await getBalance(address));
      router.replace("/home");
    }
  };

  const getBalance = async (address: string) => {
    const provider = await web3provider();
    const balance = await provider.getBalance(address);

    return Number(ethers.formatEther(balance.toString()));
  };

  const disconnectWallet = async () => {};

  return {
    loading,
    disconnectWallet,
    getBalance,
    connectWallet,
  };
}
