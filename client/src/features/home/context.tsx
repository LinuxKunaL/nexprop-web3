import React, { createContext, useState } from "react";

type Props = {
  children: React.ReactNode[] | React.ReactNode;
};

type TContextType = {
  setLocationModel: React.Dispatch<React.SetStateAction<boolean>>;
  locationModel: boolean;
};

export const HomeContext = createContext<TContextType>({} as TContextType);

export const HomeProvider = ({ children }: Props) => {
  const [locationModel, setLocationModel] = useState(false);

  return (
    <HomeContext.Provider
      value={{
        setLocationModel,
        locationModel,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};
