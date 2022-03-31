import React from 'react'
import metamaskLogo from '../../../assest/image/metamask-logo.png'
import { Row, Modal } from 'antd'

import './style.scss'
import { useDispatch, useSelector } from 'react-redux'
import { get } from 'lodash'
import { closeMetaMask } from '../../../store/actions/metamask'

const InstallMetameask = (props) => {
  const dispatch = useDispatch()
  const metamask = useSelector((state) => state.metamask)
  const open = get(metamask, 'open')
  const onCancel = () => {
    dispatch(closeMetaMask())
  }

  return (
    <Modal
      visible={open}
      title='Connect to a wallet'
      centered={true}
      footer={null}
      className='install-metamask'
      onCancel={onCancel}
    >
      <a
        className=''
        href='https://metamask.io/'
        target='_blank'
        rel='noreferrer'
      >
        <Row
          justify='space-between'
          className='install-metamask__link install-metamask__wrap'
        >
          <span className='title'>Install MetaMask</span>
          <img
            className='install-metamask__logo'
            src={metamaskLogo}
            alt='logo-metamask'
          />
        </Row>
      </a>
    </Modal>
  )
}

export default InstallMetameask
