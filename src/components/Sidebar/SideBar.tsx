import React from 'react'
import './Sidebar.scss'
import { BiBriefcase, BiChevronDown, BiHome } from 'react-icons/bi'

const SideBar = () => {
  return (
    <div className='sidebarWrapper'>
      <div className='logoContainer'>
        <img src={require('../../assets/logo.png')} alt="Logo" />
      </div>
      
      <h3 className='switchType'>{BiBriefcase({})} switch organization {BiChevronDown({})}</h3>

      <h4 className='dashboardText'>{BiHome({})} dashboard</h4>
    </div>
  )
}

export default SideBar