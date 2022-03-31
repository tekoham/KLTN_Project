import { getContractInstanceEther } from './ether'

import PaceArtExchangeAbi from './abi/PaceArtExchange.json'
import registryAbi from './abi/Registry.json'

const PACEART_EXCHANGE_CONTRACT_ADDRESS =
  process.env.REACT_APP_SMART_CONTRACT_PACEART_EXCHANGE
const REGISTRY_CONTRACT_ADDRESS = process.env.REACT_APP_SMART_CONTRACT_REGISTRY

export const genMainContractEther = () => {
  return getContractInstanceEther(
    PaceArtExchangeAbi,
    PACEART_EXCHANGE_CONTRACT_ADDRESS
  )
}

export const genRegistryContractEther = () => {
  return getContractInstanceEther(registryAbi, REGISTRY_CONTRACT_ADDRESS)
}
