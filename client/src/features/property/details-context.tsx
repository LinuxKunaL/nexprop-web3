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
  console.log(id);

  useEffect(() => {
    
    if (id) {
      const result = propertiesData.find((item) => item.id === Number(id));
      console.log(result,"resilt");
      
      setProperty(result as TProperty);
    }
  }, [id]);

  console.log(property);

  return (
    <PropertyDetailsContext.Provider value={{ property }}>
      {children}
    </PropertyDetailsContext.Provider>
  );
};
