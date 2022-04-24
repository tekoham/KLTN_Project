import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { loginWallet } from '../../store/actions/user'
import ReactLoading from 'react-loading'
import { useWeb3React } from '@web3-react/core'
import { useWindowSize } from '../../utils/useWindowSize'
import { walletconnect, injected } from '../../blockchain/connectors'
import { loginApiActions } from '../../store/constants/login'
import ArrowLeft from '../../assest/icon/back-arrow-left.svg'
import MetamaskImage from '../../assest/image/metamask-image.png'
import { Modal } from 'antd'
import './styles.scss'

const metamask_deeplink = process.env.REACT_APP_METAMASK_DEEPLINK

const ConnectWallet = (props) => {
  const { activate, account, library, chainId } = useWeb3React()
  const [isMobile] = useWindowSize(768)
  const [isModalVisible, setIsModalVisible] = useState(false)

  const dispatch = useDispatch()

  const { myProfile, currentUserProfile } = useSelector((state) => state.user)
  const { isLoadingConnectWallet } = useSelector((state) => state.login)
  const { openModalRejectConnect } = useSelector((state) => state.modal)

  useEffect(() => {
    if (!!account && !!library) {
      dispatch(loginWallet(account.toLowerCase(), library, chainId))
    }
  }, [account, library])

  console.log(myProfile)

  useEffect(() => {
    const { location, history } = props
    if (myProfile?.data?.address) {
      if (location?.state?.from.includes('user')) {
        history.push(
          currentUserProfile?.address
            ? `/user/${currentUserProfile?.address}`
            : `/`
        )
      } else if (location?.state?.from.includes('owner')) {
        history.push(`/user/${myProfile?.address}`)
      } else if (location?.state?.from.includes('edit')) {
        history.push('/edit-profile')
        // } else if (location?.state?.from.includes('collectible')) {
        //   history.push(
        //     collectible?.id ? `/collectible/${collectible?.id}` : `/`
        //   )
        // } else if (location?.state?.from.includes('collection')) {
        //   history.push(`/collection/${collection?.address}`)
      } else if (location?.state?.from.includes('activity')) {
        history.push(`/activity`)
      } else {
        history.push('/')
      }
    }
  }, [props, dispatch])

  const handleMetamask = async () => {
    dispatch({ type: loginApiActions.OPEN_LOADING_CONNECT })
    if (window?.ethereum?.isMetaMask) {
      // wc -> metamask -> close wc -> login by metamask
      if ('walletconnect' in localStorage) {
        await walletconnect.activate()
        const _provider = await walletconnect.getProvider()
        await _provider.disconnect()
      }
      if (!!account && !!library) {
        dispatch({ type: loginApiActions.CLOSE_LOADING_CONNECT })
        dispatch(loginWallet(account.toLowerCase(), library, chainId))
      } else {
        await activate(injected)
      }
    } else if (isMobile && metamask_deeplink) {
      window.open(metamask_deeplink)
      return
    } else {
      dispatch({ type: loginApiActions.CLOSE_LOADING_CONNECT })
      window.open('https://metamask.io/download.html')
    }
  }

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
        <div className='wallet-detail' onClick={handleMetamask}>
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
      <Modal
        closable={false}
        className='custom-loading-modal'
        centered
        footer={null}
        visible={isLoadingConnectWallet}
      >
        <ReactLoading type='spinningBubbles' color='#002979' />
      </Modal>
    </div>
  )
}

export default ConnectWallet
