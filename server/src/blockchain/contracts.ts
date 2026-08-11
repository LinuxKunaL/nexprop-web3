import { ethers } from "ethers";
import { provider } from "./provider.ts";

import PropertyNFTABI from "./abi/PropertyNFT.json" with { type: "json" };

const PROPERTYNFT_ADDRESS = "0x70e0bA845a1A0F2DA3359C97E0285013525FFC49";

export const propertyNFT = new ethers.Contract(
  PROPERTYNFT_ADDRESS,
  PropertyNFTABI,
  provider,
);
