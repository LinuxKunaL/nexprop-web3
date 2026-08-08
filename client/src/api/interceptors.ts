import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigationStore } from "@stores/navigation.store";
import { useWalletStore } from "@stores/wallet.store";
import { AxiosError, isAxiosError, type AxiosInstance } from "axios";

const setInterceptors = (apiClient: AxiosInstance) => {
  apiClient.interceptors.request.use(
    async (config) => {
      const token = await AsyncStorage.getItem("token");

      if (token) {
        config.headers.Authorization = `Bearer ${token.replaceAll('"', "")}`;
      }

      return config;
    },
    (error) => Promise.resolve(error),
  );

  apiClient.interceptors.response.use(
    async (response) => response,
    async (error) => {
      if (isAxiosError(error)) {
        console.log(error.response?.data);
        if (error.response?.data.code == "USER_UNVERIFIED") {
          useWalletStore.getState().clearWallet();
          useNavigationStore.getState().clearReturnRoute();
          await AsyncStorage.removeItem("token");
        }
        return Promise.reject(error.response?.data);
      }
    },
  );
};
export default setInterceptors;
