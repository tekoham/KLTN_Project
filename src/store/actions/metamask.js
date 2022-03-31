import * as META_MASK from '../constants/metamask'

export const closeMetaMask = () => {
    return dispatch => {
        dispatch({ type: META_MASK.META_MASK_CLOSE })
    }
}

export const openMetaMask = () => {
    return dispatch => {
        dispatch({ type: META_MASK.META_MASK_OPEN })
    }
}
