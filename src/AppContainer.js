import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { userActions } from './store/constants/user'

// import { init } from './store/actions/init'
import { withRouter } from 'react-router-dom'
import BigNumber from 'bignumber.js'
import { useEagerConnect } from './utils/useEagerConnect'

import { openWrongNetworkModal, closeWrongNetworkModal } from './store/actions/modal'
import { loginWallet } from './store/actions/user'
import { useWeb3React } from '@web3-react/core'
import { loginApiActions } from './store/constants/login'

BigNumber.config({ EXPONENTIAL_AT: 50, RANGE: 500 })

const ETHER_NETWORK_ID = Number(process.env.REACT_APP_NETWORK_ID)

const AppContainer = props => {
    const dispatch = useDispatch()

    const { account, connector, library, chainId } = useWeb3React()
    const triedEager = useEagerConnect()

    const isConnected = triedEager && Boolean(connector) && Boolean(library?.provider)

    useEffect(() => {
        if (!account) return

        const isGoerli = Number(chainId) === ETHER_NETWORK_ID

        if (!isGoerli) {
            dispatch(openWrongNetworkModal())
            dispatch({
                type: loginApiActions.CLOSE_LOADING_CONNECT
            })
        }
    }, [account])

    useEffect(() => {
        // check is metamask installed
        if (typeof window.ethereum !== 'undefined' || typeof window.web3 !== 'undefined') {
            window.ethereum._metamask.isUnlocked().then(res => {
                if (!res) {
                    localStorage.removeItem('accessToken')
                    localStorage.removeItem('userId')
                    localStorage.removeItem('userAddress')
                    localStorage.removeItem('refreshToken')
                    localStorage.removeItem('expireDate')
                    dispatch({
                        type: userActions.USER_LOGOUT_WALLET
                    })
                }
            })
        }
        if (!isConnected) {
            return
        }
        const onChangeAccount = ([account]) => {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('userId')
            localStorage.removeItem('userAddress')
            localStorage.removeItem('refreshToken')
            localStorage.removeItem('expireDate')
            dispatch({
                type: userActions.USER_LOGOUT_WALLET
            })
            dispatch(loginWallet(account.toLowerCase(), library, chainId))
        }
        const onChangeNetwork = chainId => {
            const isGoerli = Number(chainId) === ETHER_NETWORK_ID
            const action = isGoerli ? closeWrongNetworkModal : openWrongNetworkModal
            dispatch(action())
        }
        const onChangeNetworkChanged = networkId => {
            dispatch(loginWallet(account, library, chainId))
        }
        library.provider.on('accountsChanged', onChangeAccount)
        library.provider.on('chainChanged', onChangeNetwork)
        library.provider.on('networkChanged', onChangeNetworkChanged)
        return () => {
            library.provider?.removeListener('accountsChanged', onChangeAccount)
            library.provider?.removeListener('chainChanged', onChangeNetwork)
            library.provider?.removeListener('networkChanged', onChangeNetworkChanged)
        }
    }, [isConnected, library])

    // useEffect(() => {
    //   // dispatch(init())
    // }, [dispatch])

    return <div>{props.children}</div>
}

export default withRouter(AppContainer)
