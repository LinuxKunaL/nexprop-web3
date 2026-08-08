import { useState } from "react";
import { useToast } from "@components/toast";
import businessService from "@services/api/business.service";
import { TBusiness } from "../screens/BusinessFormScreen";
import { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "expo-router";
import { useWalletStore } from "@stores/wallet.store";

const useBusiness = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const toast = useToast();
  const { changeAuthState } = useWalletStore();

  const createBusiness = async (data: TBusiness) => {
    setLoading(true);
    const promise = businessService.createBusiness(data);

    toast.promise<AxiosResponse["data"], AxiosError>(promise, {
      loading: "Adding your business...",
      success: (res) => {
        setLoading(false);
        router.replace("/home");
        changeAuthState("connected");
        return String(res.message);
      },
      error: (err) => String(err.message),
    });
  };
  return { loading, createBusiness };
};

export default useBusiness;
