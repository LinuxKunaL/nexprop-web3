import { TLocation } from "@components/maps/types";


export type TMe = {
  username:string|null
  userLocation: TLocation | null;
  setUserLocation: (val: TLocation) => any;
  setUserName:(val:string)=>void
};
