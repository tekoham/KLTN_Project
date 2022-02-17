import React from 'react'
import './styles.scss'
import { Link } from 'react-router-dom'

import LogoWhite from '../../../../assest/icon/logo-full-white.svg'

const Footer = () => {
  return (
    <div className='footer-container d-flex align-items-center'>
      <img src={LogoWhite} alt='logo' className='footer-logo' />
      <div className='footer-link'>
        <Link to='/'>Marketplace</Link>
        <Link to='/'>About us</Link>
        <Link to='/'>Helps & Support</Link>
      </div>
      <div className='policy'>
        <Link to='/'>Terms of Use</Link>
        <Link to='/'>Privacy Policy</Link>
      </div>
      <div className='footer-description'>
        This website is our graduation project about blockchain, provide digital
        marketplace for crypto collectibles and non-fungible tokens (NFTs). Buy,
        sell, and discover exclusive digital items.
      </div>
      <div className='footer-copyright'>@All right reserved by K.</div>
    </div>
  )
}

export default Footer
