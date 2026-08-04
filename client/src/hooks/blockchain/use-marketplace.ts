import { useState } from "react";
import marketplaceService from "@services/blockchain/marketplace.service";
import useSaveCurrentPath from "@hooks/other/use-save-current-path";

export default function useMarketplace() {
  const [loading, setLoading] = useState<boolean>(false);
  const {savePath} = useSaveCurrentPath();

  const buyProperty = async () => {
    setLoading(true);
    savePath();
    try {
      return await marketplaceService.buyProperty(1);
    } finally {
      setLoading(false);
    }
  };

  const createProperty = async () => {
    setLoading(true);
    try {
      return await marketplaceService.createProperty();
    } finally {
      setLoading(false);
    }
  };
  return { buyProperty, createProperty, loading };
}
