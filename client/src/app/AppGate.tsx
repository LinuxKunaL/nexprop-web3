import { useEffect } from "react";
import { useRouter } from "expo-router";
import { useNavigationStore } from "@stores/navigation.store";

const AppGate = () => {
  const router = useRouter();
  const { returnRoute, clearReturnRoute } = useNavigationStore();

  useEffect(() => {
    if (!returnRoute) {
      router.replace("/splash");
      return;
    }

    router.replace(returnRoute);
    clearReturnRoute();
  }, [returnRoute]);

  return null;
};

export default AppGate;
