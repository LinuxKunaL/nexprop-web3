import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useForm, type UseFormReturn } from "react-hook-form";
import { TCategory } from "@data/propertyDropdown";
import { EAuctionDuration, EListingType } from "@types_/enum";
import { DocumentPickerResponse, PickDirectoryResponse } from "@react-native-documents/picker";

type Props = {
  children: React.ReactNode[] | React.ReactNode;
};

export type TTabs = "Overview" | "Location" | "Media" | "Document";

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
  listingType: EListingType;
  fiatPrice: number | null;
  startingBidfiatPrice: number | null;
  auctionDuration: EAuctionDuration | null;
  address: TPropertyAddress;
  media: string[];
  documents: DocumentPickerResponse[] | null[];
};

type TErrorTabLevel = {
  trigger: boolean;
  tab: TTabs | null;
};

type TCustomType = {
  errorTabLevel: TErrorTabLevel;
  setErrorTabLevel: Dispatch<SetStateAction<TErrorTabLevel>>;
};

export const PropertyFormContext = createContext<
  UseFormReturn<TCreateProperty> & TCustomType
>({} as UseFormReturn<TCreateProperty> & TCustomType);

export default function PropertyFormProvider({ children }: Props) {
  const formControl = useForm<TCreateProperty>({
    defaultValues: {
      propertyStatus: 0,
      media: [],
      documents: [{ name: "" }],
      address: {
        country: "",
        state: "",
        addressLine: "",
        coordinates: { latitude: 0, longitude: 0 },
        zipCode: 0,
      },
      listingType: EListingType.Direct,
    },
  });

  const [errorTabLevel, setErrorTabLevel] = useState<TErrorTabLevel>({
    trigger: false,
    tab: null,
  });

  return (
    <PropertyFormContext.Provider
      value={{ ...formControl, errorTabLevel, setErrorTabLevel }}
    >
      {children}
    </PropertyFormContext.Provider>
  );
}
