import React from 'react'
import "./UserDetails.scss"
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useUserData } from '../../hooks/useUserData';
import { UserDataItem } from '../../types/userTypes';
import { ClipLoader } from 'react-spinners';
import { BiArrowBack } from 'react-icons/bi';
import ProfileHeader from '../../components/profileHeader/profileHeader';

const UserDetails: React.FC = () => {
  const { state } = useLocation();
  const { id } = useParams();
  const { users, loading, error } = useUserData();
  const navigate = useNavigate();

  const user: UserDataItem | undefined = 
     state?.user || users.find((u) => u.id === id);

     // Handle loading and error states
    if (loading) return <div>
      <ClipLoader
        color="#333"
        loading={loading}
        size={30}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>;
    if (error) return <div>Error: {error}</div>;
    if (!user) return <div>User not found</div>;


  return (
    <div className='DashboardWrapper'>

      <div className='actData'>
        <div className="navigationHub">
          <p onClick={() => navigate(-1)} className="backButton">
            {BiArrowBack({})} <span>back to users</span>
          </p>
          <h2>
            <p>user details</p>
            <div className='btn'>
              <button className='blacklist'>Blacklist user</button>
              <button className='activate'>Activate user</button>
            </div>
          </h2>
        </div>
        {/* others */}
        <ProfileHeader user={user}/>
      </div>

      <div className="actData">
        
      </div>
        
    </div>
  )
}

export default UserDetails