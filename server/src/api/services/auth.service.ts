import { verifyMessage } from "ethers";
import authRepository from "../repositories/auth.repository.ts";
import type {
  TCreateUser,
  TVerifySignature,
} from "../validators/auth.validator.ts";
import { v4 as uuidV4 } from "uuid";

const createUser = async (data: TCreateUser) => {
  try {
    const user = await authRepository.findByWalletAddress(data.address);
    console.log(user);
    
    if (!user) {
      await authRepository.create(data);
      return {
        isNewUser: true,
        nonce: null,
      };
    }

    const nonce = uuidV4();

    await authRepository.update(user.id, { nonce });

    return {
      isNewUser: false,
      nonce,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const verifySignature = async (data: TVerifySignature) => {
  try {
    const user = await authRepository.findByWalletAddress(data.address);
    if (user) {
      const address = verifyMessage(user.nonce!, data.signature);
      console.log(address);

      if (address.toUpperCase() == data.address.toUpperCase()) {
        return {
          signatureVerify: true,
        };
      }

      return {
        signatureVerify: false,
      };
    }
  } catch (error) {
    return {
      signatureVerify: false,
    };
  }
};

export default { createUser, verifySignature };
