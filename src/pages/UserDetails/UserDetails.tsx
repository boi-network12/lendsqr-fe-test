import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useUserData } from '../../hooks/useUserData';
import { UserDataItem } from '../../types/userTypes';
import { ClipLoader } from 'react-spinners';
import { BiArrowBack } from 'react-icons/bi';
import ProfileHeader from '../../components/profileHeader/profileHeader';

const UserDetails: React.FC = () => {
  const { state } = useLocation();
  const { id } = useParams<{ id: string }>();
  const { users, loading, error, fetchUserById } = useUserData();
  const navigate = useNavigate();
  const [user, setUser] = useState<UserDataItem | undefined>(state?.user);

  
  useEffect(() => {
    const loadUser = async () => {
      // If user is provided in state, use it
      if (state?.user) {
        setUser(state.user);
        return;
      }

      // If user is in the users array, use it
      const existingUser = users.find((u) => u.id === id);
      if (existingUser) {
        setUser(existingUser);
        return;
      }

      // If no user is found, fetch it by ID
      if (id && fetchUserById) {
        const fetchedUser = await fetchUserById(id);
        if (fetchedUser) {
          setUser(fetchedUser);
        }
      }
    };

    loadUser();
  }, [state, users, id, fetchUserById]);

     
    // Handle error state
    if (error) {
      return <div>Error: {error}</div>;
    }

    // Handle user not found
    if (!user) {
      return <div>User not found</div>;
    }


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
        {
           loading ? <ClipLoader
                      color="#333"
                      loading={loading}
                      size={30}
                      aria-label="Loading Spinner"
                      data-testid="loader"
                    /> : 
                     <ProfileHeader user={user}/>
          }
      </div>

      <div className="actData">
        
      </div>
        
    </div>
  )
}

export default UserDetails