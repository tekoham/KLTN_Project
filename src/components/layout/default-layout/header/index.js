import React, { useState } from 'react'
import { HeaderMenu, SearchHeaderBar, DropdownMenu } from './components'
import { CustomTooltip, CustomButton } from '../../../common'
import { Dropdown } from 'antd'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import './styles.scss'
import SearchIcon from '../../../../assest/icon/search-icon.svg'

const Header = () => {
  const { myProfile } = useSelector((state) => state.user)
  const [visibleMenuUser, setVisibleMenuUser] = useState(false)

  const shortenAddress = (address = '', start = 6, chars = 4) => {
    return `${address.substring(0, start)}...${address.substring(
      address.length - chars
    )}`
  }

  const handleVisibleChange = (flag) => {
    setVisibleMenuUser(flag)
  }

  const handleMenuClick = () => {}

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
      <HeaderMenu />
      <div>
        <Link to='/create'>
          <CustomButton
            color='charcoal-blue'
            display='inline'
            className='create-btn'
          >
            Create
          </CustomButton>
        </Link>
        {myProfile?.data?.address ? (
          <Dropdown
            arrow={false}
            overlayClassName='dropdown-account'
            overlay={() => (
              <DropdownMenu
                handleMenuClick={handleMenuClick}
                setVisibleMenuUser={setVisibleMenuUser}
                visibleMenuUser={visibleMenuUser}
              />
            )}
            placement='bottomRight'
            trigger={['click']}
            onVisibleChange={handleVisibleChange}
            visible={visibleMenuUser}
          >
            <CustomTooltip title={myProfile?.data?.address} placement='left'>
              <CustomButton
                color='pink'
                display='inline'
                className='address-btn'
              >
                {shortenAddress(myProfile?.data?.address)}
              </CustomButton>
            </CustomTooltip>
          </Dropdown>
        ) : (
          <Link to='/connect'>
            <CustomButton color='pink' display='inline' className='connect-btn'>
              Connect Wallet
            </CustomButton>
          </Link>
        )}
      </div>
    </div>
  )
}

export default Header
