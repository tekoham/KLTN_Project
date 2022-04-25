import { ethers } from 'ethers'
import { BigNumber } from 'bignumber.js'

import { getSigner, convertPriceToBigDecimals } from './ether'

// import PaceArtStoreJSON from './abi/PaceArtStore.json'

const ETH_ADDRESS = process.env.REACT_APP_ETH_ADDRESS

const LOGIN_SIGN_MESSAGE = `{
  "publisher": "NFT_Auction",
  "onlySignOn": "https://uchain.duckdns.org"
}`

/**
 *
 * @param {any} library : {library} = useWeb3React()
 * @returns {Promise<string>}
 */
export const signMessage = async (msg, library) => {
    if (!library || !msg) throw new Error('invalid params')

    const signer = library.getSigner()
    const address = await signer.getAddress()
    // metamask will return obj `signature.result`, walletconnect will return signature as string
    const signature = await library.provider.send('personal_sign', [
        ethers.utils.hexlify(ethers.utils.toUtf8Bytes(msg)),
        address.toLowerCase()
    ])
    return signature?.result || signature
}
export const signWallet = library => {
    return signMessage(LOGIN_SIGN_MESSAGE, library)
}
