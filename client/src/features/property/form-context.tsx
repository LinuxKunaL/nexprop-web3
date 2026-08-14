import { createContext, useContext, useEffect } from "react";
import { FieldValues, useForm, type UseFormReturn } from "react-hook-form";
import { PROPERTY_CATEGORIES, TCategory } from "@data/propertyDropdown";

type Props = {
  children: React.ReactNode[] | React.ReactNode;
};

type TPropertyAddress = {
  country: string;
  state: string;
  zipCode: number;
  addressLine: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
};

export type TCreateProperty = {
  title: string;
  category: TCategory;
  type: string;
  description: string;
  propertyStatus: number;
  sellingType: string;
  fiatPrice: number;
  startingBidfiatPrice: number;
  auctionDuration: number;
  address: TPropertyAddress;
  media: string[];
  documents: {
    name: string;
    data: string;
    type: "pdf" | "doc";
  }[];
};

export const PropertyFormContext = createContext<
  UseFormReturn<TCreateProperty>
>({} as UseFormReturn<TCreateProperty>);

export default function PropertyFormProvider({ children }: Props) {
  const formControl = useForm<TCreateProperty>({
    defaultValues: { propertyStatus: 0, media: [], documents: [{}] },
  });

  return (
    <PropertyFormContext.Provider value={formControl}>
      {children}
    </PropertyFormContext.Provider>
  );
}
