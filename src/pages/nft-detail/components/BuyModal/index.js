import React, { useState, useEffect } from 'react'
import './styles.scss'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col, Checkbox, Modal, message } from 'antd'
import { CustomButton } from '../../../../components/common'
import {
  convertBigNumberValueToNumber,
  getBalance,
} from '../../../../blockchain/ether'
import BigNumber from 'bignumber.js'
// import {
//     handleSellNFT
// } from 'blockchain/utils'
import { getNFTDetail, getTradingHistory } from 'store/actions/collectible'
import loadingIcon from '../../../../assest/icon/loading-icon.svg'

import { Link } from 'react-router-dom'

import { useWindowSize } from '../../../../utils/useWindowSize'
// import collectibleService from 'service/collectibleService'
// import saleNftService from 'service/saleNftService'
import nftService from 'service/nftService'

const ACTION_TYPE = {
  LIST_FOR_SALE: 0,
  CANCEL_LIST: 1,
  BUY: 2,
}

const BuyModal = ({
  onCloseModal,
  token,
  onOpenProcessModal,
  isOpen,
  setIsDoneProcessing,
  onCloseProcessModal,
}) => {
  const { isMobile } = useWindowSize(576)
  const dispatch = useDispatch()
  const {
    fileExtension,
    imageUrl,
    collection,
    name,
    price,
    id,
    tokenId,
    ownerNfts,
    metadataUrl,
  } = useSelector((state) => state.collectible.data)
  const profile = useSelector((state) => state.user?.profile)
  const [isCheckTerm, setIsCheckTerm] = useState(false)
  const [isFetchingData, setIsFetchingData] = useState(false)
  //   const { walletAddress, id: userId } = useSelector(
  //     (state) => state.user?.profile
  //   )
  const [isEnoughBalance, setIsEnoughBalance] = useState(false)

  const [isApproving, setIsApproving] = useState(false)
  const [isTransfering, setIsTransfering] = useState(false)
  const [userBalance, setUserBalance] = useState()

  const onCheckTerm = () => {
    setIsCheckTerm(!isCheckTerm)
  }

  const roundNumber = (price, params = 6) => {
    const numb = parseFloat(price)
    return +numb.toFixed(params)
  }

  const transfer = async (buyData) => {
    setIsTransfering(true)
    onCloseModal()
    setIsTransfering(false)
  }

  const onClickCheckout = async () => {
    setIsFetchingData(true)
    // const [data] = await saleNftService.getBuyNftInfo(id)
    setIsFetchingData(false)
    // if (data) {
    //   await transfer(data)
    // } else {
    //   onCloseModal()
    // }
  }

  useEffect(() => {
    const checkBalance = async (walletAddress) => {
      let balance
      balance = await getBalance(walletAddress)

      setUserBalance(balance)
      if (balance >= parseFloat(price * 1)) {
        setIsEnoughBalance(true)
      }
    }
    if (walletAddress) {
      checkBalance(walletAddress)
    }
  }, [walletAddress, isOpen])

  useEffect(() => {
    if (data?.data?.user === userId) {
      dispatch(getNFTDetail({ id: id, userId: profile?.id }))
      dispatch(getTradingHistory({ nftId: id }))
      onCloseProcessModal()
    }
  }, [])

  return (
    <Modal
      visible={isOpen}
      onOk={onCloseModal}
      onCancel={!isTransfering && !isApproving ? onCloseModal : () => {}}
      footer={null}
      closable={false}
      className={'custom-buy-modal'}
    >
      <div className='buy-modal-container'>
        <p className='checkout-title'>Complete buy</p>
        <Col className='checkout-detail'>
          <div className='checkout-detail__header'>
            <p className='bold-text'>Item</p>

            <p>
              {`Wallet balance: ${
                !isNaN(userBalance)
                  ? `${roundNumber(userBalance)} ETH`
                  : 'loading...'
              }`}
            </p>
          </div>

          {!isMobile ? (
            <Row align='center' justify='space-between'>
              <div className='nft-info'>
                {imageUrl ? (
                  <img alt='asset' src={imageUrl} className='asset-img' />
                ) : (
                  <div className='loading-img-placeholder'>
                    <img src={loadingIcon} className='loading-icon' />
                  </div>
                )}
                <div>
                  <p className='collection-text'>
                    <span>Collection</span>
                    <Link to={`/collection/${collection?.address}`}>
                      {collection?.name}
                    </Link>
                  </p>
                  <p>{`${name}`}</p>
                </div>
              </div>
              <div>
                <p>{`${BigNumber(price * 1)
                  .decimalPlaces(6)
                  .toString()} ${token()}`}</p>
              </div>
            </Row>
          ) : (
            <div className='nft-info-mobile'>
              {imageUrl ? (
                <img alt='asset' src={imageUrl} className='asset-img' />
              ) : (
                <div className='loading-img-placeholder'>
                  <img src={loadingIcon} className='loading-icon' />
                </div>
              )}
              <div>
                <p>{`${name}`}</p>
                <div>
                  <p className='collection-text'>
                    <span>Collection</span>
                    <Link to={`/collection/${collection?.address}`}>
                      {collection?.name}
                    </Link>
                  </p>
                  <p>
                    <span>{`${BigNumber(price * 1)
                      .decimalPlaces(6)
                      .toString()} ${token()}`}</span>
                  </p>
                </div>
              </div>
            </div>
          )}

          <Row align='center' justify='space-between'>
            <div className='term-of-service'>
              <Checkbox checked={isCheckTerm} onChange={onCheckTerm} />
              <span className='term-of-service-text'>
                <span>
                  By checking this box, I agree to use CAS NFT service
                </span>
              </span>
            </div>
          </Row>
        </Col>
        {userBalance !== undefined &&
          !isEnoughBalance &&
          isUserApproveTradingUSDT && (
            <p className='error-balance'>You don't have enough balance!</p>
          )}

        <CustomButton
          color='pink-hover-blue'
          disabled={
            !isCheckTerm || isFetchingData || !isEnoughBalance || isTransfering
          }
          onClick={onClickCheckout}
          loading={isTransfering}
        >
          <span>Buy</span>
        </CustomButton>
      </div>
    </Modal>
  )
}

export default BuyModal
