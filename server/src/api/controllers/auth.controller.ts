import {
  createUserValidator,
  verifySignatureValidator,
} from "../validators/auth.validator.ts";
import { StatusCodes } from "http-status-codes";
import type { Request, Response } from "express";
import authService from "@/api/services/auth.service.ts";
import { zodErrorDecoder } from "@/utils/zodErrorDecoder.ts";

const createAccount = async (req: Request, res: Response) => {
  const { error, data } = createUserValidator.safeParse(req.body);

  if (error) {
    const result = zodErrorDecoder(error);
    res.status(StatusCodes.BAD_REQUEST).send(result);
    return;
  }

  try {
    const result = await authService.createUser(data);
    return res.status(StatusCodes.OK).send(result);
  } catch (error) {}
};

const verifySignature = async (req: Request, res: Response) => {
  const { error, data } = verifySignatureValidator.safeParse(req.body);

  if (error) {
    const result = zodErrorDecoder(error);
    res.status(StatusCodes.BAD_REQUEST).send(result);
    return;
  }

  try {
    const result = await authService.verifySignature(data);
    return res.status(StatusCodes.OK).json(result);
  } catch (error) {}
};

export default { createAccount, verifySignature };
