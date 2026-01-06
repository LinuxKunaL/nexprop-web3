import React from "react";
import "../styles/global.css";

type StyleProviderProps = {
  children: React.ReactNode;
};

export default function StyleProvider({ children }: StyleProviderProps) {
  return <>{children}</>;
}
