import React from 'react'
import { Modal } from 'antd'

import './style.scss'
import { useSelector, useDispatch } from 'react-redux'
import { get } from 'lodash'

import { signWallet } from '../../../blockchain/utils'

import {
  openRejectSignModal,
  closeRejectSignModal,
  closeRejectConnectModal,
} from '../../../store/actions/modal'
import { loginApi } from '../../../store/actions/login'

import CustomButton from '../button'
import { loginWallet } from '../../../store/actions/user'
import { loginApiActions } from '../../../store/constants/login'
import { useWeb3React } from '@web3-react/core'
import wrongNetworkIcon from '../../../assest/icon/wrong-network-icon.svg'

const RejectSignModal = (props) => {
  const modal = useSelector((state) => state.modal)
  const { isClickBtnCreate } = useSelector((state) => state.login)
  const openModalRejectSign = get(modal, 'openModalRejectSign')
  const openModalRejectConnect = get(modal, 'openModalRejectConnect')
  const { library, account, chainId } = useWeb3React()

  const dispatch = useDispatch()

  const onCancel = () => {
    dispatch(closeRejectSignModal())
    dispatch(closeRejectConnectModal())
    if (isClickBtnCreate) {
      dispatch({ type: loginApiActions.CLICK_BTN_CREATE })
    }

    dispatch({ type: loginApiActions.CLOSE_LOADING_CONNECT })
  }
  const handleTryAgain = () => {
    if (openModalRejectSign) {
      handleSignIn()
    } else {
      dispatch(loginWallet(account.toLowerCase(), library, chainId))
      dispatch(closeRejectConnectModal())
    }
  }
  const handleSignIn = async () => {
    try {
      const signature = await signWallet(library)
      const credentials = {
        signature: signature.substring(2),
      }
      dispatch(closeRejectSignModal())

      await dispatch(loginApi(credentials))

      if (isClickBtnCreate) {
        dispatch({ type: loginApiActions.SIGN_WITH_CREATE })
      }
    } catch (err) {
      dispatch(openRejectSignModal())
    }
  }

  return (
    <Modal
      className='reject-sign-modal'
      centered
      footer={null}
      visible={openModalRejectSign || openModalRejectConnect}
      onCancel={onCancel}
    >
      <div className='modal-wrapper'>
        <div>
          <img src={wrongNetworkIcon} alt='X icon' />
        </div>
        <span className='title'>Error</span>
        <span className='description'>
          User rejected the request. If the problem persist please{' '}
          <a href='/information'>Contact Support</a>
        </span>

        <div className='btn-sign-wallet'>
          <CustomButton onClick={handleTryAgain} color='blue'>
            <span>Try Again</span>
          </CustomButton>
          <CustomButton
            onClick={onCancel}
            color='white'
            className='btn-disconnect'
          >
            <span>Cancel</span>
          </CustomButton>
        </div>
      </div>
    </Modal>
  )
}

export default RejectSignModal
