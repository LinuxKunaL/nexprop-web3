export type TWallet = {
  id: string;
  name: string;
  logoUrl: string;
  androidPackage: string;
  nativeDeepLink: string;
  universalDeepLink: string | null;
};