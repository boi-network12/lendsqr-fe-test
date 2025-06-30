import React, { useEffect, useRef, useState } from 'react'
import { BiBell, BiSearchAlt } from "react-icons/bi"
import "./Navbar.scss"
import { Link } from 'react-router-dom'
import { FaBars, FaChevronDown } from 'react-icons/fa'
import { NavbarProps } from '../../types/navTypes'

interface ExtendedNavbarProps extends NavbarProps {
  toggleSidebar: () => void;
}

const Navbar: React.FC<ExtendedNavbarProps> = ({ toggleSidebar }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef<HTMLFormElement>(null)

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  // Close search when clicking outside the search form
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    };

    if (isSearchOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSearchOpen]);

  // Close search when input loses focus
  const handleInputBlur = () => {
    // Add a slight delay to allow clicking the search button without closing
    setTimeout(() => {
      setIsSearchOpen(false);
    }, 100);
  };


  return (
    <div className='NavbarWrapper'>
        <div className='first-Div'>
           <button className="hamburger" onClick={toggleSidebar} aria-label="Toggle Sidebar">
            {FaBars({})}
          </button>
            <img src={require("../../assets/logo.png")} alt="Logo" className="login-img" />
            <form action="" className={`searchForm ${isSearchOpen ? 'search-open' : ''}`}>
                <input
                  type='text'
                  placeholder='Search for anything'
                  aria-label='Search'
                  className={isSearchOpen ? 'search-input-open' : ''}
                  onBlur={handleInputBlur}
                  autoFocus={isSearchOpen} // Automatically focus input when opened
                />
                <button type='button' className='searchIcon' onClick={toggleSearch} aria-label='Toggle Search'>
                  {BiSearchAlt({ width: "13px", height: "14px", color: "#ffffff" })}
                </button>
            </form>
        </div>

        <ul className='second-Div'>
          <li><Link to="/">Docs</Link></li>
          <li>{BiBell({ className: "bell-icon" })}</li>
          <li>
            <img src={require("../../assets/avatar.png")} alt="" />
            <p>Adedeji</p>
            {FaChevronDown({})}
          </li>
        </ul>
    </div>
  )
}

export default Navbar