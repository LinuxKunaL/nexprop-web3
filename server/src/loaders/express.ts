import express, { type Express } from "express";
import cors from "cors";

export default function (): Express {
  const app: Express = express();

  /** @Middlewares */
  app.use(cors({})); // TODO: Add the configration here
  app.use(express.json({ limit: "50mb" }));

  // app.use("/api/auth");
  // app.use("/api/profile");
  // app.use("/api/property");
  // app.use("/api/business");
  // app.use("/api/escrow");
  // app.use("/api/notification");

  return app;
}
