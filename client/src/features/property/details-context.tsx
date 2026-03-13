import { useLocalSearchParams } from "expo-router";
import React, { createContext, useEffect, useState } from "react";
import { TProperty } from "./types";
import { propertiesData } from "@data/properties";

type Props = {
  children: React.ReactNode[] | React.ReactNode;
};

type TContextType = {
  property: TProperty;
};

export const PropertyDetailsContext = createContext<TContextType>(
  {} as TContextType,
);

export const PropertyDetailsProvider = ({ children }: Props) => {
  const { id } = useLocalSearchParams();
  const [property, setProperty] = useState<TProperty>({} as TProperty);

  useEffect(() => {
    if (id) {
      const result = propertiesData.find((item) => item.id === Number(id));
      setProperty(result as TProperty);
    }
  }, [id]);

  if (!property.id) return;

  return (
    <PropertyDetailsContext.Provider value={{ property }}>
      {children}
    </PropertyDetailsContext.Provider>
  );
};
