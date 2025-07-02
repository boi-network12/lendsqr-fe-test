import { useContext } from "react";
import { UserDataContextType } from "../types/UserDataTypes";
import { UserDataContext } from "../context/UserDataContext";

// Custom hook to use the context
export const useUserData = (): UserDataContextType => {
  const context = useContext(UserDataContext);
  if (!context) {
    throw new Error('useUserData must be used within a UserDataProvider');
  }
  return context;
};