import { startPropertyNFTListener } from "@/blockchain/listeners.ts";

export function startBlockchainListeners() {
  startPropertyNFTListener();

  console.log("Blockchain listeners started");
}
