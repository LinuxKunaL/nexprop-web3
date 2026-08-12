import express, { type Express } from "express";
import authRouters from "@/api/routers/auth.route.ts";
import businessRouters from "@/api/routers/business.route.ts";
import propertyRouters from "@/api/routers/property.route.ts";
import cors from "cors";
import userVerify from "@/middlewares/user-verify.middleware.ts";
import { errorMiddleware } from "@/middlewares/error-middleware.ts";

export default function (): Express {
  const app: Express = express();

  /** @Middlewares */
  app.use(cors({})); // TODO: Add the configration here
  app.use(express.json({ limit: "50mb" }));
  app.use(userVerify);

  app.use("/api/auth", authRouters);
  app.use("/api/business", businessRouters);
  app.use("/api/property", propertyRouters);

  app.use(errorMiddleware);

  return app;
}
