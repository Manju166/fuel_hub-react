import React from 'react'
import { FaBell, FaUser } from 'react-icons/fa'
import logo from '../../assets/image.png'
import './style.css'
function Navbar() {
  return (
    <div className="navbar">
      <img src={logo} alt="fuelhub" />

      <div className="navbar__right">
        <FaBell className="navbar__notification-icon" />
        <FaUser className="navbar__user-icon" />
      </div>
    </div>
  )
}

export default Navbar
