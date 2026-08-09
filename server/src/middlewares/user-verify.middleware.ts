import authService from "@/api/services/auth.service.ts";
import { AppError } from "@/utils/AppError.ts";
import type { NextFunction, Response, Request } from "express";
import { StatusCodes } from "http-status-codes";

const userVerify = async (req: Request, res: Response, next: NextFunction) => {
  if (req.url == "/api/auth") {
    next();
    return;
  }

  const token = req.headers.authorization?.split(" ")[1];

  if (token) {
    const { isVerify, user, message } = await authService.verifyUser(token);

    if (isVerify && user != null) {
      req.user = user;
      console.log(user);
      next();
      return;
    }
    next(
      new AppError(message || "", StatusCodes.UNAUTHORIZED, "USER_UNVERIFIED"),
    );
    return;
  }
  next(
    new AppError("Token Not found", StatusCodes.NOT_FOUND, "TOKEN_NOT_FOUND"),
  );
};

export default userVerify;
