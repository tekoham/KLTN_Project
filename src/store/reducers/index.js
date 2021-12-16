import { combineReducers } from 'redux'
import { alertReducer } from './alert'

import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const userPersistConfig = {
  key: 'user',
  storage,
  blacklist: ['previewAvatar'],
}

const appReducer = combineReducers({
  alert: alertReducer,
})

const rootReducer = (state, action) => {
  //   if (action.type === userActions.USER_LOGOUT) {
  //     state = undefined
  //   }
  return appReducer(state, action)
}

export default rootReducer
