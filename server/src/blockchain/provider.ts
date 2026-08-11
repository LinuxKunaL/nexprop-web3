import appConfig from "@/config/app.config.ts";
import { ethers } from "ethers";

export const provider = new ethers.WebSocketProvider(appConfig.ETH_RPC);
