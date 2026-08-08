import { StatusCodes } from "http-status-codes";
import type { NextFunction, Request, Response } from "express";
import { zodErrorDecoder } from "@/utils/zodErrorDecoder.ts";
import { createBusinessValidator } from "../validators/business.validator.ts";
import businessService from "../services/business.service.ts";

const createBusiness = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const { error, data } = createBusinessValidator.safeParse(req.body);

  if (error) {
    const result = zodErrorDecoder(error);
    res.status(StatusCodes.BAD_REQUEST).send(result);
    return;
  }

  try {
    const result = await businessService.createBusiness(data, req.user.userId);
    res.status(StatusCodes.OK).send(result);
  } catch (error) {
    next(error);
  }
};

export default { createBusiness };
