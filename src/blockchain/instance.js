import { getContractInstanceEther } from './ether'

import AuctionsAbi from './abi/Auctions.json'
import FixedPriceAbi from './abi/FixedPrice.json'
import CollectionFactoryAbi from './abi/CollectionFactory.json'
import WETHAbi from './abi/WETH.json'

const FIXED_PRICE_CONTRACT_ADDRESS =
  process.env.REACT_APP_SMART_CONTRACT_FIXED_PRICE
const AUCTIONS_CONTRACT_ADDRESS = process.env.REACT_APP_SMART_CONTRACT_AUCTIONS
const COLLECTION_FACTORY_CONTRACT_ADDRESS =
  process.env.REACT_APP_SMART_CONTRACT_COLLECTION_FACTORY
const WETH_CONTRACT_ADDRESS = process.env.REACT_APP_SMART_CONTRACT_WETH

export const genFixedPriceContract = () => {
  return getContractInstanceEther(FixedPriceAbi, FIXED_PRICE_CONTRACT_ADDRESS)
}

export const genAuctionsContract = () => {
  return getContractInstanceEther(AuctionsAbi, AUCTIONS_CONTRACT_ADDRESS)
}

export const genCollectionFactoryContract = () => {
  return getContractInstanceEther(
    CollectionFactoryAbi,
    COLLECTION_FACTORY_CONTRACT_ADDRESS
  )
}

export const genWETHContractE = () => {
  return getContractInstanceEther(WETHAbi, WETH_CONTRACT_ADDRESS)
}
