import { collectibleActions } from '../constants/collectible'
import nftService from '../../service/nftService'
// import saleNftService from 'service/saleNftService'
import { message } from 'antd'
import { globalLoadingActions } from '../constants/globalLoading'

export const getNFTDetail = nftId => {
    return async dispatch => {
        dispatch({ type: collectibleActions.GET_NFT_DETAIL_LOADING })
        dispatch({
            type: globalLoadingActions.LOADING_MESSAGE
        })
        const [res, err] = await nftService.getNftDetail(nftId)
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
    // return async dispatch => {
    //     dispatch({ type: collectibleActions.UPDATE_NFT_DETAIL_LOADING })
    //     const [res, err] = await saleNftService.putOnSale(data)
    //     if (res) {
    //         dispatch({ type: collectibleActions.GET_NFT_DETAIL_LOADING })
    //         const [nftData, err] = await collectibleService.getDetail({ id: data.nftId })
    //         message.success('Put your NFT on market successfully')
    //         if (nftData) {
    //             dispatch({
    //                 type: collectibleActions.GET_NFT_DETAIL_SUCCESS,
    //                 payload: nftData
    //             })
    //         } else if (err) {
    //             dispatch({
    //                 type: collectibleActions.GET_NFT_DETAIL_FAILURE,
    //                 payload: err
    //             })
    //             message.error(err.message)
    //         }
    //     } else if (err) {
    //         dispatch({
    //             type: collectibleActions.UPDATE_NFT_DETAIL_FAILURE,
    //             payload: err
    //         })
    //         message.error(err.message)
    //     }
    // }
}

export const clearDetail = () => {
    return dispatch => {
        dispatch({ type: collectibleActions.CLEAR_NFT_DETAIL })
    }
}

export const getTradingHistory = param => {
    // return async dispatch => {
    //     dispatch({ type: collectibleActions.GET_TRADING_HISTORY_LOADING })
    //     const [history, err] = await saleNftService.getTradingHistory(param)
    //     if (history) {
    //         dispatch({
    //             type: collectibleActions.GET_TRADING_HISTORY_SUCCESS,
    //             payload: history
    //         })
    //     } else if (err) {
    //         dispatch({
    //             type: collectibleActions.GET_TRADING_HISTORY_FAILURE,
    //             payload: err
    //         })
    //     }
    // }
}
