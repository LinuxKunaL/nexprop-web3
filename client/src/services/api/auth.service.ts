import { apiClient } from "@api/client";
import { API } from "@api/endpoints";

type TCreateUserRetrun = {
  isNewUser: string;
  nonce: string;
  jwtToken: string;
};

const createUser = async (data: any): Promise<TCreateUserRetrun> => {
  const result = await apiClient.post(API.AUTH.CREATE, data);
  return result.data;
};

const verifySignature = async (data: any) => {
  const result = await apiClient.post(API.AUTH.VERIFY_SIGNATURE, data);
  return result.data;
};

const selfVerify = async () => {
    const result = await apiClient.post(API.AUTH.SELFVERIFY);
    return result.data;
};

export default { createUser, verifySignature, selfVerify };
