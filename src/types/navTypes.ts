// navTypes.ts
import { IconType } from 'react-icons';

export interface NavItem {
  icon: IconType; // This is the type for icon components like BiMoney
  label: string;
  path?: string;
  subItems?: NavItem[];
}
