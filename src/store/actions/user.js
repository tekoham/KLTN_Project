import { userActions } from '../constants/user'
import { openRejectConnectModal, openRejectSignModal } from './modal'
import { utils } from 'ethers'
import userService from '../../service/userService'
// import collectionService from 'service/collectionService'
// import {
//   IMAGE_TYPE_UPLOAD,
//   SOCKET_EVENT_CHANGE_AVATAR,
//   SOCKET_EVENT_CHANGE_COVER,
//   SOCKET_EVENT_UPLOAD_COLLECTION_BANNER,
// } from 'constants/index'
import { loginApiActions } from '../../store/constants/login'
import { loginApi } from '../../store/actions/login'
import { convertBigNumberValueToNumber } from '../../blockchain/ether'
import { signWallet } from '../../blockchain/utils'
// import nftService from 'service/nftService'

const ETHER_NETWORK_ID = Number(process.env.REACT_APP_NETWORK_ID)

export const loginWallet = (account, library, chainId) => {
  return async (dispatch) => {
    dispatch({ type: userActions.USER_LOGIN_WALLET_LOADING })
    try {
      let ethBalance = await library.getBalance(account)
      ethBalance = convertBigNumberValueToNumber(ethBalance, 18)
      const currentTime = parseInt(Date.now() / 1000)

      const accessToken = localStorage.getItem('accessToken')
      const expireDate = localStorage.getItem('expireDate')

      if (!accessToken) {
        const signature = await signWallet(library)
        const _signature = signature.substring(2)
        const credentials = {
          signature: _signature,
        }

        await dispatch(loginApi(credentials))
      } else {
        if (currentTime > expireDate) {
          const signature = await signWallet(library)
          const _signature = signature.substring(2)
          const credentials = {
            signature: _signature,
          }

          await dispatch(loginApi(credentials))
        }
      }

      const userId = localStorage.getItem('userId')

      const [profile] = await userService.getUserInfo({
        userId: userId,
      })

      if (profile) {
        dispatch({
          type: userActions.USER_LOGIN_WALLET_SUCCESS,
          payload: {},
        })
        dispatch({
          type: userActions.USER_GET_PROFILE_SUCCESS,
          payload: {
            data: profile,
            ethBalance: ethBalance.toString(),
          },
        })
        dispatch({ type: loginApiActions.CLOSE_LOADING_CONNECT })

        return
      }
    } catch (err) {
      if (err.code === 4001) {
        dispatch(openRejectConnectModal())
      } else {
        dispatch({
          type: userActions.USER_LOGIN_WALLET_FAILURE,
          payload: err,
        })
      }
    }
  }
}
