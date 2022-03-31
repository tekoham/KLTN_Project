import { useRouter } from './useRouter'

import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { signWallet } from '../blockchain/utils'
import { useDispatch } from 'react-redux'
import { loginApi } from '../store/actions/login'
import { openErrorLockMetamaskModal } from '../store/actions/modal'

export const useAuth = ({ afterLogin: { redirect = '' } = {} } = {}) => {
  const { account, library } = useWeb3React()
  const dispatch = useDispatch()
  const router = useRouter()

  const login = useCallback(async () => {
    try {
      const signature = await signWallet(library)
      const credentials = {
        walletAddress: account,
        signature,
      }

      const res = await dispatch(loginApi(credentials))

      if (redirect) {
        router.push(redirect)
        return
      }

      return res
    } catch (err) {
      if (err.code === -32602) {
        dispatch(openErrorLockMetamaskModal())
      } else if (err.code === 4001) {
        message.error('You declined the action in your wallet.')
      } else {
        message.error('You declined the action in your wallet.')
      }
      return false
    }
  }, [account, dispatch, library, redirect, router])

  return [account, login]
}
