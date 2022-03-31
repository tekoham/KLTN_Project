import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { Web3ReactProvider } from '@web3-react/core'
import { providers } from 'ethers'
import { MoralisProvider } from 'react-moralis'

import './styles/common.scss'

function getLibrary(provider) {
  const library = new providers.Web3Provider(provider)
  library.pollingInterval = 15000
  return library
}

const SERVER_URL = process.env.REACT_APP_SERVER_URL
const APP_ID = process.env.REACT_APP_APP_ID

ReactDOM.render(
  <Web3ReactProvider getLibrary={getLibrary}>
    <MoralisProvider serverUrl={SERVER_URL} appId={APP_ID}>
      <App />
    </MoralisProvider>
  </Web3ReactProvider>,
  document.getElementById('root')
)

reportWebVitals()
