import { createContext, Dispatch, SetStateAction, useState } from "react";
import { useForm, type UseFormReturn } from "react-hook-form";
import { TCategory } from "@data/propertyDropdown";
import { EAuctionDuration, EListingType } from "@types_/enum";
import { DocumentPickerResponse } from "@react-native-documents/picker";

export type TDocumentBuffer = {
  encrypted: {
    version: number;
    algorithm: string;
    kdf: {
      memory: number;
      iterations: number;
      parallelism: number;
      hashLength: number;
      algorithm: string;
      salt: Uint8Array<ArrayBuffer>;
    };
    uri: string;
    iv: Uint8Array<ArrayBufferLike>;
  };
  document: {
    uri?: string | null;
    name: string;
    size: number;
    type: string;
  };
};

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
  media: DocumentPickerResponse[] | null[];
  documents: TDocumentBuffer[];
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
      media: Array.from<DocumentPickerResponse>({ length: 0 }),
      documents: [{ document: { name: "" } }],
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

  formControl.register("fiatPrice");
  formControl.register("auctionDuration");
  formControl.register("startingBidfiatPrice");

  return (
    <PropertyFormContext.Provider
      value={{ ...formControl, errorTabLevel, setErrorTabLevel }}
    >
      {children}
    </PropertyFormContext.Provider>
  );
}
