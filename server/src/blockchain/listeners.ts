import { propertyNFT } from "./contracts.ts";
import events from "./events.ts";

export async function startPropertyNFTListener() {
  propertyNFT.on("PropertyCreated", events.propertyCreated);
}
