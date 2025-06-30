import React from 'react'
import "./Dashboard.scss"
import ActivityRow from '../../components/ActivityRow/ActivityRow'

const Dashboard: React.FC = () => {
  return (
    <div className='DashboardWrapper'>
        <h1 className='title'>Users</h1>

        <ActivityRow/>
        
    </div>
  )
}

export default Dashboard