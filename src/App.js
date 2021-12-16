import React from 'react'
import createRoutes from './routes'
import { PersistGate } from 'redux-persist/integration/react'
import { ApolloProvider } from '@apollo/client'
import { Provider } from 'react-redux'
import { client } from './request/graphql'
import configureStore from './store/configureStore'
import 'antd/dist/antd.css'

const App = () => {
  const { store, persistor } = configureStore()
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <PersistGate loading={null} persistor={persistor}>
          {createRoutes()}
        </PersistGate>
      </ApolloProvider>
    </Provider>
  )
}

export default App
