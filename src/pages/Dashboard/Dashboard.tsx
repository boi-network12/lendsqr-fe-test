import React from 'react'
import "./Dashboard.scss"
import ActivityRow from '../../components/ActivityRow/ActivityRow'
import DashboardData from '../../components/DashboardData/DashboardData'

const Dashboard: React.FC = () => {
  return (
    <div className='DashboardWrapper'>

      <div className='actData'>
        <ActivityRow/>
      </div>
        
        <div className='actData'>
          <DashboardData/>
        </div>
    </div>
  )
}

export default Dashboard