// src/types/userTypes.ts

export interface UserDataItem {
  id: string;
  organization: string;
  username: string;
  email: string;
  phoneNumber: string;
  dateJoined: string;
  status: 'Active' | 'Inactive' | 'Pending' | 'Blacklisted';
  accountBalance: string;
  accountNumber: string;
  bankName: string;
  profile: {
    bvn: string;
    email: string;
    gender: string;
    children: string;
    fullName: string;
    residence: string;
    phoneNumber: string;
    maritalStatus: string;
  };
  socials: {
    twitter: string;
    facebook: string;
    instagram: string;
  };
  education: {
    level: string;
    sector: string;
    duration: string;
    officeEmail: string;
    loanRepayment: string;
    monthlyIncome: string[];
    employmentStatus: string;
  };
  guarantor: {
    email: string;
    fullName: string;
    phoneNumber: string;
    relationship: string;
  };
  firstName: string;
  lastName: string;
}
