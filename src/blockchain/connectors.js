import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'

const INFURA_API_KEY = process.env.REACT_APP_INFURA_API_KEY

export const injected = new InjectedConnector({ supportedChainIds: [1, 4, 3, 5, 42] })

export const walletconnect = new WalletConnectConnector({
    supportedChainIds: [1, 4, 3, 5, 42],
    // if errors, try to replace my `infuraId` with yours
    infuraId: INFURA_API_KEY,
    pollingInterval: 15000,
    bridge: 'https://uniswap.bridge.walletconnect.org'
})
