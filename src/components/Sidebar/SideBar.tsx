import React from 'react'
import './Sidebar.scss'
import { BiBriefcase, BiChevronDown, BiHome } from 'react-icons/bi'
import { navItems } from '../../constants/navItems'

const SideBar = () => {
  
  return (
    <div className='sidebarWrapper'>
      <div className='logoContainer'>
        <img src={require('../../assets/logo.png')} alt="Logo" />
      </div>
      
      <h3 className='switchType'>{BiBriefcase({})} switch organization {BiChevronDown({})}</h3>

      <h4 className='dashboardText'>{BiHome({})} dashboard</h4>
      
      {navItems.main.map((item, index) => {
        const Icon = item.icon;
        return (
          <h4 key={index} className='dashboardText'>
            {Icon({})}
            <span>{item.label}</span>
          </h4>
        );
      })}



      {Object.entries(navItems).map(([section, items]) => (
        section !== 'main' && (
          <section key={section} className='sectionDiv'>
            <h6>{section.charAt(0).toUpperCase() + section.slice(1)}</h6>
            <ul>
              {items.map((item, index) => {
                const Icon = item.icon;
                return (
                  <li key={index} className={item.label === 'Users' ? 'active' : ''}>
                    {Icon({})}
                    <span>{item.label}</span>
                  </li>
                );
              })}
            </ul>
          </section>
        )
      ))}
    </div>
  )
}

export default SideBar