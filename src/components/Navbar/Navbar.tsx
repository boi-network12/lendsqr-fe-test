import React from 'react'
import { BiSearchAlt } from "react-icons/bi"

const Navbar = () => {
  return (
    <div>
        <div>
            <img src={require("../../assets/logo.png")} alt="Logo" className="h-10 w-10" />
        </div>
        <div>
            <form action="">
                <input type="text" placeholder="Search for anything" />
                {BiSearchAlt({ size: 20 })}
            </form>
        </div>
        <div></div>
    </div>
  )
}

export default Navbar