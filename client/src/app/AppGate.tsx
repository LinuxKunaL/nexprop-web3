import { useEffect } from "react";
import { useRouter } from "expo-router";
import { useNavigationStore } from "@stores/navigation.store";
import { useWalletStore } from "@stores/wallet.store";

const AppGate = () => {
  const router = useRouter();
  const { returnRoute, clearReturnRoute } = useNavigationStore();
  const { authState } = useWalletStore();

  useEffect(() => {
    if (!returnRoute) {
      if (authState == "connected") {
        router.replace("/home");
        return;
      }
      if (authState == "signature_pending") {
        router.replace("/connect-wallet");
      }
      router.replace("/splash");
      return;
    }

    router.replace(returnRoute);
    clearReturnRoute();
  }, [returnRoute]);

  return null;
};

export default AppGate;
