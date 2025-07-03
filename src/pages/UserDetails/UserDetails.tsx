import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useUserData } from '../../hooks/useUserData';
import { UserDataItem } from '../../types/userTypes';
import { BiArrowBack } from 'react-icons/bi';
import ProfileHeader from '../../components/profileHeader/profileHeader';
import PersonalInformation from '../../components/PersonalInformation/PersonalInformation';

const UserDetails: React.FC = () => {
  const { state } = useLocation();
  const { id } = useParams<{ id: string }>();
  const { users, error, fetchUserById } = useUserData();
  const navigate = useNavigate();
  const [user, setUser] = useState<UserDataItem | undefined>(state?.user);

  
  useEffect(() => {
    const loadUser = async () => {
      // check localstorage first
      const storedUser = localStorage.getItem(`user_${id}`);
      if (storedUser) {
        setUser(JSON.parse(storedUser));
        return;
      }

      // If user is provided in state, use it
      if (state?.user) {
        setUser(state.user);
        localStorage.setItem(`user_${id}`, JSON.stringify(state.user));
        return;
      }

      // If user is in the users array, use it
      const existingUser = users.find((u) => u.id === id);
      if (existingUser) {
        setUser(existingUser);
        localStorage.setItem(`user_${id}`, JSON.stringify(existingUser));
        return;
      }

      // If no user is found, fetch it by ID
      if (id && fetchUserById) {
        const fetchedUser = await fetchUserById(id);
        if (fetchedUser) {
          setUser(fetchedUser);
          localStorage.setItem(`user_${id}`, JSON.stringify(fetchedUser)); 
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
        <ProfileHeader user={user}/>
      </div>

      <div className="actData">
        {user && <PersonalInformation user={user} />}
      </div>
        
    </div>
  )
}

export default UserDetails