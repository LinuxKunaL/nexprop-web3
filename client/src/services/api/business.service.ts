import { AxiosResponse } from "axios";
import { API } from "@api/endpoints";
import { apiClient } from "@api/client";
import { TBusiness } from "@features/business/screens/BusinessFormScreen";

const createBusiness = async (data: TBusiness): Promise<AxiosResponse["data"]> => {
  const result = await apiClient.post(API.BUSINESS.CREATE, data);
  return result.data;
};

export default { createBusiness };
