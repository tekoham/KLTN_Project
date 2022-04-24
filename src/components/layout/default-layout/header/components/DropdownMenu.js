import React from 'react'
import { Menu } from 'antd'

import { useDispatch } from 'react-redux'
import { useWeb3React } from '@web3-react/core'

import { userActions } from '../../../../../store/constants/user'

import _ from 'lodash'

const DropdownMenu = ({ handleMenuClick }) => {
  const { connector, deactivate } = useWeb3React()

  const dispatch = useDispatch()

  const handleDisconnect = () => {
    localStorage.removeItem('userId')
    localStorage.removeItem('userAddress')
    localStorage.removeItem('accessToken')
    localStorage.removeItem('expireDate')
    localStorage.removeItem('refreshToken')

    // if connect wallet using WalletConnect
    if (_.isFunction(connector?.close)) {
      connector.close()
    }
    deactivate()
    dispatch({
      type: userActions.USER_LOGOUT_WALLET,
    })
  }

  return (
    <div className='dropdown-menu'>
      <Menu onClick={handleMenuClick}>
        <Menu.Item key='1' className='item-redirect'>
          <div onClick={handleDisconnect}>Disconnect</div>
        </Menu.Item>
      </Menu>
    </div>
  )
}

export default DropdownMenu
