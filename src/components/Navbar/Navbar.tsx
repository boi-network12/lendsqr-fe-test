import React from 'react'
import { BiBell, BiSearchAlt } from "react-icons/bi"
import "./Navbar.scss"
import { Link } from 'react-router-dom'
import { FaChevronDown } from 'react-icons/fa'

const Navbar = () => {
  return (
    <div className='NavbarWrapper'>
        <div className='first-Div'>
            <img src={require("../../assets/logo.png")} alt="Logo" className="login-img" />
            <form action="" className='searchForm'>
                <input type="text" placeholder="Search for anything" />
                <p className="searchIcon">
                  {BiSearchAlt({ width: "13px", height: "14px", color: "#ffffff" })}
                </p>
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