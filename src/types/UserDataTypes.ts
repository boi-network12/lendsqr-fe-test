import { UserDataItem } from "./userTypes";

// Define the shape of the context
export interface UserDataContextType {
  users: UserDataItem[];
  loading: boolean;
  error: string | null;
  fetchUsers: () => Promise<void>;
}