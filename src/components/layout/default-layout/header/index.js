import React from 'react'
import { Menu, SearchHeaderBar } from './components'
import { Link } from 'react-router-dom'
import CustomButton from '../../../common/button'
import './styles.scss'
import SearchIcon from '../../../../assest/icon/search-icon.svg'

const Header = () => {
  return (
    <div className='header-container d-flex'>
      <div className='d-flex align-items-center'>
        <Link to='/'>
          <img src='/logo.svg' alt='' />
        </Link>

        <div className='d-flex search-box'>
          <SearchHeaderBar />
          <img src={SearchIcon} alt='' />
        </div>
      </div>
      <Menu />
      <div>
        <CustomButton
          color='charcoal-blue'
          display='inline'
          className='create-btn'
        >
          Create
        </CustomButton>
        <CustomButton color='pink' display='inline' className='connect-btn'>
          Connect Wallet
        </CustomButton>
      </div>
    </div>
  )
}

export default Header
