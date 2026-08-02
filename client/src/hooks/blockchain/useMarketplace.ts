import { useState } from "react";
import marketplaceService from "@services/blockchain/marketplace.service";

export default function useMarketplace() {
  const [loading, setLoading] = useState<boolean>(false);

  const buyProperty = async () => {
    setLoading(true);
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
