import { userActions } from '../constants/user'
import { openRejectConnectModal } from './modal'
// import { utils } from 'ethers'
// import userService from 'service/userService'
// import collectionService from 'service/collectionService'
// import { socket } from 'config'
// import {
//   IMAGE_TYPE_UPLOAD,
//   SOCKET_EVENT_CHANGE_AVATAR,
//   SOCKET_EVENT_CHANGE_COVER,
//   SOCKET_EVENT_UPLOAD_COLLECTION_BANNER,
// } from 'constants/index'
// import { getUserInfoApi } from './publicUserInfo'
// import { loginApiActions } from 'store/constants/login'
import { convertBigNumberValueToNumber } from '../../blockchain/ether'
// import nftService from 'service/nftService'

const ETHER_NETWORK_ID = Number(process.env.REACT_APP_NETWORK_ID)

export const loginWallet = (account, library, chainId) => {
  return async (dispatch) => {
    dispatch({ type: userActions.USER_LOGIN_WALLET_LOADING })
    try {
      try {
        let ethBalance = await library.getBalance(account)
        ethBalance = convertBigNumberValueToNumber(ethBalance, 18)

        // const [profile, error] = await userService.getPublicUserInfo({
        //   walletAddress: account,
        // })

        // if (profile) {
        //   localStorage.setItem('userId', profile?.id)
        //   dispatch({
        //     type: userActions.USER_LOGIN_WALLET_SUCCESS,
        //     payload: {
        //       account: account,
        //       ethBalance: ethBalance.toString(),
        //     },
        //   })
        //   dispatch({
        //     type: userActions.USER_GET_PROFILE_SUCCESS,
        //     payload: profile,
        //   })
        //   dispatch({ type: loginApiActions.CLOSE_LOADING_CONNECT })
        //   if (Number(chainId) === ETHER_NETWORK_ID) {
        //     dispatch(closeTermOfService())
        //   }

        //   return
        // }

        // Temporary
        dispatch({
          type: userActions.USER_LOGIN_WALLET_SUCCESS,
          payload: {},
        })

        if (error.response.status === 404) {
          dispatch({
            type: userActions.USER_LOGOUT_WALLET,
          })
          // dispatch({ type: loginApiActions.CLOSE_LOADING_CONNECT })
        }
      } catch (error) {
        if (error.code === 4001) {
          dispatch(openRejectConnectModal())
        }
      }
    } catch (error) {
      dispatch({
        type: userActions.USER_LOGIN_WALLET_FAILURE,
        payload: error,
      })
    }
  }
}
