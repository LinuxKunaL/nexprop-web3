import { TLocation } from "@components/maps/types";


export type TMe = {
  userLocation: TLocation | null;
  setUserLocation: (val: TLocation) => any;
};
