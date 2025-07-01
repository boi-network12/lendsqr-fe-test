import React from 'react'
import "./users.scss"
import ActivityRow from '../../components/ActivityRow/ActivityRow'
import UsersData from '../../components/UsersData/UsersData'

const Users: React.FC = () => {
  return (
    <div className='DashboardWrapper'>

      <div className='actData'>
        <ActivityRow/>
      </div>

      <div className="actData">
        <UsersData />
      </div>
        
    </div>
  )
}

export default Users