import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { Web3ReactProvider } from '@web3-react/core'
import { providers } from 'ethers'

import './styles/common.scss'

function getLibrary(provider) {
  const library = new providers.Web3Provider(provider)
  library.pollingInterval = 15000
  return library
}

ReactDOM.render(
  <Web3ReactProvider getLibrary={getLibrary}>
    <App />
  </Web3ReactProvider>,
  document.getElementById('root')
)

reportWebVitals()
