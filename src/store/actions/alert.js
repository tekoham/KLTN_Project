import { alertActions } from '../constants/alert'

export const alertSuccess = (msg) => {
  return {
    type: alertActions.SUCCESS_MESSAGE,
    payload: msg,
  }
}

export const alertWarning = (msg) => {
  return {
    type: alertActions.WARNING_MESSAGE,
    payload: msg,
  }
}

export const alertFailure = (msg) => {
  return {
    type: alertActions.ERROR_MESSAGE,
    payload: msg,
  }
}

export const clearAlert = () => {
  return {
    type: alertActions.CLEAR_MESSAGE,
  }
}
