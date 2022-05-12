import { collectibleActions } from '../constants/collectible'
import nftService from '../../service/nftService'
import saleNftService from '../../service/saleNftService'
import { message } from 'antd'
import { globalLoadingActions } from '../constants/globalLoading'
import { genFixedPriceContract, genAuctionsContract } from '../../blockchain/instance'
import { convertBigNumberValueToNumber } from '../../blockchain/ether'

const EMPTY_ADDRESS = 0x0000000000000000000000000000000000000000
const FIXED_PRICE_CONTRACT = process.env.REACT_APP_SMART_CONTRACT_FIXED_PRICE
const AUCTION_CONTRACT = process.env.REACT_APP_SMART_CONTRACT_AUCTION

export const getNFTDetail = nftId => {
    return async dispatch => {
        dispatch({ type: collectibleActions.GET_NFT_DETAIL_LOADING })
        const fixedPriceContract = await genFixedPriceContract(FIXED_PRICE_CONTRACT)
        const auctionsContract = await genAuctionsContract(AUCTION_CONTRACT)
        dispatch({
            type: globalLoadingActions.LOADING_MESSAGE
        })
        const [res, err] = await nftService.getNftDetail(nftId)
        const saleInfo = await fixedPriceContract.sellInfo(res?.collection?.address, Number(res?.item_id))
        const auctionInfo = await auctionsContract.auctionInfo(res?.collection?.address, Number(res?.item_id))
        if (saleInfo?.creator == EMPTY_ADDRESS && auctionInfo?.creator == EMPTY_ADDRESS) {
            res.metadata.onSaleStatus = 0
        } else if (saleInfo?.creator != EMPTY_ADDRESS) {
            res.metadata.onSaleStatus = 1
            res.metadata.price = convertBigNumberValueToNumber(saleInfo?.price, 18)
        } else {
            res.metadata.onSaleStatus = 2
            res.metadata.start_price = auctionInfo?.start_price
            res.metadata.highest_bidder = auctionInfo?.highest_bidder
            res.metadata.ended = auctionInfo?.ended
        }
        dispatch({
            type: globalLoadingActions.LOADING_DONE_MESSAGE
        })
        if (res) {
            dispatch({
                type: collectibleActions.GET_NFT_DETAIL_SUCCESS,
                payload: res
            })
        } else if (err) {
            dispatch({
                type: collectibleActions.GET_NFT_DETAIL_FAILURE,
                payload: err
            })
            message.error(err?.message)
        }
    }
}

export const updateNFTDetail = data => {
    return async dispatch => {
        dispatch({ type: collectibleActions.UPDATE_NFT_DETAIL_LOADING })
        // const [res, err] = await saleNftService.putOnSale(data)
        const fixedPriceContract = await genFixedPriceContract(FIXED_PRICE_CONTRACT)
        const auctionsContract = await genAuctionsContract(AUCTION_CONTRACT)

        // if (res) {
        dispatch({ type: collectibleActions.GET_NFT_DETAIL_LOADING })
        const [nftData, err] = await nftService.getNftDetail(data?.item_id)
        const saleInfo = await fixedPriceContract.sellInfo(res?.collection?.address, Number(res?.item_id))
        const auctionInfo = await auctionsContract.auctionInfo(res?.collection?.address, Number(res?.item_id))
        if (saleInfo?.creator == EMPTY_ADDRESS && auctionInfo?.creator == EMPTY_ADDRESS) {
            res.metadata.onSaleStatus = 0
        } else if (saleInfo?.creator != EMPTY_ADDRESS) {
            res.metadata.onSaleStatus = 1
            res.metadata.price = saleInfo?.price
        } else {
            res.metadata.onSaleStatus = 2
            res.metadata.start_price = auctionInfo?.start_price
            res.metadata.highest_bidder = auctionInfo?.highest_bidder
            res.metadata.ended = auctionInfo?.ended
        }
        if (nftData) {
            dispatch({
                type: collectibleActions.GET_NFT_DETAIL_SUCCESS,
                payload: nftData
            })
        } else if (err) {
            dispatch({
                type: collectibleActions.GET_NFT_DETAIL_FAILURE,
                payload: err
            })
            message.error(err.message)
        }
        // } else if (err) {
        //     dispatch({
        //         type: collectibleActions.UPDATE_NFT_DETAIL_FAILURE,
        //         payload: err
        //     })
        //     message.error(err.message)
        // }
    }
}

export const clearDetail = () => {
    return dispatch => {
        dispatch({ type: collectibleActions.CLEAR_NFT_DETAIL })
    }
}
