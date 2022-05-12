import React, { useState, useEffect } from 'react'
import './style.scss'
import { Modal, Checkbox, Row, message } from 'antd'
import moment from 'moment'
import { useWindowSize } from '../../../../utils/useWindowSize'
import { InputCustom, CustomButton } from '../../../../components/common'
import WETHIcon from '../../../../assest/icon/weth-small-icon.svg'
import { useSelector } from 'react-redux'
import { convertBigNumberValueToNumber } from '../../../../blockchain/ether'
import { checkWETHBalance, isUserApprovedWETH } from '../../../../blockchain/utils'
// import auctionService from 'service/auctionService'
import nftService from '../../../../service/nftService'
import BigNumber from 'bignumber.js'

const MAX_VALUE = 100000000000000
const BidModal = ({
    isOpen,
    onCloseModal,
    minimumBid,
    previousBid,
    openBidSuccessModal,
    isApprovedWETH,
    setIsApprovedWETH
}) => {
    const { address, id: userId } = useSelector(state => state.user?.myProfile)
    const isMobile = useWindowSize(576)

    const { data } = useSelector(state => state?.collectible)

    const [isApproving, setIsApproving] = useState(false)
    const [isCheckTerm, setIsCheckTerm] = useState(false)
    const [isPlacingBid, setIsPlacingBid] = useState(false)
    const [priceErr, setPriceErr] = useState('')
    const [bidPrice, setBidPrice] = useState(parseFloat((previousBid ? previousBid * 1.05 : minimumBid).toFixed(6)))
    const [currentBalance, setCurrentBalance] = useState()

    const onChangeBidPrice = (value, name, maxValue = MAX_VALUE, decimal = 6) => {
        if (value === '.') return setBidPrice()
        let number = value
            .toString()
            .replace(/[^0-9.]/g, '')
            .replace(/(\..*?)\..*/g, '$1')
        if (Number(number) >= maxValue) {
            number = number.slice(0, -1)
        }
        if (number.includes('.')) {
            const numString = number.toString().split('.')
            if (numString[1].length > decimal) {
                return setBidPrice(number.substring(0, number.length - 1))
            }
        }
        return setBidPrice(number)
    }

    const onApproveWETH = async () => {
        setIsApproving(true)
        const [approveRes, approveError] = await handleUserApproveWETH()
        if (approveRes) {
            setIsApprovedWETH(true)
            setIsApproving(false)
        }
        if (approveError) {
            if (approveError?.code === 4001) {
                onCloseModal()
                message.error('You declined the action in your wallet.')
            }
        }
    }

    const onPlaceBid = async () => {
        setIsPlacingBid(true)
        const [latestInfo, err] = await nftService.getNftDetail({ id: data?.id })
        if (err) {
            onCloseModal()
            return message.error('Something went wrong!')
        }

        if (
            latestInfo?.onSaleStatus === 0 ||
            Number(latestInfo?.auctions?.minBid) > Number(bidPrice) ||
            Number(latestInfo?.highestBid?.price) >= Number(bidPrice)
        ) {
            onCloseModal()
            return message.error(
                'You cannot continue this action. Please re-load the page for the latest status updates.'
            )
        }

        const paramForBidder = {
            bidderAddress: address,
            auctionOwnerAddress: latestInfo?.owner?.address,
            collectionAddress: latestInfo?.collection?.address,
            price: bidPrice,
            nftId: latestInfo?.id
        }

        const [dataBid, errorBid] = await placeBid(paramForBidder)

        if (errorBid) {
            onCloseModal()
            if (error.code === 4001) {
                return message.error('You declined the action in your wallet.')
            }

            return message.error(`Place a bid failed: ${error}`)
        }

        const auctionMetaData = {
            price: Number(bidPrice),
            signature: dataBid
        }
        const auctionId = latestInfo?.auctions?.id

        const [, errorMetaData] = await auctionService.makeBidForAuction(auctionId, auctionMetaData)
        if (errorMetaData) {
            return message.error(`Place a bid failed: ${errorMetaData}`)
        }

        openBidSuccessModal()
    }

    useEffect(() => {
        const getBalance = async () => {
            const [balanceRes] = await checkWETHBalance(address)
            if (balanceRes) {
                const balance = convertBigNumberValueToNumber(balanceRes, 18)
                setCurrentBalance(balance)
            }
        }
        if (address) {
            getBalance()
        }
    }, [address])

    useEffect(() => {
        const validateBidPrice = () => {
            if (bidPrice) {
                const totalPrice = parseFloat((bidPrice * (1 + MARKET_FEE)).toFixed(7))
                if (totalPrice > currentBalance) {
                    setPriceErr("You don't have enough balance. Please convert ETH to WETH to place a bid!")
                } else if (bidPrice < parseFloat((previousBid * 1.05).toFixed(8))) {
                    setPriceErr('You must bid 5% more than the last bid!')
                } else if (bidPrice < minimumBid) {
                    setPriceErr('You must bid greater than the minimum bid!')
                } else if (priceErr?.length > 0) {
                    setPriceErr('')
                }
            } else {
                setPriceErr('')
            }
        }
        validateBidPrice()
    }, [bidPrice, currentBalance, minimumBid, previousBid])

    return (
        <Modal
            visible={isOpen}
            onCancel={!isPlacingBid && !isApproving ? onCloseModal : () => {}}
            onOk={onCloseModal}
            footer={null}
            closable={false}
            className={'custom-bid-modal'}
        >
            <div className="bid-modal-container">
                <p>Place a bid</p>
                <p>{previousBid ? `Previous bid: ${previousBid || 0} WETH` : `Minimum bid: ${minimumBid || 0} WETH`}</p>
                <div>
                    <p>Bid amount</p>
                    <p>{`Balance: ${parseFloat((+currentBalance).toFixed(6))} WETH`}</p>
                </div>
                <InputCustom
                    prefix={
                        <div className="bid-input-prefix">
                            <img alt="weth" src={WETHIcon} />
                            {isMobile && <span>WETH</span>}
                        </div>
                    }
                    value={bidPrice}
                    onChange={e => onChangeBidPrice(e.target.value)}
                />
                <p>*Bid amount must be at least 5% greater than the previous bid</p>

                <Row align="center" justify="space-between" className="total-fee-row">
                    <p className="light-text">Total Fee</p>
                    <div>
                        <p className="light-text">{`${BigNumber(bidPrice || 0)
                            .decimalPlaces(8)
                            .toString()} WETH`}</p>
                    </div>
                </Row>

                <div className="term-of-service">
                    <Checkbox checked={isCheckTerm} onChange={() => setIsCheckTerm(!isCheckTerm)} />
                    <p className="term-of-service-text">By checking this box, I agree to CAS NFT</p>
                </div>
                <div className="bid-modal-actions">
                    {isApprovedWETH ? (
                        <CustomButton
                            color="pink-hover-blue"
                            disabled={!bidPrice || !isCheckTerm || priceErr?.length !== 0}
                            loading={isPlacingBid}
                            onClick={onPlaceBid}
                        >
                            <span>Place bid</span>
                        </CustomButton>
                    ) : (
                        <CustomButton
                            color="pink"
                            onClick={onApproveWETH}
                            loading={isApproving}
                            disabled={isApproving || !isCheckTerm}
                        >
                            <span>Approve WETH</span>
                        </CustomButton>
                    )}
                </div>
                {currentBalance !== null && priceErr && <p className="error-balance">{priceErr}</p>}
            </div>
        </Modal>
    )
}

export default BidModal
