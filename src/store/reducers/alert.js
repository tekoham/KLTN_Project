import { alertActions } from '../constants/alert'

const initialState = {
  type: '',
  message: '',
}

export const alertReducer = (state = initialState, action) => {
  switch (action.type) {
    case alertActions.SUCCESS_MESSAGE: {
      return {
        type: 'success',
        message: action.payload,
      }
    }

    case alertActions.WARNING_MESSAGE: {
      return {
        type: 'warning',
        message: action.payload,
      }
    }

    case alertActions.ERROR_MESSAGE: {
      return {
        type: 'error',
        message: action.payload,
      }
    }

    case alertActions.CLEAR_MESSAGE: {
      return {
        type: '',
        message: '',
      }
    }

    default: {
      return state
    }
  }
}
