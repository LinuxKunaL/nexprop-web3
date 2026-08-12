import appConfig from "@/config/app.config.ts";
import { ethers } from "ethers";

export const provider = new ethers.JsonRpcProvider(
  appConfig.ETH_RPC,
  undefined,
  { polling: true, pollingInterval: 4000 },
);
