import React from 'react'
import './Navbar.css'
import {assets} from '../../assets/assets'

function Navbar() {
  return (
    <div className='navbar'>
    <img src={assets.logo} alt="" className="logo" />
    <img src={assets.ProfileLogo} alt="" className="profile" />
    
    </div>
  )
}

export default Navbar
