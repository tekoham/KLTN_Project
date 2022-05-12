import React, { useState, useEffect } from 'react'
import './styles.scss'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col, Checkbox, Modal, message } from 'antd'
import { CustomButton } from '../../../../components/common'
import { convertBigNumberValueToNumber, getBalance } from '../../../../blockchain/ether'
import { checkWETHBalance, isUserApprovedWETH, handleUserApproveWETH } from '../../../../blockchain/utils'
import BigNumber from 'bignumber.js'
import loadingIcon from '../../../../assest/icon/loading-icon.svg'

import { Link } from 'react-router-dom'

import { useWindowSize } from '../../../../utils/useWindowSize'
import nftService from '../../../../service/nftService'

const ACTION_TYPE = {
    LIST_FOR_SALE: 0,
    CANCEL_LIST: 1,
    BUY: 2
}

const FIXED_PRICE_CONTRACT = process.env.REACT_APP_SMART_CONTRACT_FIXED_PRICE

const BuyModal = ({ NFTData, onCloseModal, onOpenBuyProcessModal, isOpen }) => {
    const { isMobile } = useWindowSize(576)
    const dispatch = useDispatch()
    const { data } = useSelector(state => state.collectible)
    const [isCheckTerm, setIsCheckTerm] = useState(false)
    const { myProfile } = useSelector(state => state.user)
    const [isEnoughBalance, setIsEnoughBalance] = useState(false)

    const [userWETHBalance, setUserWETHBalance] = useState()

    const [isApproving, setIsApproving] = useState(false)

    const [isUserApproveWETH, setIsUserApproveWETH] = useState(false)

    const onCheckTerm = () => {
        setIsCheckTerm(!isCheckTerm)
    }

    const roundNumber = (price, params = 6) => {
        const numb = parseFloat(price)
        return +numb.toFixed(params)
    }

    const onClickUserApprove = async () => {
        setIsApproving(true)
        const [approveRes, approveError] = await handleUserApproveWETH(FIXED_PRICE_CONTRACT)
        if (approveRes) {
            setIsUserApproveWETH(true)
        }
        if (approveError) {
            if (approveError?.code === 4001) {
                onCloseModal()
                message.error('You declined the action in your wallet.')
            }
        }
        setIsApproving(false)
    }

    const onClickCheckout = async () => {
        if (NFTData) {
            onOpenBuyProcessModal()
        } else {
            onCloseModal()
        }
    }

    useEffect(() => {
        const checkUserWETHBalance = async () => {
            const balance = await checkWETHBalance(myProfile?.data?.address)
            const balanceConverted = convertBigNumberValueToNumber(balance[0], 18)
            setUserWETHBalance(balanceConverted)
            if (balanceConverted >= parseFloat(data?.metadata?.price * 1)) {
                setIsEnoughBalance(true)
            }
        }
        const checkIsUserApprovedWETH = async () => {
            const isApproved = await isUserApprovedWETH({
                userAddress: myProfile?.data?.address,
                contractAddress: FIXED_PRICE_CONTRACT
            })
            setIsUserApproveWETH(isApproved)
        }
        if (myProfile?.data?.address) {
            checkUserWETHBalance()
            checkIsUserApprovedWETH()
        }
    }, [myProfile?.data?.address, isOpen])

    return (
        <Modal
            visible={isOpen}
            onOk={onCloseModal}
            onCancel={!isApproving ? onCloseModal : () => {}}
            footer={null}
            closable={false}
            className={'custom-buy-modal'}
        >
            <div className="buy-modal-container">
                <p className="checkout-title">Complete buy</p>
                <Col className="checkout-detail">
                    <div className="checkout-detail__header">
                        <p className="bold-text">Item</p>

                        <p>
                            {`Wallet balance: ${
                                !isNaN(userWETHBalance) ? `${roundNumber(userWETHBalance)} WETH` : 'loading...'
                            }`}
                        </p>
                    </div>

                    {!isMobile ? (
                        <Row align="center" justify="space-between">
                            <div className="nft-info">
                                {data?.metadata?.imageURL ? (
                                    <img alt="asset" src={data?.metadata?.imageURL} className="asset-img" />
                                ) : (
                                    <div className="loading-img-placeholder">
                                        <img src={loadingIcon} className="loading-icon" />
                                    </div>
                                )}
                                <div>
                                    <p className="collection-text">
                                        <span>Collection</span>
                                        <Link to={`/collection/${data?.collection?.address}`}>
                                            {data?.collection?.name}
                                        </Link>
                                    </p>
                                    <p>{`${data?.name}`}</p>
                                </div>
                            </div>
                            <div>
                                <p>{`${BigNumber(data?.metadata?.price * 1)
                                    .decimalPlaces(18)
                                    .toString()} WETH`}</p>
                            </div>
                        </Row>
                    ) : (
                        <div className="nft-info-mobile">
                            {data?.metadata?.imageURL ? (
                                <img alt="asset" src={data?.metadata?.imageURL} className="asset-img" />
                            ) : (
                                <div className="loading-img-placeholder">
                                    <img src={loadingIcon} className="loading-icon" />
                                </div>
                            )}
                            <div>
                                <p>{`${data?.name}`}</p>
                                <div>
                                    <p className="collection-text">
                                        <span>Collection</span>
                                        <Link to={`/collection/${data?.collection?.address}`}>
                                            {data?.collection?.name}
                                        </Link>
                                    </p>
                                    <p>
                                        <span>{`${BigNumber(data?.metadata?.price * 1)
                                            .decimalPlaces(18)
                                            .toString()} WETH`}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    <Row align="center" justify="space-between">
                        <div className="term-of-service">
                            <Checkbox checked={isCheckTerm} onChange={onCheckTerm} />
                            <span className="term-of-service-text">
                                <span>By checking this box, I agree to use CAS NFT service</span>
                            </span>
                        </div>
                    </Row>
                </Col>
                {userWETHBalance !== undefined && !isEnoughBalance && (
                    <p className="error-balance">You don't have enough balance!</p>
                )}
                {!isUserApproveWETH ? (
                    <CustomButton
                        disabled={isApproving || !isCheckTerm}
                        loading={isApproving}
                        color="pink-hover-blue"
                        onClick={onClickUserApprove}
                    >
                        <span>{isApproving ? 'Waiting for approve' : 'Approve'}</span>
                    </CustomButton>
                ) : (
                    <CustomButton
                        color="pink-hover-blue"
                        disabled={!isCheckTerm || !isEnoughBalance}
                        onClick={onClickCheckout}
                    >
                        <span>Buy</span>
                    </CustomButton>
                )}
            </div>
        </Modal>
    )
}

export default BuyModal
