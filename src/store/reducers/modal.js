import { modalAction } from '../constants/modal'

const initialState = {
  open: false,
  openModalWrongNetwork: false,
  openModalRejectSign: false,
  openUserClosedModal: false,
  openModalLockMetamask: false,
  openModalRejectConnect: false,
}

const modal = (state = initialState, action) => {
  switch (action.type) {
    case modalAction.TERM_OF_SERVICE_OPEN: {
      return { open: true }
    }
    case modalAction.TERM_OF_SERVICE_CLOSE: {
      return { open: false }
    }

    case modalAction.WRONG_NETWORK_OPEN: {
      return { ...state, openModalWrongNetwork: true }
    }
    case modalAction.WRONG_NETWORK_CLOSE: {
      return { ...state, openModalWrongNetwork: false }
    }

    case modalAction.REJECT_SIGN_MODAL_OPEN: {
      return { ...state, openModalRejectSign: true }
    }
    case modalAction.REJECT_SIGN_MODAL_CLOSE: {
      return { ...state, openModalRejectSign: false }
    }

    case modalAction.USER_CLOSED_MODAL_OPEN: {
      return { ...state, openUserClosedModal: true }
    }
    case modalAction.USER_CLOSED_MODAL_CLOSE: {
      return { ...state, openUserClosedModal: false }
    }

    case modalAction.LOCK_METAMASK_MODAL_OPEN: {
      return { ...state, openModalLockMetamask: true }
    }
    case modalAction.LOCK_METAMASK_MODAL_CLOSE: {
      return { ...state, openModalLockMetamask: false }
    }

    case modalAction.REJECT_CONNECT_MODAL_OPEN: {
      return { ...state, openModalRejectConnect: true }
    }
    case modalAction.REJECT_CONNECT_MODAL_CLOSE: {
      return { ...state, openModalRejectConnect: false }
    }

    default: {
      return state
    }
  }
}

export default modal
