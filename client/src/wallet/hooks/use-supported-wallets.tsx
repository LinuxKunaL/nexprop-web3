import { useEffect, useState } from "react";
import { NativeModules } from "react-native";
import walletCatlog from "@data/wallet_catalog.json";
import { TWalletCatlog } from "@wallet";

function useSupportedWallets() {
  const { AppScanner } = NativeModules;
  const [walletList, setWalletList] = useState<TWalletCatlog[]>([]);

  useEffect(() => {
    AppScanner.getInstalledPackages().then((apps: string[]) => {
      walletCatlog.map((wallet: TWalletCatlog) => {
        apps.map((app) => {
          if (wallet.androidPackage === app) {
            setWalletList((prev) => [...prev, wallet]);
          }
        });
      });
    });
  }, [AppScanner]);

  return { walletList };
}

export default useSupportedWallets;
