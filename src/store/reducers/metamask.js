import * as META_MASK from '../constants/metamask'

const initialState = {
    open: false
}

const metamask = (state = initialState, action) => {
    switch (action.type) {
        case META_MASK.META_MASK_OPEN: {
            return { open: true }
        }
        case META_MASK.META_MASK_CLOSE: {
            return { open: false }
        }
        default: {
            return state
        }
    }
}

export default metamask
