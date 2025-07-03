import React, { CSSProperties } from 'react'
import "./Activity.scss"
import { ActivityItem } from '../../types/ActivityTypes';
import usersIcon from '../../assets/users.png';
import favoritesIcon from '../../assets/activeUsers.png';
import likesIcon from '../../assets/fileDoc.png';
import sharesIcon from '../../assets/dbIcon.png';

const iconBg = (item: { iconBgColor: string }): CSSProperties => ({
  background: item.iconBgColor
});


const ActivityRow = () => {

    const activityItems: ActivityItem[] = [
    {
      icon: usersIcon,
      title: 'Users',
      number: 2453,
      iconColor: 'rgba(223, 24, 255, 1)',
      iconBgColor: 'rgba(223, 24, 255, 0.1)',
    },
    {
      icon: favoritesIcon,
      title: 'Favorites',
      number: 2453,
      iconColor: 'rgba(87, 24, 255, 1)',
      iconBgColor: 'rgba(87, 24, 255, 0.1)',
    },
    {
      icon: likesIcon,
      title: 'Likes',
      number: 12453,
      iconColor: 'rgba(245, 95, 68, 1)',
      iconBgColor: 'rgba(245, 95, 68, 0.1)',
    },
    {
      icon: sharesIcon,
      title: 'Shares',
      number: 102453,
      iconColor: 'rgba(255, 51, 102, 1)',
      iconBgColor: 'rgba(255, 51, 102, 0.1)',
    },
  ];


  return (
    <div className='ActivityWrapper'>
       <h3 className='Subtitle'>users</h3>
        <div className='BoxContainer'>
          {activityItems.map((item, index) => (
            <div className="box" key={index}>
              <div className="iconBg" style={iconBg(item)}>
                <img
                  src={item.icon}
                  alt={item.title}
                  className="icon"
                />
              </div>
              <span>{item.title}</span>
              <h3>{new Intl.NumberFormat('en-US').format(item.number)}</h3>
            </div>
          ))}
        </div>
    </div>
  )
}

export default ActivityRow