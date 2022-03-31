// import { ethers } from 'ethers'
// import { BigNumber } from 'bignumber.js'

// import {
//     genMainContractEther,
//     genPaceArtTokenContract,
//     genPaceTokenContract,
//     genRegistryContractEther,
//     genUsdtPaymentContract,
//     genWETHPaymentContract
// } from './instance'
// import { getSigner, convertPriceToBigDecimals } from './ether'
// import { LOGIN_SIGN_MESSAGE } from 'constants/index'

// import PaceArtStoreJSON from './abi/PaceArtStore.json'

// import { DECIMALS, PAYMENT_TOKEN, MARKET_RAW_FEE, MAX_INT } from 'constants/index'

// const PACEART_EXCHANGE_CONTRACT_ADDRESS = process.env.REACT_APP_SMART_CONTRACT_PACEART_EXCHANGE
// const ETH_ADDRESS = process.env.REACT_APP_ETH_ADDRESS
// const STATIC_TARGET_ADDRESS = process.env.REACT_APP_STATIC_TARGET_ADDRESS
// const RECIPIENT_FEE_ADDRESS = process.env.REACT_APP_RECIPIENT_FEE_ADDRESS
// const TOKEN_TRANSFER_PROXY_ADDRESS = process.env.REACT_APP_TOKEN_TRANSFER_PROXY_ADDRESS

// const NULL_ADDRESS = '0x0000000000000000000000000000000000000000'
// const HOW_TO_CALL = 0
// const FEE_METHOD = 1
// const STATIC_EXTRA_DATA = '0x00'
// const EXTRA = process.env.REACT_APP_EXTRA

// /**
//  *
//  * @param {any} library : {library} = useWeb3React()
//  * @returns {Promise<string>}
//  */
// export const signMessage = async (msg, library) => {
//     if (!library || !msg) throw new Error('invalid params')

//     const signer = library.getSigner()
//     const address = await signer.getAddress()
//     // metamask will return obj `signature.result`, walletconnect will return signature as string
//     const signature = await library.provider.send('personal_sign', [
//         ethers.utils.hexlify(ethers.utils.toUtf8Bytes(msg)),
//         address.toLowerCase()
//     ])
//     return signature?.result || signature
// }
// export const signWallet = library => {
//     return signMessage(LOGIN_SIGN_MESSAGE, library)
// }
