import { userActions } from '../constants/user'

const initialState = {
  data: {},
  profile: {},
  currentUserProfile: {
    address: '',
    customUrl: '',
  },
  loading: false,
  error: '',
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case userActions.USER_LOGIN_WALLET_LOADING: {
      return {
        ...state,
        loading: true,
      }
    }

    case userActions.USER_LOGIN_WALLET_SUCCESS: {
      return {
        ...state,
        data: action.payload,
        // profile: {},
        loading: false,
      }
    }

    case userActions.USER_LOGIN_WALLET_FAILURE: {
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    }

    case userActions.USER_LOGOUT_WALLET: {
      return {
        ...initialState,
      }
    }

    default: {
      return state
    }
  }
}

export default userReducer
