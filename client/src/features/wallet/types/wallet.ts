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
};
