import { usePersistentState } from "@hooks/other/use-persistent-state";
import { useCallback, useEffect, useState } from "react";

type TWishlist = string[];

const useWishlist = (id: number | undefined) => {
  const [isWishlist, setIsWishlist] = useState<boolean | undefined>(false);
  const [getWishlist, setWishlist] = usePersistentState<TWishlist>("wishlist");

  console.log(id, "user");

  useEffect(() => {
    if (id) {
      const isThere = getWishlist?.includes(id.toString());
      if (typeof isThere == "boolean") {
        setIsWishlist(isThere);
      }
    }
  }, [id]);

  console.log(getWishlist, isWishlist);
  const handleToggleWishlist = useCallback(() => {
    if (isWishlist) {
      const filter = getWishlist?.filter((item) => item != id?.toString());
      setWishlist(filter);
      setIsWishlist(false);
    } else {
    
      setWishlist((prev: any) => [...prev, id]);
      setIsWishlist(true);
    }
  }, [id]);

  return { handleToggleWishlist, isWishlist };
};

export default useWishlist;
