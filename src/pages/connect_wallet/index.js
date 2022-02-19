import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import ArrowLeft from '../../assest/icon/back-arrow-left.svg'
import MetamaskImage from '../../assest/image/metamask-image.png'
import { Modal } from 'antd'
import './styles.scss'

const ConnectWallet = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false)

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }
  return (
    <div className='connect-wallet-container'>
      <div className='banner'>
        <div className='title'>Connect Your Wallet</div>
        <div className='go-to-homepage '>
          <Link className='d-flex' to='/'>
            <img src={ArrowLeft} alt='arrow left' />
            <div>Go back to Homepage</div>
          </Link>
        </div>
      </div>
      <div className='connect-wallet-content'>
        <div className='title'>Connect Your Wallet</div>
        <div>
          <div className='description'>
            Connect with our available supported wallet.
          </div>
          <span className='walletQA' onClick={showModal}>
            What is a wallet?
          </span>
        </div>
        <div className='wallet-detail'>
          <img src={MetamaskImage} alt='metamask icon' />
          <div className='wallet-name'>Metamask</div>
          <div className='wallet-description'>
            Connect with your metamask wallet. One of the most secure wallets
            with great flexibility
          </div>
          <div className='wallet-tag'>Simple</div>
        </div>
        <div className='notice'>
          We do not own your private keys and cannot access your funds without
          your confirmation.
        </div>
      </div>
      <Modal
        className='wallet-info'
        centered
        closable={false}
        footer={null}
        onCancel={handleCancel}
        visible={isModalVisible}
      >
        <h1>What is a wallet?</h1>
        <p>
          Wallets are used to send, receive, and store digital assets like
          Ether. Wallets come in many forms. They are either built into your
          browser, an extension added to your browser, a piece of hardware
          plugged into your computer, or even an app on your phone.
        </p>
      </Modal>
    </div>
  )
}

export default ConnectWallet
