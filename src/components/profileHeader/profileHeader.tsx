import React, { useState } from 'react';
import './profileHeader.scss';
import { UserDataItem } from '../../types/userTypes';
import { BiSolidStar, BiStar } from 'react-icons/bi';

interface ProfileHeaderProps {
  user: UserDataItem;
}

const _NavItems = [
  { name: 'General Details', active: true },
  { name: 'Documents', active: false },
  { name: 'Bank Details', active: false },
  { name: 'Loans', active: false },
  { name: 'Savings', active: false },
  { name: 'App and System', active: false },
];

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user }) => {
  const [activeNav, setActiveNav] = useState(_NavItems[0].name);

  const handleNavClick = (name: string) => {
    setActiveNav(name);
  };

  return (
    <div className="ProfileHeaderWrapper">
      <div className="ProfileHeaderContainer">
        <div className="profileInfoHeader">
          <div className="profileIcon">
            <img src={require('../../assets/profileIcon.png')} alt={`${user.firstName} ${user.lastName}'s profile`} />
          </div>
          <div className="userInfo">
            <h3>{`${user.firstName} ${user.lastName}`}</h3>
            <span>@{user.username}</span>
          </div>
        </div>
        <div className="profileInfoHeader second">
          <h2>User's Tier</h2>
          <span className="starRating">
            {BiSolidStar({ "aria-label" : "Filled star" })}
            {BiStar({ "aria-label" : "Empty star" })}
            {BiStar({ "aria-label" : "Empty star" })}
          </span>
        </div>
        <div className="profileInfoHeader third">
          <h2>{user.accountBalance}</h2>
          <span>{`${user.accountNumber} / ${user.bankName}`}</span>
        </div>
      </div>

      <nav className="ProfileHeaderNav" aria-label="User profile navigation">
        <ul role="tablist">
          {_NavItems.map((item, index) => (
            <li
              key={index}
              role="tab"
              aria-selected={item.name === activeNav ? "true" : "false"}
              className={`profileNavLink ${item.name === activeNav ? 'active' : ''}`}
              onClick={() => handleNavClick(item.name)}
            >
              {item.name}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default ProfileHeader;