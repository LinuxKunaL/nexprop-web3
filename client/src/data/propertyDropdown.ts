import { EAuctionDuration } from "@types_/enum";
import { startCase } from "lodash";

export const PROPERTY_CATEGORIES = [
  { label: "Residential", value: "residential" },
  { label: "Commercial", value: "commercial" },
  { label: "Land", value: "land" },
  { label: "Industrial", value: "industrial" },
  { label: "Agricultural", value: "agricultural" },
];

export type TCategory =
  | "residential"
  | "commercial"
  | "land"
  | "industrial"
  | "agricultural";

export const PROPERTY_TYPES = {
  residential: [
    { label: "Apartment", value: "apartment" },
    { label: "Villa", value: "villa" },
    { label: "House", value: "house" },
    { label: "Penthouse", value: "penthouse" },
    { label: "Studio", value: "studio" },
    { label: "Duplex", value: "duplex" },
    { label: "Townhouse", value: "townhouse" },
  ],

  commercial: [
    { label: "Office", value: "office" },
    { label: "Retail Shop", value: "retail_shop" },
    { label: "Shopping Center", value: "shopping_center" },
    { label: "Warehouse", value: "warehouse" },
    { label: "Hotel", value: "hotel" },
    { label: "Restaurant", value: "restaurant" },
    { label: "Business Center", value: "business_center" },
  ],

  land: [
    { label: "Residential Land", value: "residential_land" },
    { label: "Commercial Land", value: "commercial_land" },
    { label: "Industrial Land", value: "industrial_land" },
    { label: "Agricultural Land", value: "agricultural_land" },
    { label: "Plot", value: "plot" },
  ],

  industrial: [
    { label: "Factory", value: "factory" },
    { label: "Manufacturing Unit", value: "manufacturing_unit" },
    { label: "Industrial Warehouse", value: "industrial_warehouse" },
    { label: "Industrial Building", value: "industrial_building" },
  ],

  agricultural: [
    { label: "Farmland", value: "farmland" },
    { label: "Farmhouse", value: "farmhouse" },
    { label: "Orchard", value: "orchard" },
    { label: "Plantation", value: "plantation" },
  ],
};

let AUCTION_DURATION: { label: string; value: string }[] = [];

(() => {
  Object.entries(EAuctionDuration).map((i) => {
    if (typeof i[1] == "string") {
      AUCTION_DURATION.push({
        label: startCase(i[1]),
        value: i[0],
      });
    }
  });
  AUCTION_DURATION.reverse();
})();

export { AUCTION_DURATION };
