import config from "@config";
import axios from "axios";
import setInterceptors from "./interceptors";

var apiClient = axios.create({
  baseURL: config.backend.url + "/api",
  timeout: config.backend.timeout,
  headers: {
    "Content-Type": "application/json",
  },
});

setInterceptors(apiClient);

export { apiClient };
