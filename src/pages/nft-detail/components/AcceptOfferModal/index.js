import React, { useState, useEffect } from 'react'
import './style.scss'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col, Checkbox, Modal, message } from 'antd'
import { CustomButton } from '../../../../components/common'
import LoadingIcon from '../../../../assest/icon/loading-icon.svg'
import { Link } from 'react-router-dom'
// import auctionService from '../../../../service/auctionService'
import BigNumber from 'bignumber.js'
import { convertBigNumberValueToNumber } from '../../../../blockchain/ether'
import { checkWETHBalance } from '../../../../blockchain/utils'
import { useWindowSize } from '../../../../utils/useWindowSize'
import { getNFTDetail } from '../../../../store/actions/collectible'

// import nftService from '../../../../service/nftService'

const AcceptOfferModal = ({
    onCloseModal,
    onOpenProcessModal,
    offerData,
    setIsDoneProcessing,
    onCloseProcessModal,
    onOpenCannotAccept
}) => {
    const { isMobile } = useWindowSize(576)
    const dispatch = useDispatch()
    // const { price, id, order } = offerData
    const {
        previewImage,
        fileExtension,
        smallImage,
        collection,
        name,
        royalty,
        tokenId,
        id: nftId,
        metadataUrl
    } = useSelector(state => state.collectible.data)
    const { myProfile } = useSelector(state => state?.user)
    const { onSaleStatus, type: typeOfCollectible } = useSelector(state => state?.collectible?.data)
    const [isCheckTerm, setIsCheckTerm] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [dataPlaceBid, setDataPlaceBid] = useState(null)

    const [imageUrlMetadata, setImageUrlMetadata] = useState(null)
    const [isDoneFetchImageUrlMetadata, setIsDoneFetchImageUrlMetadata] = useState(false)

    const onCheckTerm = () => {
        setIsCheckTerm(!isCheckTerm)
    }

    // useEffect(() => {
    //     const getBidInfo = async id => {
    //         const [bidInfo] = await auctionService.getBidInfoById(id)

    //         // if (!bidInfo || errorBidInfo) {
    //         //     return message.error(`Something went wrong: ${errorBidInfo}`)
    //         // }

    //         setDataPlaceBid(bidInfo)
    //     }

    //     if (id) {
    //         getBidInfo(id)
    //     }
    // }, [id])

    const onAccept = async () => {
        // if (onSaleStatus === SALE_TYPE.AUCTION && typeOfCollectible === SALE_TYPE.FIXED_PRICE) {
        //     onOpenCannotAccept()
        //     return onCloseModal()
        // }
        // setIsLoading(true)
        // const [bidInfo, errInfo] = await auctionService.getBidInfoById(id)
        // if (errInfo) {
        //     onCloseModal()
        //     return message.error('Something went wrong')
        // }
        // if (!bidInfo.id) {
        //     onCloseModal()
        //     return message.error(
        //         'You cannot continue this action. Please re-load the page for the latest status updates.'
        //     )
        // }
        // const [balanceRes] = await checkWETHBalance(order?.walletAddress)
        // if (balanceRes) {
        //     const balance = convertBigNumberValueToNumber(balanceRes, 18)
        //     if (balance < Number(price * (1 + MARKET_FEE))) {
        //         onCloseModal()
        //         return message.error("This bidder's account balance is insufficient")
        //     }
        // } else {
        //     onCloseModal()
        //     return message.error('Something went wrong')
        // }
        // dataPlaceBid.royalty = Number(royalty)
        // // let resAtomicMatch = null
        // let errorAtomicMatch = null
        // if (!tokenId) {
        //     const [result, error] = await handleAtomicMatchForAcceptBidAuction(dataPlaceBid)
        //     // resAtomicMatch = result
        //     errorAtomicMatch = error
        //     onOpenProcessModal(result?.hash, collection?.address, id)
        //     // console.log('resultresult::: ', result)
        //     try {
        //         await nftService.sendTxIdMatchReceive({
        //             transactionId: result?.hash,
        //             bidId: id,
        //             type: TRADING_TYPE.SALE
        //         })
        //         await result.wait(1)
        //         setIsDoneProcessing(true)
        //     } catch (err) {
        //         onCloseProcessModal()
        //         if (error?.code === ERROR_CODE_USER_DENIED_METAMASK) {
        //             onCloseModal()
        //             return message.error('You declined the action in your wallet.')
        //         }
        //         return message.error(
        //             'You cannot continue this action. Please re-load the page for the latest status updates.'
        //         )
        //     }
        // } else {
        //     const [result, error] = await handleAtomicMatchForAcceptBidAuctionSingleTransfer(dataPlaceBid)
        //     errorAtomicMatch = error
        //     onOpenProcessModal(result?.hash, collection?.address, id)
        //     try {
        //         await nftService.sendTxIdMatchReceive({
        //             transactionId: result?.hash,
        //             bidId: id,
        //             type: TRADING_TYPE.SALE
        //         })
        //         await result.wait(1)
        //         setIsDoneProcessing(true)
        //     } catch (err) {
        //         onCloseProcessModal()
        //         if (error?.code === ERROR_CODE_USER_DENIED_METAMASK) {
        //             onCloseModal()
        //             return message.error('You declined the action in your wallet.')
        //         }
        //         return message.error(
        //             'You cannot continue this action. Please re-load the page for the latest status updates.'
        //         )
        //     }
        // }
        // if (errorAtomicMatch) {
        //     if (errorAtomicMatch?.code === ERROR_CODE_USER_DENIED_METAMASK) {
        //         onCloseModal()
        //         return message.error(
        //             'You cannot continue this action. Please re-load the page for the latest status updates.'
        //         )
        //     } else {
        //         onCloseModal()
        //         return message.error(
        //             'You cannot continue this action. Please re-load the page for the latest status updates.'
        //         )
        //     }
        // }
    }

    const getDisplayImage = () => {
        // if (fileExtension === FILE_EXTENSION.MP4 || fileExtension === FILE_EXTENSION.MPEG) return previewImage
        // return smallImage
    }
    // useEffect(
    //     () => {
    //         socket.off('ACCEPT_BID').on('ACCEPT_BID', data => {
    //             if (data?.data?.user === profile?.id) {
    //                 onCloseProcessModal()
    //                 dispatch(getNFTDetail({ id: nftId, userId: profile?.id }))
    //                 dispatch(changePageOffer(1))
    //                 dispatch(changePageHistory(1))
    //                 dispatch(changeHistoryFilter(4))
    //                 dispatch(getTradingHistory({ nftId: nftId }))
    //                 dispatch(getOfferList({ nftId: nftId }))
    //             }
    //         })
    //     },
    //     []
    // )

    // useEffect(() => {
    //     const fetchImageUrlFromMetadata = async metadataUrl => {
    //         const fullMetaDataUrl = `${metadataUrl}/${tokenId}`

    //         const [result] = await nftService.getImageUrlFromMetadata(fullMetaDataUrl)
    //         setIsDoneFetchImageUrlMetadata(true)
    //         if (result) {
    //             setImageUrlMetadata(result)
    //         }
    //     }
    //     if (metadataUrl) {
    //         fetchImageUrlFromMetadata(metadataUrl)
    //     }
    // }, [metadataUrl])
    return (
        <Modal
            visible={true}
            onOk={onCloseModal}
            onCancel={onCloseModal}
            footer={null}
            closable={false}
            className={'custom-buy-modal'}
        >
            <div className="accept-modal-container">
                <p className="checkout-title">Accept Offer</p>
                <Col className="checkout-detail">
                    <div className="checkout-detail__header">
                        <p className="bold-text">Item</p>
                    </div>
                    {isMobile ? (
                        <Row align="center" justify="space-between">
                            <div>
                                <div className="nft-info">
                                    <img
                                        alt="asset"
                                        src={
                                            metadataUrl && isDoneFetchImageUrlMetadata
                                                ? imageUrlMetadata
                                                : `https://ipfs.io/ipfs/bafybeih6h7dnihnevjcjqcmchusmv2ebbqmt3bppolbhetiruimubkn4f4`
                                        }
                                        className="asset-img"
                                    />
                                    {/* {(smallImage || previewImage) &&
                                    (metadataUrl ? isDoneFetchImageUrlMetadata : !isDoneFetchImageUrlMetadata) ? (
                                        <img
                                            alt="asset"
                                            src={
                                                metadataUrl && isDoneFetchImageUrlMetadata
                                                    ? imageUrlMetadata
                                                    : `https://ipfs.io/ipfs/bafybeih6h7dnihnevjcjqcmchusmv2ebbqmt3bppolbhetiruimubkn4f4`
                                            }
                                            className="asset-img"
                                        />
                                    ) : (
                                        <div className="loading-img-placeholder">
                                            <img alt="loading" src={LoadingIcon} className="loading-icon" />
                                        </div>
                                    )} */}
                                    <div>
                                        <p className="collection-text">
                                            <span>Collection</span>
                                            <Link to={`/collection/${collection?.shortUrl}`}>Kien Collection</Link>
                                        </p>
                                        <p>Game</p>
                                    </div>
                                </div>

                                <p className="bold-text">Fees</p>
                            </div>

                            <div>
                                <p>{`1.5 WETH`}</p>
                            </div>
                        </Row>
                    ) : (
                        <div className="nft-info-mobile">
                            <div>
                                <img
                                    alt="asset"
                                    src={
                                        metadataUrl && isDoneFetchImageUrlMetadata
                                            ? imageUrlMetadata
                                            : `https://ipfs.io/ipfs/bafybeih6h7dnihnevjcjqcmchusmv2ebbqmt3bppolbhetiruimubkn4f4`
                                    }
                                    className="asset-img"
                                />
                                {/* {(smallImage || previewImage) &&
                                (metadataUrl ? isDoneFetchImageUrlMetadata : !isDoneFetchImageUrlMetadata) ? (
                                    <img
                                        alt="asset"
                                        src={
                                            metadataUrl && isDoneFetchImageUrlMetadata
                                                ? imageUrlMetadata
                                                : `https://ipfs.io/ipfs/bafybeih6h7dnihnevjcjqcmchusmv2ebbqmt3bppolbhetiruimubkn4f4`
                                        }
                                        className="asset-img"
                                    />
                                ) : (
                                    <div className="loading-img-placeholder">
                                        <img alt="loading" src={LoadingIcon} className="loading-icon" />
                                    </div>
                                )} */}
                                <div>
                                    <p>{`${name}`}</p>
                                    <div>
                                        <p className="collection-text">
                                            <span>Collection</span>
                                            <Link to={`/collection/${collection?.shortUrl}`}>{collection?.name}</Link>
                                        </p>
                                        <p>
                                            <span>{`1.5 WETH`}</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <p className="bold-text">Fees</p>
                        </div>
                    )}
                    <Row align="center" justify="space-between">
                        <p className="bold-text">Total earnings</p>
                        <div>
                            <p>{`1.5 WETH`}</p>
                        </div>
                    </Row>
                    <Row align="center" justify="space-between">
                        <div className="term-of-service">
                            <Checkbox checked={isCheckTerm} onChange={onCheckTerm} />
                            <span className="term-of-service-text">
                                <span>By checking this box, I agree to CAS NFT</span>
                            </span>
                        </div>
                    </Row>
                </Col>

                <CustomButton color="pink-hover-blue" disabled={!isCheckTerm} onClick={onAccept} loading={isLoading}>
                    <span>Accept</span>
                </CustomButton>
            </div>
        </Modal>
    )
}

export default AcceptOfferModal
