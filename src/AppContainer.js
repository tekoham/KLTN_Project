import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// import { userActions } from './store/constants/user'
// import { init } from './store/actions/init'
import { withRouter } from 'react-router-dom'
import BigNumber from 'bignumber.js'

// import {
//   openWrongNetworkModal,
//   closeWrongNetworkModal,
// } from './store/actions/modal'
// import { loginWallet } from 'store/actions/user'
import { useWeb3React } from '@web3-react/core'
// import { useEagerConnect } from 'hooks/useConnection'
import { utils } from 'ethers'

BigNumber.config({ EXPONENTIAL_AT: 50, RANGE: 500 })

// const ETHER_NETWORK_ID = Number(process.env.REACT_APP_NETWORK_ID)

const AppContainer = (props) => {
  // const dispatch = useDispatch()

  // const balance = useSelector((state) => state.user?.data?.ethBalance ?? '0')
  // const wethBalance = useSelector(
  //   (state) => state?.user?.data?.wethBalance ?? '0'
  // )
  // const paceToken = useSelector((state) => state?.user?.data?.paceToken ?? '0')
  // const usdtBalance = useSelector(
  //   (state) => state?.user?.data?.usdtBalance ?? '0'
  // )
  // const { account, connector, library, chainId } = useWeb3React()
  // const triedEager = useEagerConnect()

  // const isConnected =
  //   triedEager && Boolean(connector) && Boolean(library?.provider)

  // useEffect(() => {
  //   if (!account) return

  //   library.removeListener('block')
  //   const isRinkeby = Number(chainId) === ETHER_NETWORK_ID
  //   if (!isRinkeby) {
  //     dispatch(openWrongNetworkModal())
  //   }
  //   const onNewBlock = async () => {
  //     const rawBalance = await library.getBalance(account)

  //     const newBalance = utils.formatEther(rawBalance)

  //     //weth
  //     const [balanceWETH] = await checkWETHBalance(account)
  //     const newWETH = utils.formatEther(balanceWETH)

  //     //get pace token from metamask
  //     const [tokenClaimed] = await checkPaceTokenBalance(account)
  //     const newPaceToken = utils.formatEther(tokenClaimed)

  //     //usdt
  //     const [balanceUSDT] = await checkUsdtBalance(account)
  //     const newUSDT =
  //       balanceUSDT && convertBigNumberValueToNumber(balanceUSDT, 6)

  //     if (
  //       newBalance === balance &&
  //       newWETH === wethBalance &&
  //       newPaceToken === paceToken &&
  //       usdtBalance === newUSDT.toString()
  //     )
  //       return
  //     dispatch({
  //       type: userActions.UPDATE_BALANCE,
  //       payload: {
  //         ethBalance: newBalance,
  //         wethBalance: newWETH,
  //         paceToken: newPaceToken,
  //         usdtBalance: newUSDT.toString(),
  //       },
  //     })
  //   }
  //   library.on('block', onNewBlock)

  //   return () => {
  //     library.removeListener('block', onNewBlock)
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [account, balance])

  // useEffect(() => {
  //   // check is metamask installed
  //   if (
  //     typeof window.ethereum !== 'undefined' ||
  //     typeof window.web3 !== 'undefined'
  //   ) {
  //     window.ethereum._metamask.isUnlocked().then((res) => {
  //       if (!res) {
  //         localStorage.removeItem('accessToken')
  //         localStorage.removeItem('userId')
  //         dispatch({
  //           type: userActions.USER_LOGOUT_WALLET,
  //         })
  //       }
  //     })
  //   }
  //   if (!isConnected) {
  //     return
  //   }
  //   const onChangeAccount = ([account]) => {
  //     localStorage.removeItem('accessToken')
  //     localStorage.removeItem('userId')
  //     dispatch(loginWallet(account.toLowerCase(), library, chainId))
  //   }
  //   const onChangeNetwork = (chainId) => {
  //     // console.log('chainId', chainId)
  //     const isRinkeby = Number(chainId) === ETHER_NETWORK_ID
  //     const action = isRinkeby ? closeWrongNetworkModal : openWrongNetworkModal
  //     dispatch(action())
  //   }
  //   const onChangeNetworkChanged = (networkId) => {
  //     dispatch(loginWallet(account, library, chainId))
  //   }
  //   library.provider.on('accountsChanged', onChangeAccount)
  //   library.provider.on('chainChanged', onChangeNetwork)
  //   library.provider.on('networkChanged', onChangeNetworkChanged)
  //   return () => {
  //     library.provider?.removeListener('accountsChanged', onChangeAccount) // need func reference to remove correctly
  //     library.provider?.removeListener('chainChanged', onChangeNetwork) // need func reference to remove correctly
  //     library.provider?.removeListener('networkChanged', onChangeNetworkChanged)
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [isConnected, library])

  // useEffect(() => {
  //   dispatch(init())
  // }, [dispatch])

  return <div>{props.children}</div>
}

export default withRouter(AppContainer)
