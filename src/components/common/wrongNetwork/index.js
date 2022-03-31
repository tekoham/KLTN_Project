import React from 'react'
import { Modal } from 'antd'

import './style.scss'
import { useSelector } from 'react-redux'
import { get } from 'lodash'
import wrongNetworkIcon from '../../../assest/icon/wrong-network-icon.svg'

const ConnectWrongNetwork = (props) => {
  const modal = useSelector((state) => state.modal)

  const openModalWrongNetwork = get(modal, 'openModalWrongNetwork')

  return (
    <Modal
      className='wrong-network-modal'
      centered
      footer={null}
      visible={openModalWrongNetwork}
    >
      <div className='modal-wrapper'>
        <div>
          <img src={wrongNetworkIcon} alt='X icon' />
        </div>
        <span className='title'>Wrong network</span>
        <span className='description'>Change network to Goerli</span>
      </div>
    </Modal>
  )
}

export default ConnectWrongNetwork
