import {
  RPC_CHAIN_ID,
  RPC_URL,
  BACKEND_URL,
  CONTRACT_MARKETPLACE_ADDRESS,
  CONTRACT_AUCTION_ADDRESS,
  CONTRACT_ESCROW_ADDRESS,
  CONTRACT_PROPERTY_NFT_ADDRESS,
  REQUEST_TIMEOUT,
  WC_APP_ICON,
  WC_APP_NAME,
  WC_APP_URL,
  WC_PROJECT_ID,
  WC_REDIRECT_NATIVE,
  WC_SUPPORTED_CHAINS,
} from "@env";

const config = {
  blockchain: {
    rpcUrl: RPC_URL,
    chainId: Number(RPC_CHAIN_ID),
  },

  contracts: {
    marketplace: CONTRACT_MARKETPLACE_ADDRESS,
    escrow: CONTRACT_ESCROW_ADDRESS,
    propertyNFT: CONTRACT_PROPERTY_NFT_ADDRESS,
    auction: CONTRACT_AUCTION_ADDRESS,
  },

  backend: {
    url: BACKEND_URL,
    timeout: Number(REQUEST_TIMEOUT),
  },

  walletConnect: {
    projectId: WC_PROJECT_ID,
    redirectNative: WC_REDIRECT_NATIVE,
    metadata: {
      name: WC_APP_NAME,
      url: WC_APP_URL,
      icons: [WC_APP_ICON],
    },
    supportedChains: JSON.parse(WC_SUPPORTED_CHAINS ?? "[]"),
  },
};

export default config;
