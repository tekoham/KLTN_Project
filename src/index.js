import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { Web3ReactProvider } from '@web3-react/core'
import { providers } from 'ethers'

import './styles/common.scss'

import i18n from './translation/i18n'
import { I18nextProvider } from 'react-i18next'

function getLibrary(provider) {
  const library = new providers.Web3Provider(provider)
  library.pollingInterval = 15000
  return library
}

ReactDOM.render(
  <I18nextProvider i18n={i18n}>
    <Web3ReactProvider getLibrary={getLibrary}>
      <App />
    </Web3ReactProvider>
  </I18nextProvider>,
  document.getElementById('root')
)

reportWebVitals()
