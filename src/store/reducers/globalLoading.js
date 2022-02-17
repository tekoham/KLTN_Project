import { globalLoadingActions } from '../constants/globalLoading'

const initialState = {
  loading: false,
}

const globalLoadingReducer = (state = initialState, action) => {
  switch (action.type) {
    case globalLoadingActions.LOADING_MESSAGE: {
      return {
        loading: true,
      }
    }

    case globalLoadingActions.LOADING_DONE_MESSAGE: {
      return {
        loading: false,
      }
    }

    default: {
      return state
    }
  }
}

export default globalLoadingReducer
