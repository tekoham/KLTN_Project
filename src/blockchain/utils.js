import { ethers } from 'ethers'
import { BigNumber } from 'bignumber.js'

import { getSigner, convertPriceToBigDecimals } from './ether'
import { genWETHContract } from './instance'

const ETH_ADDRESS = process.env.REACT_APP_ETH_ADDRESS

const LOGIN_SIGN_MESSAGE = `{
  "publisher": "NFT_Auction",
  "onlySignOn": "https://uchain.duckdns.org"
}`

const MAX_INT = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'

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

// Get user's WETH balance
export const checkWETHBalance = async walletAddress => {
    try {
        const wethPaymentTokenContract = await genWETHContract()
        const balance = await wethPaymentTokenContract.balanceOf(walletAddress)

        return [balance, null]
    } catch (error) {
        return [null, error]
    }
}

// Request user approve WETH token to be able to transfer
export const handleUserApproveWETH = async contractAddress => {
    try {
        const wethTokenContract = await genWETHContract()

        const approve = await wethTokenContract.approve(contractAddress, MAX_INT)

        const res = await approve.wait(1)

        return [res, null]
    } catch (error) {
        return [null, error]
    }
}

// Checking whether user approved WETH token or not
export const isUserApprovedWETH = async ({ userAddress, contractAddress }) => {
    try {
        const wethTokenContract = await genWETHContract()

        const allowance = await wethTokenContract.allowance(userAddress, contractAddress)

        if (allowance.toString() !== '0') {
            return true
        }
        return false
    } catch (error) {
        return false
    }
}
