import React from 'react'
import { BiGroup, BiHeart, BiPaperclip, BiPaperPlane, BiShare, BiStar, BiStore } from 'react-icons/bi'
import "./Activity.scss"
import { ActivityItem } from '../../types/ActivityTypes';
import { FaUsers } from 'react-icons/fa';
import { MdFileDownload } from 'react-icons/md';



const ActivityRow = () => {

    const activityItems: ActivityItem[] = [
        {
        icon: BiGroup,
        title: 'Users',
        number: 278383838,
        iconColor: 'rgba(223, 24, 255, 1)', // Pink
        iconBgColor: 'rgba(223, 24, 255, 0.1)', // Light pink
        },
        {
        icon: FaUsers,
        title: 'Favorites',
        number: 1234567,
        iconColor: 'rgba(87, 24, 255, 1)', // Yellow
        iconBgColor: 'rgba(87, 24, 255, 0.1)', // Light yellow
        },
        {
        icon: MdFileDownload,
        title: 'Likes',
        number: 890123,
        iconColor: 'rgba(245, 95, 68, 1)', // Red
        iconBgColor: 'rgba(245, 95, 68, 0.1)', // Light red
        },
        {
        icon: BiStore,
        title: 'Shares',
        number: 456789,
        iconColor: 'rgba(255, 51, 102, 1)', // Blue
        iconBgColor: 'rgba(255, 51, 102, 0.1)', // Light blue
        },
    ]

  return (
    <div className='ActivityWrapper'>
        {activityItems.map((item, index) => (
        <div className="box" key={index}>
          <p className="iconBg" style={{ backgroundColor: item.iconBgColor }}>
            {item.icon({ className: "icon", style: {
                color: item.iconColor
            } })}
          </p>
          <span>{item.title}</span>
          <h3>{new Intl.NumberFormat('en-US').format(item.number)}</h3>
        </div>
      ))}
    </div>
  )
}

export default ActivityRow