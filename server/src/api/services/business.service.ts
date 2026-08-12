import { AppError } from "@/utils/AppError.ts";
import { StatusCodes } from "http-status-codes";
import userRepository from "../repositories/user.repository.ts";
import businessRepository from "../repositories/business.repository.ts";
import type { TCreateBusiness } from "../validators/business.validator.ts";

const createBusiness = async (data: TCreateBusiness, userId: number) => {
  const user = await userRepository.getWithBisiness(userId);

  if (user?.business) {
    throw new AppError(
      "User already has a business",
      StatusCodes.CONFLICT,
      "BUSINESS_ALREADY_EXISTS",
    );
  }

  await businessRepository.create({
    ...data,
    user: { connect: { id: userId } },
  });

  return {
    success: true,
    message: "Business added successfully",
  };
};

export default { createBusiness };
