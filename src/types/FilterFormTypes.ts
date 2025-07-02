import { UserDataItem } from "./userTypes";

export interface FilterFormProps {
  isOpen: boolean;
  onClose: () => void;
  onFilter: (filters: Partial<UserDataItem>) => void;
  users: UserDataItem[];
  currentFilters: Partial<UserDataItem>;
}