export type TProperty = {
  id: number;
  title: string;
  location: string;
  image: string;
  price: string;
  distance: string;
  carouselImages: string[];
  businessName: string;
  category: string;
  address: {
    street: string;
    pincode: number;
    addressLine: string;
  };
  sellingType: string;
  bidDetails: {
    id: number | null;
    time: string | null;
  };
  owner: {
    id: number;
    name: string;
    avatar: string;
  };
  description: string;
  metadetails: {
    contractAdress: string;
    tokenId: string;
    chain: string;
    lastUpdate: string;
    platfromEarning: string;
  };
  itemActivity: {
    event: string;
    price: string;
    from: string;
    to: string;
    time: string;
  }[];
};
