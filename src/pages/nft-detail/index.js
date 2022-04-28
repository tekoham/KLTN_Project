import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import DefaultLayout from '../../components/layout/default-layout'
import { CustomButton } from '../../components/common'
import { getNFTDetail, clearDetail } from '../../store/actions/collectible'
import { getDiffUnixTime } from '../../utils/convertDate'
import { genCollectionContract, genAuctionsContract, genFixedPriceContract } from '../../blockchain/instance'
import moment from 'moment'
import {
    TradingHistory,
    Author,
    BuyModal,
    SaleModal,
    BidModal,
    CancelModal,
    AcceptOfferModal,
    SaleStepModal,
    ProcessBuyModal
} from './components'
import { useDispatch, useSelector } from 'react-redux'
import { useWeb3React } from '@web3-react/core'
import { isUserAuthenticated } from '../../utils/auth'
import { isTokenExpired } from '../../utils/refreshTokenAuth'
import { loginWallet } from '../../store/actions/user'
import userService from '../../service/userService'
import { message } from 'antd'

// Image
import WhiteHeartIcon from '../../assest/icon/white_heart_icon.svg'
import PinkHeartIcon from '../../assest/icon/pink_heart_icon.svg'
import NotFoundImage from '../../assest/icon/not-found.svg'

import './styles.scss'

const TRUNCATE_LETTER = 240
const EMPTY_ADDRESS = 0x0000000000000000000000000000000000000000
const FIXED_PRICE_CONTRACT = process.env.REACT_APP_SMART_CONTRACT_FIXED_PRICE
const AUCTION_CONTRACT = process.env.REACT_APP_SMART_CONTRACT_AUCTION
const WETH_CONTRACT = process.env.REACT_APP_SMART_CONTRACT_WETH

