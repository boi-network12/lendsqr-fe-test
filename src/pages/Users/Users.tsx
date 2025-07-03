import React, {  } from 'react';
import ActivityRow from '../../components/ActivityRow/ActivityRow';
import UsersData from '../../components/UsersData/UsersData';
import { useUserData } from '../../hooks/useUserData';


const Users: React.FC = () => {
  const { users, loading, error, fetchUsers } = useUserData();


  return (
    <div className='DashboardWrapper'>
      <div className='actData'>
        <ActivityRow />
      </div>

      <div className="actData">
        <UsersData
          users={users}
          loading={loading}
          error={error}
          fetchUsers={fetchUsers}
        />
      </div>
    </div>
  );
};

export default Users;