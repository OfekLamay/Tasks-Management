import React from 'react'
import { useNavigate } from "react-router-dom";

const NavBar = () => {
    
    const navigate = useNavigate()

    return (
      <div className='flexboxContainerLine'>
        <div className='clickNav' onClick={() => navigate('/')}>Home</div>
      </div>
    )
}

export default NavBar
