import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

function Sidebar({children}) {
  const [active, setActive] = useState(null);
  const menuItems = [
    {
      path: "/",
      name: "Home",
    },
    {
      path: "/addscenario",
      name: "Add Scenario",
    },
    {
      path: "/allscenario",
      name: "All Scenario",
    },
    {
      path: "/addvehicle",
      name: "Add Vehicle",
    },
  ]

  const handleActive = index => setActive(index)
  return (
    <div className='container'>
        <div className="sidebar">
        {
          menuItems.map((item, index) => (
            <NavLink to={item.path} key={index} className='link' onClick={() => handleActive(index)}>
              {item.name}
            </NavLink>
          ))
        }
        </div>
        <main className='main'>{children}</main>
    </div>
    
  )
}

export default Sidebar