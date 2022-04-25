import { userActions } from '../constants/user'

const initialState = {
  myProfile: {},
  currentUserProfileAddress: '',
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

    case userActions.USER_GET_PROFILE_LOADING: {
      return {
        ...state,
        loading: true,
      }
    }

    case userActions.USER_GET_PROFILE_SUCCESS: {
      return {
        ...state,
        myProfile: action.payload,
        loading: false,
      }
    }

    default: {
      return state
    }
  }
}

export default userReducer
