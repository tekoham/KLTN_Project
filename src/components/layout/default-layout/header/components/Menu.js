import React from 'react'
import { NavLink } from 'react-router-dom'

const Menu = () => {
  const MainNavLink = [
    {
      to: `/home`,
      title: 'Home',
    },
    {
      to: `/marketplace`,
      title: 'Explore',
    },
    {
      to: `/activity`,
      title: 'Activity',
    },
    {
      to: `/user`,
      title: 'Profile',
    },
    {
      to: `/contact`,
      title: 'Contact Us',
    },
  ]
  return (
    <div className='dropdown-menu-container'>
      {MainNavLink.map((link, index) => {
        return (
          <NavLink key={index} to={link.to} activeClassName='active-link' exact>
            {link.title}
          </NavLink>
        )
      })}
    </div>
  )
}

export default Menu
