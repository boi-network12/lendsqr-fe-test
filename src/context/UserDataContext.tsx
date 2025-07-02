import React, { createContext, useState, ReactNode, useCallback } from 'react';
import { UserDataItem } from '../types/userTypes';
import { UserDataContextType } from '../types/UserDataTypes';



// Create the context with a default value
export const UserDataContext = createContext<UserDataContextType | undefined>(undefined);

// Create a provider component
export const UserDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<UserDataItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    console.log("fetching called");
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('https://api.json-generator.com/templates/20l9OjP20icY/data', {
        headers: {
          Authorization: 'Bearer c8ssaqsn1pjis94vg5svuzv6hs9axm5mmkej6hsz',
        },
      });

      if (!response.ok) throw new Error('Failed to fetch user data');
      const data: UserDataItem[] = await response.json();
      setUsers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [setUsers, setLoading, setError]); 

  return (
    <UserDataContext.Provider value={{ users, loading, error, fetchUsers }}>
      {children}
    </UserDataContext.Provider>
  );
};