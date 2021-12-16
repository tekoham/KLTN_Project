import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { composeWithDevTools } from 'redux-devtools-extension'
// import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import rootReducer from './reducers'

const initialState = {}

const middlewares = [thunk]

// if (process.env.NODE_ENV !== 'production') {
//     middlewares.push(createLogger())
// }

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'],
  blacklist: ['user'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const configureStore = () => {
  const store = createStore(
    persistedReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middlewares))
  )
  const persistor = persistStore(store)

  return {
    store,
    persistor,
  }
}

export default configureStore
