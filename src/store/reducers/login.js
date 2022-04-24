import { loginApiActions } from '../constants/login'

const initialState = {
  loginData: {},
  loading: false,
  error: '',
  isClickBtnCreate: false,
  isSignWithCreate: false,
  isLoadingConnectWallet: false,
}

const loginApiReducer = (state = initialState, action) => {
  switch (action.type) {
    case loginApiActions.LOGIN_LOADING: {
      return {
        ...state,
        loading: true,
      }
    }

    case loginApiActions.LOGIN_SUCCESS: {
      return {
        ...state,
        loginData: action.payload,
        loading: false,
      }
    }

    case loginApiActions.LOGIN_FAILURE: {
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    }
    case loginApiActions.CLICK_BTN_CREATE: {
      return {
        ...state,
        isClickBtnCreate: !state.isClickBtnCreate,
      }
    }
    case loginApiActions.SIGN_WITH_CREATE: {
      return {
        ...state,
        isSignWithCreate: !state.isSignWithCreate,
      }
    }
    case loginApiActions.OPEN_LOADING_CONNECT: {
      return {
        ...state,
        isLoadingConnectWallet: true,
      }
    }
    case loginApiActions.CLOSE_LOADING_CONNECT: {
      return {
        ...state,
        isLoadingConnectWallet: false,
      }
    }
    default: {
      return state
    }
  }
}

export default loginApiReducer
