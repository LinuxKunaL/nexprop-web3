import { verifyMessage } from "ethers";
import authRepository from "../repositories/auth.repository.ts";
import jwt from "jsonwebtoken";
import type {
  TCreateUser,
  TVerifySignature,
} from "../validators/auth.validator.ts";
import { v4 as uuidV4 } from "uuid";
import appConfig from "@/config/app.config.ts";
import type { TUserJWT } from "@/types/jwt-payload.ts";
import { AppError } from "@/utils/AppError.ts";
import { StatusCodes } from "http-status-codes";

const createUser = async (data: TCreateUser) => {
  try {
    const user = await authRepository.findByWalletAddress(data.address);

    if (!user) {
      const newUser = await authRepository.create(data);
      const token = jwt.sign(
        { userid: newUser.id, address: newUser.address },
        appConfig.JWT_KEY,
      );
      return {
        isNewUser: true,
        nonce: null,
        jwtToken: token,
      };
    }

    const token = jwt.sign(
      { userid: user.id, address: user.address },
      appConfig.JWT_KEY,
    );

    const nonce = uuidV4();

    await authRepository.update(user.id, { nonce });

    return {
      isNewUser: false,
      nonce,
      jwtToken: token,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const verifySignature = async (
  data: TVerifySignature,
): Promise<{ signatureVerify: boolean }> => {
  try {
    const user = await authRepository.findByWalletAddress(data.address);
    if (user) {
      const address = verifyMessage(user.nonce!, data.signature);
      if (address.toUpperCase() == data.address.toUpperCase()) {
        return {
          signatureVerify: true,
        };
      }
    }
    return {
      signatureVerify: false,
    };
  } catch (error) {
    return {
      signatureVerify: false,
    };
  }
};

const verifyUser = async (
  token: string,
): Promise<{
  isVerify: boolean;
  user: { userId: number; address: string } | null;
  message?: string;
}> => {
  try {
    const decode = jwt.verify(token, appConfig.JWT_KEY) as TUserJWT;

    const user = await authRepository.findByWalletAddress(decode.address);

    if (!user) {
      // return {
      //   isVerify: false,
      //   user: null,
      //   message: "User not found",
      // };
      throw new AppError("User not found", StatusCodes.NOT_FOUND, "NOT_FOUND");
    }

    return {
      isVerify: true,
      user: {
        userId: user.id,
        address: user.address,
      },
    };
  } catch (error) {
    if (error instanceof Error) {
      switch (error.name) {
        case "TokenExpiredError":
          return {
            isVerify: false,
            user: null,
            message: `JWT expired: ${error.message}`,
          };

        case "NotBeforeError":
          return {
            isVerify: false,
            user: null,
            message: `JWT not active yet: ${error.message}`,
          };

        case "JsonWebTokenError":
          return {
            isVerify: false,
            user: null,
            message: `Invalid JWT: ${error.message}`,
          };

        default:
          return {
            isVerify: false,
            user: null,
            message: `Unknown error: ${error.message}`,
          };
      }
    }

    if (error instanceof AppError) {
      console.log(error);
      return {
        isVerify: false,
        user: null,
        message: error.message,
      };
    }

    return {
      isVerify: false,
      user: null,
      message: "Unknown error",
    };
  }
};

export default { createUser, verifySignature, verifyUser };
