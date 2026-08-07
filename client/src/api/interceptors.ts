import AsyncStorage from "@react-native-async-storage/async-storage";
import type { AxiosInstance } from "axios";

const setInterceptors = (apiClient: AxiosInstance) => {
  apiClient.interceptors.request.use(
    async (config) => {
      const token = await AsyncStorage.getItem("token");

      if (token) {
        config.headers.Authorization = `Bearer ${token.replaceAll('"', "")}`;
      }

      return config;
    },
    (error) => Promise.reject(error),
  );

  apiClient.interceptors.response.use(
    async (response) => response,
    async (error) => {
      console.log(error);
      return Promise.reject(error);
    },
  );
};
export default setInterceptors;
