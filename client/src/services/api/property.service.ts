import { AxiosResponse } from "axios";
import { API } from "@api/endpoints";
import { apiClient } from "@api/client";

const uploadMetadata = async (data: any): Promise<AxiosResponse["data"]> => {
  const result = await apiClient.post(API.PROPERTY.METADATA, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return result.data;
};

export default { uploadMetadata };
