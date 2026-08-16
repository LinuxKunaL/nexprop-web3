import config from "@config";
import { JsonRpcProvider } from "ethers";

let provider: InstanceType<typeof JsonRpcProvider> | null = null;

export const web3provider = async () => {
  if (provider) return provider;

  provider = new JsonRpcProvider(
    config.blockchain.rpcUrl,
    config.blockchain.chainId,
  );

  return provider;
};
