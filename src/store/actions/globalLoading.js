import { globalLoadingActions } from '../constants/globalLoading'

export const globalLoading = (msg) => {
  return {
    type: globalLoadingActions.LOADING_MESSAGE,
    payload: msg,
  }
}

export const globalLoadDone = (msg) => {
  return {
    type: globalLoadingActions.LOADING_DONE_MESSAGE,
    payload: msg,
  }
}
