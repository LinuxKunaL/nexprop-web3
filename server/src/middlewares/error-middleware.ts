import { AppError } from "@/utils/AppError.ts";
import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export const errorMiddleware = (
  error: unknown,
  __: Request,
  res: Response,
  _: NextFunction,
) => {
  if (error instanceof AppError) {
    console.log(error.message);
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
      code: error.code,
    });
  }
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: "Internal server error",
    code: "INTERNAL_SERVER_ERROR",
  });
};
