import { collectibleActions } from '../constants/collectible'

const initialState = {
  data: {},
  tradingHistory: [],
  loading: false,
  loadingHistory: false,
  error: null,
  errorUpdateNft: null,
  errorHistory: null,
}

const collectibleReducer = (state = initialState, action) => {
  switch (action.type) {
    case collectibleActions.GET_NFT_DETAIL_LOADING: {
      return {
        ...state,
        loading: true,
        error: null,
      }
    }

    case collectibleActions.GET_NFT_DETAIL_SUCCESS: {
      return {
        ...state,
        data: { ...action.payload },
        loading: false,
      }
    }

    case collectibleActions.GET_NFT_DETAIL_FAILURE: {
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    }

    case collectibleActions.UPDATE_NFT_DETAIL_LOADING: {
      return {
        ...state,
        loading: true,
      }
    }

    case collectibleActions.UPDATE_NFT_DETAIL_SUCCESS: {
      return {
        ...state,
        data: action.payload,
        loading: false,
      }
    }

    case collectibleActions.UPDATE_NFT_DETAIL_FAILURE: {
      return {
        ...state,
        errorUpdateNft: action.payload,
        loading: false,
      }
    }
    case collectibleActions.CLEAR_NFT_DETAIL: {
      return {
        ...state,
        data: { id: state.data?.id },
        tradingHistory: [],
        offerList: [],
      }
    }
    case collectibleActions.GET_TRADING_HISTORY_LOADING: {
      return {
        ...state,
        loadingHistory: true,
      }
    }

    case collectibleActions.GET_TRADING_HISTORY_SUCCESS: {
      return {
        ...state,
        tradingHistory: action.payload,
        loadingHistory: false,
      }
    }

    case collectibleActions.GET_TRADING_HISTORY_FAILURE: {
      return {
        ...state,
        errorHistory: action.payload,
        loadingHistory: false,
      }
    }

    default: {
      return state
    }
  }
}

export default collectibleReducer
