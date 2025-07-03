import React from 'react';
import { UserDataItem } from '../../types/userTypes';
import "./PersonalInformation.scss";

interface PersonalInformationProps {
  user: UserDataItem;
}

const PersonalInformation: React.FC<PersonalInformationProps> = ({ user }) => {
  const sections = [
    {
      title: 'Personal Information',
      items: [
        { label: 'Full Name', value: `${user.firstName} ${user.lastName}` },
        { label: 'Email', value: user.profile.email },
        { label: 'Phone Number', value: user.profile.phoneNumber },
        { label: 'Gender', value: user.profile.gender },
        { label: 'Residence', value: user.profile.residence },
        { label: 'Marital Status', value: user.profile.maritalStatus },
        { label: 'BVN', value: user.profile.bvn },
      ],
    },
    {
      title: 'Education and Employment',
      items: [
        { label: 'Education Level', value: user.education.level },
        { label: 'Sector', value: user.education.sector },
        { label: 'Duration', value: user.education.duration },
        { label: 'Office Email', value: user.education.officeEmail },
        { label: 'Loan Repayment', value: user.education.loanRepayment },
        { label: 'Monthly Income', value: user.education.monthlyIncome.join(', ') },
        { label: 'Employment Status', value: user.education.employmentStatus },
      ],
    },
    {
      title: 'Socials',
      items: [
        { label: 'Twitter', value: user.socials.twitter },
        { label: 'Facebook', value: user.socials.facebook },
        { label: 'Instagram', value: user.socials.instagram },
      ],
    },
    {
      title: 'Guarantor',
      items: [
        { label: 'Full Name', value: user.guarantor.fullName },
        { label: 'Email', value: user.guarantor.email },
        { label: 'Phone Number', value: user.guarantor.phoneNumber },
        { label: 'Relationship', value: user.guarantor.relationship },
      ],
    },
  ];

  return (
    <div className="PersonalInformationWrapper">
      {sections.map((section, index) => (
        <section key={index} className="sectionDisplay">
          <h3>{section.title}</h3>
          <div className="boxWrapper">
            {section.items.map((item, idx) => (
              <div key={idx} className="boxContent">
                <span>{item.label}</span>
                <h4>{item.value || 'N/A'}</h4>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default PersonalInformation;