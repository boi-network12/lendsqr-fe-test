import {
  BiHome,
  BiUser,
  BiGroup,
  BiUserCheck,
  BiMoney,
  BiBriefcase,
  BiLibrary,
  BiCoinStack,
  BiCalculator,
  BiTransferAlt,
  BiShield,
  BiStar,
  BiBuildingHouse,
  BiServer,
  BiFile,
  BiCog,
  BiReceipt,
} from 'react-icons/bi';
import { FaChartBar, FaClipboardCheck } from "react-icons/fa"
import { NavItem } from '../types/navTypes';

export const navItems: { [key: string]: NavItem[] } = {
  main: [
    { icon: BiHome, label: 'Dashboard' },
  ],
  customers: [
    { icon: BiGroup, label: 'Users' },              // 👥 
    { icon: BiUser, label: 'Guarantors' },          // 👤 
    { icon: BiMoney, label: 'Loans' },              // 💰 
    { icon: BiCalculator, label: 'Decision Models' },// 🧮 
    { icon: BiCoinStack, label: 'Savings' },        // stacked coins 
    { icon: BiTransferAlt, label: 'Loan Requests' },// ↔️ 
    { icon: BiShield, label: 'Whitelist' },         // shield 
    { icon: BiStar, label: 'Karma' },               // star 
  ],
  businesses: [
    { icon: BiBriefcase, label: 'Organization' },   // briefcase 
    { icon: BiLibrary, label: 'Loan Products' },    // library/books 
    { icon: BiBuildingHouse, label: 'Savings Products' }, // building/house 
    { icon: BiReceipt, label: 'Fees and Charges' }, // receipt 
    { icon: BiTransferAlt, label: 'Transactions' },// transfer arrows 
    { icon: BiServer, label: 'Services' },          // server 
    { icon: BiUserCheck, label: 'Service Account' },// user with check 
    { icon: FaClipboardCheck, label: 'Settlements' },// clipboard with check 
    { icon: FaChartBar, label: 'Reports' },         // bar chart 
  ],
  settings: [
    { icon: BiCog, label: 'Preferences' },          // cog/settings 
    { icon: BiReceipt, label: 'Fees and Pricing' }, // receipt (reused)
    { icon: BiFile, label: 'Audit Logs' },          // file document 
  ],
};
