import React from 'react'
import { NavLink } from 'react-router-dom'

const HeaderMenu = () => {
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
      to: `/user/1`,
      title: 'Profile',
    },
    {
      to: `/information`,
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

export default HeaderMenu
