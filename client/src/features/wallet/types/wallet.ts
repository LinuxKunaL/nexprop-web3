export type TWalletCatlog = {
  id: string;
  name: string;
  logoUrl: string;
  androidPackage: string;
  nativeDeepLink: string;
  universalDeepLink: string | null;
};

export type TWalletConnection = {
  isConnected: boolean;
  topic: string;
  address: string;
  chainId: number;
  nativeDeepLink:string;
};

export type TWalletMethods =
  | "eth_accounts"
  | "eth_requestAccounts"
  | "eth_chainId"
  | "eth_getBalance"
  | "eth_getTransactionCount"
  | "eth_call"
  | "eth_estimateGas"
  | "eth_gasPrice"
  | "eth_feeHistory"
  | "eth_sendTransaction"
  | "personal_sign"
  | "eth_signTypedData"
  | "eth_signTypedData_v4"
  | "wallet_switchEthereumChain"
  | "wallet_addEthereumChain";
