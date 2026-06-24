"use client";

import { createContext, useContext } from "react";

type LayoutContextType = {
  logOutModal: boolean;
  setLogOutModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export const LayoutContext = createContext<LayoutContextType | null>(null);

export const useLayout = () => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error("useLayout must be used within LayoutContext.Provider");
  }
  return context;
};
