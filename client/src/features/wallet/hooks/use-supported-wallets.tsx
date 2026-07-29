import { useEffect, useState } from "react";
import { NativeModules } from "react-native";
import walletCatlog from "@data/wallet_catalog.json";
import { TWallet } from "../types/wallet";

function useSupportedWallets() {
  const { AppScanner } = NativeModules;
  const [walletList, setWalletList] = useState<TWallet[]>([]);

  useEffect(() => {
    AppScanner.getInstalledPackages().then((apps: string[]) => {
      walletCatlog.map((wallet: TWallet) => {
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
