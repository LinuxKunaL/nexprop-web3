import { Interface, parseEther } from "ethers";
import MarketplaceABI from "../../abi/Marketplace.json";
import { walletSendTransaction } from "./walletRequest";

const Marketplace = new Interface(MarketplaceABI);

const createProperty = async () => {
  const params = [
    1, // businessId
    0, // ListingType.Direct
    parseEther("1"), // price
    0, // auctionStartPrice
    0, // AuctionDuration.THREE_DAYS (ignored for direct)
    0, // PropertyStatus.Available
    "ipfs://bafybeihxxxxxxxxxxxxxxxxxxxxxxxxxxxx/metadata.json",
    "ipfs://bafybeihyyyyyyyyyyyyyyyyyyyyyyyyyyyy/documents.json",
  ];
  const encodedData = Marketplace.encodeFunctionData("createProperty", [
    params,
  ]);
  const { hash, revert } = await walletSendTransaction(
    "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9",
    encodedData,
  );
  if (hash) {
    console.log(hash);
  } else {
    console.log(revert);
  }
};

const buyProperty = async (propertyId: number) => {
  const encodedData = Marketplace.encodeFunctionData("buyProperty", [
    propertyId,
  ]);
  const { hash, revert } = await walletSendTransaction(
    "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9",
    encodedData,
    "1",
  );
  if (hash) {
    console.log(hash);
  } else {
    console.log(revert);
  }
};

export default { createProperty, buyProperty };
