import { propertyNFT } from "./contracts.ts";

export async function startPropertyNFTListener() {
  propertyNFT.on("PropertyCreated", (tokenId, owner, metadataCID) => {
    console.log(tokenId);
    console.log(owner);
    console.log(metadataCID);
  });
}
