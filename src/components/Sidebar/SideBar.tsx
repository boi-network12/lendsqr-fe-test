import React from 'react'
import './Sidebar.scss'
import { BiBriefcase, BiChevronDown } from 'react-icons/bi'
import { navItems } from '../../constants/navItems'
import { SidebarProps } from '../../types/navTypes';

interface ExtendedSidebarProps extends SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const SideBar: React.FC<ExtendedSidebarProps> = ({ isOpen, toggleSidebar }) => {
  
  return (
    <div className={`sidebarWrapper ${isOpen ? 'sidebar-open' : ''}`}>
      
      <h3 className='switchType'>
         {BiBriefcase({})} switch organization {BiChevronDown({})}
      </h3>


      {navItems.main.map((item, index) => {
        const Icon = item.icon;
        return (
          <h4 key={index} className='dashboardText'>
            <p className={!isOpen ? 'iconOnly' : ''}>
                  {Icon({})}
              </p>
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
                  <li 
                    key={index} 
                    className={item.label === 'Users' ? 'active' : ''}
                    onClick={() => window.innerWidth <= 768 && toggleSidebar()}
                  >
                    <p className={!isOpen ? 'iconOnly' : ''}>
                       {Icon({})}
                    </p>
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