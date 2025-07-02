import React from 'react'
import "./profileHeader.scss";
import { UserDataItem } from '../../types/userTypes';

interface ProfileHeaderProps {
    user: UserDataItem;
}


const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user }) => {
  return (
    <div>profileHeader</div>
  )
}

export default ProfileHeader