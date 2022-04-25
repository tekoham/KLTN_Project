import { ethers, providers, utils } from 'ethers'
import { injected, walletconnect } from './connectors'

export const getProvider = async () => {
    // TODO: find a better to detect what user connect by
    // hint: redux
    const isWc = 'walletconnect' in localStorage

    const provider = await (isWc ? walletconnect : injected).getProvider()

    return new providers.Web3Provider(provider)
}

export const getContractInstanceEther = async (ABIContract, contractAddress) => {
    const provider = await getProvider()
    const signer = provider.getSigner()

    return new ethers.Contract(contractAddress, ABIContract, signer)
}

export const getSigner = async () => {
    const provider = await getProvider()

    return provider.getSigner()
}

export const convertPriceToBigDecimals = (price, decimal) => {
    const res = ethers.utils.parseUnits(price.toString(), decimal)
    return res.toString()
}

export const convertBigNumberValueToNumber = (weiBalance, decimal) => {
    const res = ethers.utils.formatUnits(weiBalance, decimal).toString()
    return Number(res)
}

/**
 *
 * @param {string} address
 * @param {'wei' | 'kwei' | 'mwei' | 'gwei' | 'szabo' | 'finney' | 'ether'} unit
 * @returns
 */
export const getBalance = async (address, unit = 'ether', provider = null) => {
    if (!provider) {
        provider = await getProvider()
    }

    const rawBalance = await provider.getBalance(address)

    return utils.formatUnits(rawBalance, unit)
}
