import { modalAction } from '../constants/modal'

export const closeTermOfService = () => {
  return (dispatch) => {
    dispatch({ type: modalAction.TERM_OF_SERVICE_CLOSE })
  }
}

export const openTermOfService = () => {
  return (dispatch) => {
    dispatch({ type: modalAction.TERM_OF_SERVICE_OPEN })
  }
}

export const closeWrongNetworkModal = () => {
  return (dispatch) => {
    dispatch({ type: modalAction.WRONG_NETWORK_CLOSE })
  }
}

export const openWrongNetworkModal = () => {
  return (dispatch) => {
    dispatch({ type: modalAction.WRONG_NETWORK_OPEN })
  }
}

export const closeRejectSignModal = () => {
  return (dispatch) => {
    dispatch({ type: modalAction.REJECT_SIGN_MODAL_CLOSE })
  }
}

export const openRejectSignModal = () => {
  return (dispatch) => {
    dispatch({ type: modalAction.REJECT_SIGN_MODAL_OPEN })
  }
}

export const closeUserClosedModal = () => {
  return (dispatch) => {
    dispatch({ type: modalAction.USER_CLOSED_MODAL_CLOSE })
  }
}

export const openUserClosedModal = () => {
  return (dispatch) => {
    dispatch({ type: modalAction.USER_CLOSED_MODAL_OPEN })
  }
}

export const openErrorLockMetamaskModal = () => {
  return (dispatch) => {
    dispatch({ type: modalAction.LOCK_METAMASK_MODAL_OPEN })
  }
}

export const closeErrorLockMetamaskModal = () => {
  return (dispatch) => {
    dispatch({ type: modalAction.LOCK_METAMASK_MODAL_CLOSE })
  }
}

export const openRejectConnectModal = () => {
  return (dispatch) => {
    dispatch({ type: modalAction.REJECT_CONNECT_MODAL_OPEN })
  }
}

export const closeRejectConnectModal = () => {
  return (dispatch) => {
    dispatch({ type: modalAction.REJECT_CONNECT_MODAL_CLOSE })
  }
}