const NFTDetail = props => {
    const { library, account, chainId } = useWeb3React()
    const history = useHistory()
    const [counter, setCounter] = useState(null)
    const [ownerAddress, setOwnerAddress] = useState(null)
    const [isCollectibleExist, setIsCollectibleExist] = useState(true)
    const [isStartTimeAfterCurrent, setIsStartTimeAfterCurrent] = useState(false)
    const [currentTime, setCurrentTime] = useState(moment().unix())
    const [isDescriptionOpen, setIsDescriptionOpen] = useState(false)
    //Common state
    const [isListForSaleModalVisible, setIsListForSaleModalVisible] = useState(false)
    const [isUserApproveWETH, setIsUserApproveWETH] = useState(false)
    const [isOpenCancelModal, setIsOpenCancelModal] = useState(false)
    //List OnSale State
    const [isOpenListOnSaleModal, setIsOpenListOnSaleModal] = useState(false)
    const [saleData, setSaleData] = useState()
    const [auctionData, setAuctionData] = useState()
    const [isOpenSaleStepModal, setIsOpenSaleStepModal] = useState(false)
    const [isOpenAuctionStepModal, setIsOpenAuctionStepModal] = useState(false)
    //Fixed Price state
    const [isCancelSellModalVisible, setIsCancelSellModalVisible] = useState(false)
    const [isBuyModalVisible, setIsBuyModalVisible] = useState(false)
    const [isOpenBuyProcessModal, setIsOpenBuyProcessModal] = useState(false)
    const [isCancelingSale, setIsCancelingSale] = useState(false)
    const [isDoneBuyProcessing, setIsDoneBuyProcessing] = useState(false)
    //Auction state
    const [isPlaceBidModalVisible, setIsPlaceBidModalVisible] = useState(false)
    const [isAcceptOfferModalVisible, setIsAcceptOfferModalVisible] = useState(false)

    const [err, setError] = useState()
    const { data } = useSelector(state => state.collectible)
    const { myProfile } = useSelector(state => state.user)
    const { nftId } = useParams()
    const minimumBid = Number(data?.metadata?.minimumBid)
    const previousBid = Number(data?.metadata?.highestBid)
    const dispatch = useDispatch()

    const getCollectibleInfo = useCallback(
        async nftId => {
            if (nftId) {
                dispatch(getNFTDetail(nftId))
                setIsCollectibleExist(true)
            } else {
                setIsCollectibleExist(false)
                setError(true)
            }
        },
        [dispatch]
    )
    useEffect(() => {
        if (counter) {
            const timer = setInterval(() => {
                if (counter - currentTime > 0) {
                    setCounter(counter - 1)
                }
                if (counter - currentTime === 0) {
                    if (!isStartTimeAfterCurrent) {
                        setCounter(0)
                        setCurrentTime(moment().unix())
                    } else {
                        setCounter(0)
                        setIsStartTimeAfterCurrent(false)
                    }
                }
            }, 1000)

            return () => {
                clearInterval(timer)
            }
        }
    }, [counter, isStartTimeAfterCurrent, currentTime])

    useEffect(() => {
        if (
            data?.metadata?.onSaleStatus == 2 &&
            data?.metadata?.expireDate &&
            data?.metadata?.expireDate - currentTime > 0
        ) {
            if (Number(data?.metadata?.startDate) > currentTime) {
                setIsStartTimeAfterCurrent(true)
                setCounter(Number(data?.metadata?.startDate))
                return
            }
            setIsStartTimeAfterCurrent(false)
            setCounter(Number(data?.metadata?.expireDate))
        } else {
            setCounter(null)
        }
    }, [currentTime, isStartTimeAfterCurrent, data])

    useEffect(() => {
        setCurrentTime(moment().unix())
    }, [isStartTimeAfterCurrent])

    useEffect(async () => {
        const collectionContract = await genCollectionContract(data?.collection?.address)
        const fixedPriceContract = await genFixedPriceContract(FIXED_PRICE_CONTRACT)
        const auctionsContract = await genAuctionsContract(AUCTION_CONTRACT)
        const ownerAddress = await collectionContract.ownerOf(data?.item_id)
        const saleInfo = await fixedPriceContract.sellInfo(data?.collection?.address, Number(data?.item_id))
        const auctionInfo = await auctionsContract.auctionInfo(data?.collection?.address, Number(data?.item_id))
        if (saleInfo?.creator == EMPTY_ADDRESS && auctionInfo?.creator == EMPTY_ADDRESS) {
            setOwnerAddress(ownerAddress)
        } else if (saleInfo?.creator != EMPTY_ADDRESS) {
            setOwnerAddress(saleInfo?.creator)
        } else {
            setOwnerAddress(auctionInfo?.creator)
        }
    }, [data])

    const renderTimeLeft = useCallback(() => {
        if (isStartTimeAfterCurrent) {
            if (counter !== 0) {
                return (
                    <div className="time-counter">
                        {getDiffUnixTime(counter, currentTime)[0]}:{getDiffUnixTime(counter, currentTime)[1]}:
                        {getDiffUnixTime(counter, currentTime)[2]}:{getDiffUnixTime(counter, currentTime)[3]}
                    </div>
                )
            }
        } else {
            if (counter !== 0) {
                return (
                    <div className="time-counter">
                        {getDiffUnixTime(counter, currentTime)[0]}:{getDiffUnixTime(counter, currentTime)[1]}:
                        {getDiffUnixTime(counter, currentTime)[2]}:{getDiffUnixTime(counter, currentTime)[3]}
                    </div>
                )
            }
        }
    }, [isStartTimeAfterCurrent, counter, currentTime])

    const displayCategory = categoryId => {
        switch (categoryId) {
            case '0':
                return 'Art'
            case '1':
                return 'Photo'
            case '2':
                return 'Sport'
            case '3':
                return 'Game'
            case '4':
                return 'GIFs'
            default:
                return
        }
    }

    const verified = [true, false]
    const additionalDummyData = useMemo(
        () => ({
            likes: Math.floor(Math.random() * 100) + 1,
            creator: {
                address: '0xE94219d3368C061618eF370E108b3795F5081C70',
                verified: verified[Math.floor(Math.random() * verified.length)]
            },
            owner: {
                address: '0xE94219d3368C061618eF370E108b3795F5081C70',
                verified: verified[Math.floor(Math.random() * verified.length)]
            },
            collection: {
                address: '0xE94219d3368C061618eF370E108b3795F5081C70',
                verified: verified[Math.floor(Math.random() * verified.length)]
            }
        }),
        [data]
    )

    const truncateDescription = data => {
        const description = data.substring(0, TRUNCATE_LETTER)
        return `${description}...`
    }

    useEffect(() => {
        getCollectibleInfo(nftId)
        return () => dispatch(clearDetail())
    }, [nftId])

    const checkForAuthentication = async () => {
        if (!myProfile?.data?.id) {
            return history.push({ pathname: '/connect', state: { from: 'collectible' } })
        }
        if (!isUserAuthenticated()) {
            dispatch(loginWallet(account.toLowerCase(), library, chainId))
        }
        if (isTokenExpired) {
            const refreshToken = localStorage.getItem('refreshToken')

            await userService.refreshToken({
                refresh_token: refreshToken
            })
        }
    }

    const onClickListOnSale = () => {
        checkForAuthentication()
        setIsOpenListOnSaleModal(true)
    }

    const onCloseListOnSaleModal = () => {
        setIsOpenListOnSaleModal(false)
    }
    const onOpenListOnSaleStepModal = data => {
        setIsOpenListOnSaleModal(false)
        setSaleData(data)
        setIsOpenSaleStepModal(true)
    }
    const onOpenListOnAuctionStepModal = data => {
        setIsOpenListOnSaleModal(false)
        setAuctionData(data)
        setIsOpenAuctionStepModal(true)
    }

    const onOpenBuyProcessModal = () => {
        setIsBuyModalVisible(false)
        setIsOpenBuyProcessModal(true)
    }

    const onClickBuy = async () => {
        checkForAuthentication()
        setIsBuyModalVisible(true)
    }

    const onClickPlaceBid = async () => {
        checkForAuthentication()
        setIsPlaceBidModalVisible(true)
    }

    const openBidSuccessModal = () => {
        setIsPlaceBidModalVisible(false)
        // setIsOpenBidSuccessModal(true)
    }

    const onClickCancelSale = async () => {
        checkForAuthentication()
        setIsOpenCancelModal(true)
    }

    const onConfirmCancelSale = async () => {
        setIsCancelingSale(true)
        // const [saleInfo] = await saleNftService.getBuyNftInfo(collectibleId)
        try {
            const fixedPriceContract = await genFixedPriceContract(FIXED_PRICE_CONTRACT)
            const contract = await fixedPriceContract.cancelSell(data?.collection?.address, data?.item_id)

            const result = await contract.wait(1)

            const cancelSaleData = {
                coin_buy: 'WETH',
                coin_buy_address: String(WETH_CONTRACT),
                decimal: 18,
                item_id: String(data?.id),
                price: data?.price
            }
            dispatch(updateNFTDetail(cancelSaleData))
            setIsOpenCancelModal(false)
            setIsCancelingSale(false)
            return message.success('Cancel sale successfully')
        } catch (error) {
            setIsOpenCancelModal(false)
            setIsCancelingSale(false)
            if (error?.code === 4001) {
                return message.error('You declined the action in your wallet.')
            }
            return message.error(
                'You cannot continue this action. Please re-load the page for the latest status updates.'
            )
        }
    }

    return (
        <DefaultLayout>
            {!err && isCollectibleExist && data ? (
                <div className="collectible-detail-container">
                    <div className="collectible-banner">
                        <div className="title">Collectible Detail</div>
                    </div>
                    <div className="collectible-detail-content">
                        <div className="collectible-information-container d-flex">
                            <div className="collectible-image">
                                <img src={data?.metadata?.imageURL} alt="collectible image" />
                            </div>
                            <div className="collectible-information">
                                <div className="collectible-name">{data?.name}</div>
                                <div className="collectible-attribute d-flex">
                                    <div className="collectible-category">{displayCategory(data?.category)}</div>
                                    <div className="collectible-like">
                                        <img className="heart-icon" src={PinkHeartIcon} alt="pink heart icon" />
                                        {additionalDummyData?.likes}
                                    </div>
                                </div>
                                <div className="collectible-description">
                                    {data?.description?.length != 0 ? (
                                        data?.description?.length > 120 ? (
                                            isDescriptionOpen ? (
                                                <div>
                                                    {data?.description}
                                                    <div
                                                        className="show-less"
                                                        onClick={() => setIsDescriptionOpen(false)}
                                                    >
                                                        Show less
                                                    </div>
                                                </div>
                                            ) : (
                                                <div>
                                                    {data?.description ? truncateDescription(data?.description) : ''}
                                                    <div
                                                        className="show-more"
                                                        onClick={() => setIsDescriptionOpen(true)}
                                                    >
                                                        Show more
                                                    </div>
                                                </div>
                                            )
                                        ) : (
                                            <div>{data?.description}</div>
                                        )
                                    ) : (
                                        ''
                                    )}
                                </div>
                                <Author data={data} dummyData={additionalDummyData} ownerAddress={ownerAddress} />
                                <div>
                                    {data?.metadata?.onSaleStatus != 0 ? (
                                        <div className="sale-container">
                                            <div className="collectible-price">
                                                {data?.metadata?.onSaleStatus === 2 ? (
                                                    <div className="price-container d-flex justify-content-space-between">
                                                        <div className="price-content">
                                                            <div className="title">
                                                                {isStartTimeAfterCurrent
                                                                    ? 'Auction Starts In'
                                                                    : counter < currentTime
                                                                    ? 'Auction Ended'
                                                                    : 'Auction Ends In'}
                                                            </div>
                                                            <div className="time-left">
                                                                {!isStartTimeAfterCurrent && counter > currentTime
                                                                    ? renderTimeLeft()
                                                                    : ''}
                                                            </div>
                                                        </div>
                                                        <div className="price-content">
                                                            <div className="title">
                                                                {data?.metadata?.highestBid
                                                                    ? 'Highest Bids'
                                                                    : 'Minimum Bids'}
                                                            </div>
                                                            <div className="highest-bids">
                                                                {data?.metadata?.highestBid
                                                                    ? data?.metadata?.highestBid
                                                                    : data?.metadata?.minimumBid}
                                                                <span>WETH</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="price-container">
                                                        <div className="price-content">
                                                            <div className="title">Fixed Price</div>
                                                            <div className="fixed-price">
                                                                {data?.metadata?.price}
                                                                <span>WETH</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                            {data?.metadata?.onSaleStatus === 2 ? (
                                                myProfile?.data?.address === ownerAddress ? (
                                                    data?.metadata?.expireDate > currentTime ? (
                                                        <CustomButton
                                                            className="buy-btn"
                                                            color={
                                                                data?.metadata?.highestBid ? 'pink-hover-blue' : 'pink'
                                                            }
                                                            shape="small-radius"
                                                            disabled={data?.metadata?.highestBid ? false : true}
                                                        >
                                                            Accept Offer
                                                        </CustomButton>
                                                    ) : (
                                                        <CustomButton
                                                            className="buy-btn"
                                                            color="pink-hover-blue"
                                                            shape="small-radius"
                                                        >
                                                            Cancel Auction
                                                        </CustomButton>
                                                    )
                                                ) : (
                                                    <CustomButton
                                                        className="buy-btn"
                                                        color="pink-hover-blue"
                                                        disabled={
                                                            !isStartTimeAfterCurrent &&
                                                            data?.metadata?.expireDate > currentTime
                                                                ? false
                                                                : true
                                                        }
                                                        onClick={onClickPlaceBid}
                                                    >
                                                        Place bid
                                                    </CustomButton>
                                                )
                                            ) : myProfile?.data?.address === ownerAddress ? (
                                                <CustomButton
                                                    className="buy-btn"
                                                    color="pink-hover-blue"
                                                    shape="small-radius"
                                                    onClick={onClickCancelSale}
                                                >
                                                    Cancel Sell
                                                </CustomButton>
                                            ) : (
                                                <CustomButton
                                                    className="buy-btn"
                                                    color="pink-hover-blue"
                                                    shape="small-radius"
                                                    onClick={onClickBuy}
                                                >
                                                    Buy
                                                </CustomButton>
                                            )}
                                        </div>
                                    ) : myProfile?.data?.address === ownerAddress ? (
                                        <CustomButton
                                            className="not-for-sale-btn"
                                            color="pink-hover-blue"
                                            shape="small-radius"
                                            onClick={onClickListOnSale}
                                        >
                                            List On Sale
                                        </CustomButton>
                                    ) : (
                                        <CustomButton
                                            className="not-for-sale-btn"
                                            color="pink"
                                            shape="small-radius"
                                            disabled={true}
                                        >
                                            Not For Sale
                                        </CustomButton>
                                    )}
                                </div>
                            </div>
                        </div>
                        <TradingHistory></TradingHistory>
                    </div>
                    {/* List on Sale Modal */}
                    <SaleModal
                        onCloseModal={onCloseListOnSaleModal}
                        isOpen={isOpenListOnSaleModal}
                        onOpenSaleStepModal={onOpenListOnSaleStepModal}
                        onOpenAuctionStepModal={onOpenListOnAuctionStepModal}
                    />
                    {isOpenSaleStepModal && (
                        <SaleStepModal
                            isOpen={isOpenSaleStepModal}
                            onClose={() => setIsOpenSaleStepModal(false)}
                            saleData={saleData}
                        />
                    )}
                    {/* {isOpenAuctionStepModal && (
                        <AuctionStepModal
                            isOpen={isOpenAuctionStepModal}
                            onClose={() => setIsOpenAuctionStepModal(false)}
                            auctionData={auctionData}
                        />
                    )} */}
                    <CancelModal
                        isOpen={isOpenCancelModal}
                        onConfirmCancelSale={onConfirmCancelSale}
                        isCanceling={isCancelingSale}
                        onCloseModal={() => setIsOpenCancelModal(false)}
                    />
                    <BuyModal
                        isOpen={isBuyModalVisible}
                        NFTData={data}
                        onCloseModal={() => setIsBuyModalVisible(false)}
                        onOpenBuyProcessModal={onOpenBuyProcessModal}
                    />
                    {isOpenBuyProcessModal && (
                        <ProcessBuyModal
                            isOpen={isOpenBuyProcessModal}
                            onCloseModal={() => setIsOpenBuyProcessModal(false)}
                            sellData={data}
                        />
                    )}

                    {isPlaceBidModalVisible && (
                        <BidModal
                            isOpen={isPlaceBidModalVisible}
                            onCloseModal={() => setIsPlaceBidModalVisible(false)}
                            openBidSuccessModal={openBidSuccessModal}
                            minimumBid={minimumBid}
                            previousBid={previousBid}
                            isApprovedWETH={isUserApproveWETH}
                            setIsApprovedWETH={value => setIsUserApproveWETH(value)}
                        />
                    )}
                    {/* <AcceptOfferModal isOpen={isAcceptOfferModalVisible}></AcceptOfferModal> */}
                    {/* 
                    {isOpenBidSuccessModal && (
                        <BidSuccessModal
                            isOpen={isOpenBidSuccessModal}
                            onCloseModal={() => setIsOpenBidSuccessModal(false)}
                        />
                    )}
                    <Prompt when={isCancelingSale} message="Are you sure you want to leave?" /> */}
                </div>
            ) : (
                <div className="not-found-container">
                    <img alt="not-found" src={NotFoundImage} />
                    <p>Something went wrong! Item not found</p>
                </div>
            )}
        </DefaultLayout>
    )
}

export default NFTDetail
