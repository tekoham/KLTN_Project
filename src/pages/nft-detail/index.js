import React, { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import DefaultLayout from '../../components/layout/default-layout'
import { CustomButton } from '../../components/common'
import { getNFTDetail, clearDetail } from '../../store/actions/collectible'
import { getDiffUnixTime } from '../../utils/convertDate'
import moment from 'moment'
import { TradingHistory, Author } from './components'
import { useDispatch, useSelector } from 'react-redux'
import WhiteHeartIcon from '../../assest/icon/white_heart_icon.svg'
import PinkHeartIcon from '../../assest/icon/pink_heart_icon.svg'
import NotFoundImage from '../../assest/icon/not-found.svg'

import './styles.scss'

const TRUNCATE_LETTER = 240
const NFTDetail = props => {
    const [counter, setCounter] = useState(null)
    const [isCollectibleExist, setIsCollectibleExist] = useState(true)
    const [isStartTimeAfterCurrent, setIsStartTimeAfterCurrent] = useState(false)
    const [currentTime, setCurrentTime] = useState(moment().unix())
    const [isDescriptionOpen, setIsDescriptionOpen] = useState(false)
    const [err, setError] = useState()
    const { data } = useSelector(state => state.collectible)
    const { nftId } = useParams()
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
        console.log(counter)
        if (counter) {
            const timer = setInterval(() => {
                if (counter - currentTime > 0) {
                    setCounter(counter - 1)
                }
                if (counter - currentTime === 0) {
                    if (!isStartTimeAfterCurrent) {
                        setCounter(0)
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
    }, [currentTime, isStartTimeAfterCurrent])

    useEffect(() => {
        setCurrentTime(moment().unix())
    }, [isStartTimeAfterCurrent])

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
            case '1':
                return 'Art'
            case '2':
                return 'Photo'
            case '3':
                return 'Sport'
            case '4':
                return 'Game'
            case '5':
                return 'GIFs'
            default:
                return
        }
    }

    const verified = [true, false]
    const additionalDummyData = {
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
    }

    const truncateDescription = data => {
        const description = data.substring(0, TRUNCATE_LETTER)
        return `${description}...`
    }

    useEffect(() => {
        getCollectibleInfo(nftId)
        return () => dispatch(clearDetail())
    }, [nftId])

    return (
        <DefaultLayout>
            {!err && isCollectibleExist ? (
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
                                <Author data={data} dummyData={additionalDummyData} />
                                <div>
                                    {data?.metadata?.onSaleStatus != 0 ? (
                                        <div className="sale-container">
                                            <div className="collectible-price">
                                                {data?.metadata?.onSaleStatus === 2 ? (
                                                    <div className="price-container d-flex justify-content-space-between">
                                                        <div className="price-content">
                                                            <div className="title">
                                                                {isStartTimeAfterCurrent
                                                                    ? 'Auctin Starts In'
                                                                    : 'Auctin Ends In'}
                                                            </div>
                                                            <div className="time-left">{renderTimeLeft()}</div>
                                                        </div>
                                                        <div className="price-content">
                                                            <div className="title">Highest Bids</div>
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
                                            <CustomButton
                                                className="buy-btn"
                                                color="pink-hover-blue"
                                                shape="small-radius"
                                            >
                                                {data?.metadata?.onSaleStatus === 2 ? 'Place bid' : 'Buy'}
                                            </CustomButton>
                                        </div>
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
