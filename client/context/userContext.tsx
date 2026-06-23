"use client";

import { createContext, useContext } from "react";
import type { User } from "@/constant/user";

type UserContextType = {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
};

export const UserContext = createContext<UserContextType | null>(null);

export function useUser() {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used inside provider");
  return context;
}
