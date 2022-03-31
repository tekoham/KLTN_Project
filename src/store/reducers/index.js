import { combineReducers } from 'redux'
import { alertReducer } from './alert'
import globalLoadingReducer from './globalLoading'
import loginApiReducer from './login'
import modalReducer from './modal'
import userReducer from './user'
import { userActions } from '../constants/user'

import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const userPersistConfig = {
  key: 'user',
  storage,
  blacklist: ['previewAvatar'],
}

const appReducer = combineReducers({
  user: persistReducer(userPersistConfig, userReducer),
  alert: alertReducer,
  modal: modalReducer,
  login: loginApiReducer,
  globalLoading: globalLoadingReducer,
})

const rootReducer = (state, action) => {
  if (action.type === userActions.USER_LOGOUT) {
    state = undefined
  }
  return appReducer(state, action)
}

export default rootReducer
