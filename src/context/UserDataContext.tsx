import React, { createContext, useState, ReactNode, useCallback } from 'react';
import { UserDataItem } from '../types/userTypes';
import { UserDataContextType } from '../types/UserDataTypes';

// Extend the context type to include fetchUserById

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
  }, []);

  const fetchUserById = useCallback(async (id: string): Promise<UserDataItem | null> => {
    try {
      // Check if user exists in the current users array to avoid unnecessary API call
      const existingUser = users.find((user) => user.id === id);
      if (existingUser) {
        return existingUser;
      }

      // Fetch from API
      setLoading(true);
      setError(null);
      const response = await fetch('https://api.json-generator.com/templates/20l9OjP20icY/data', {
        headers: {
          Authorization: 'Bearer c8ssaqsn1pjis94vg5svuzv6hs9axm5mmkej6hsz',
        },
      });

      if (!response.ok) throw new Error('Failed to fetch user data');
      const data: UserDataItem[] = await response.json();
      const user = data.find((u) => u.id === id);

      if (!user) {
        throw new Error('User not found');
      }

      // Optionally, update the users array with the fetched data
      setUsers((prev) => {
        if (!prev.some((u) => u.id === id)) {
          return [...prev, user];
        }
        return prev;
      });

      return user;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return null;
    } finally {
      setLoading(false);
    }
  }, [users]);

  return (
    <UserDataContext.Provider value={{ users, loading, error, fetchUsers, fetchUserById }}>
      {children}
    </UserDataContext.Provider>
  );
};