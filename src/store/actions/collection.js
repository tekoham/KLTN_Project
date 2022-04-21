import { collectionActions } from '../constants/collection'

export const deploySuccess = () => {
    return {
        type: collectionActions.DEPLOY_SUCCESS
    }
}

export const deployFailed = () => {
    return {
        type: collectionActions.DEPLOY_FAILED
    }
}

export const deployPending = () => {
    return {
        type: collectionActions.DEPLOY_PENDING
    }
}
export const createPending = () => {
    return {
        type: collectionActions.CREATE_PENDING
    }
}
export const createSuccess = () => {
    return {
        type: collectionActions.CREATE_SUCCESS
    }
}
export const createFailed = () => {
    return {
        type: collectionActions.CREATE_FAILED
    }
}
export const createCollectionSuccess = () => {
    return {
        type: collectionActions.CREATE_COLLECTION_SUCCESS
    }
}

export const getCollectionSuccess = ({ collectionData }) => {
    return async dispatch => {
        dispatch({
            type: collectionActions.GET_COLLECTION_SUCCESS,
            payload: collectionData
        })
    }
}
