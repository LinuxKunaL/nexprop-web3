import { useEffect } from "react";
import { useRouter } from "expo-router";
import { useNavigationStore } from "@stores/navigation.store";
import { useWalletStore } from "@stores/wallet.store";

const AppGate = () => {
  const router = useRouter();
  const { returnRoute, clearReturnRoute } = useNavigationStore();
  const { authState } = useWalletStore();

  useEffect(() => {
    if (returnRoute) {
      router.replace(returnRoute);
      clearReturnRoute();
      return;
    }
    switch (authState) {
      case "connected":
        router.replace("/home");
        break;

      case "signature_pending":
        router.replace("/connect-wallet");
        break;

      case "business_pending":
        router.replace("/create-business");
        break;

      default:
        router.replace("/splash");
        break;
    }
  }, [returnRoute, authState, router, clearReturnRoute]);

  return null;
};

export default AppGate;
