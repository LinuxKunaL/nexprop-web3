import { TProperty } from "@feature/property/types";
import { usePersistentState } from "@hooks/other/use-persistent-state";
import { useCallback, useEffect, useState } from "react";

type TWishlist = {
  id: string;
  image: string;
  title: string;
  location: string;
  price: string;
  distance: string;
};

const useWishlist = (property: TProperty | undefined) => {
  const [isWishlist, setIsWishlist] = useState(false);

  const [wishlist, setWishlist] = usePersistentState<TWishlist[]>("wishlist");

  const propertyId = property?.id?.toString();

  useEffect(() => {
    if (!propertyId || !wishlist) return;

    const exists = wishlist.some((item) => item.id === propertyId);

    setIsWishlist(exists);
  }, [wishlist, propertyId]);

  const handleToggleWishlist = useCallback(() => {
    if (!property || !propertyId) return;

    if (isWishlist) {
      setWishlist((prev) =>
        (prev ?? []).filter((item) => item.id !== propertyId),
      );
      setIsWishlist(false);
    } else {
      const newItem: TWishlist = {
        id: propertyId,
        image: property.image,
        title: property.title,
        location: property.location,
        price: property.price,
        distance: property.distance,
      };

      setWishlist((prev) => [...(prev ?? []), newItem]);
      setIsWishlist(true);
    }
  }, [isWishlist, property, propertyId, setWishlist]);

  return { handleToggleWishlist, isWishlist };
};

export default useWishlist;
