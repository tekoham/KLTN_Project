import { collectionActions } from '../constants/collection'

const initialState = {
    isConfirmDeploy: false,
    isDeployPending: false,
    isDeploySuccess: false,
    isDeployFailed: false,
    createPending: false,
    createSuccess: false,
    createFailed: false,
    collection: {}
}

const collectionReducer = (state = initialState, action) => {
    switch (action.type) {
        case collectionActions.DEPLOY_PENDING: {
            return {
                ...state,
                isConfirmDeploy: true,
                isDeployPending: true
            }
        }

        case collectionActions.DEPLOY_SUCCESS: {
            return {
                ...state,
                isDeploySuccess: true,
                isDeployPending: false
            }
        }

        case collectionActions.DEPLOY_FAILED: {
            return {
                ...state,
                isDeployFailed: true
                // isDeployPending: false
            }
        }
        case collectionActions.CREATE_PENDING: {
            return {
                ...state,
                createPending: true
                // isDeployPending: false
            }
        }
        case collectionActions.CREATE_SUCCESS: {
            return {
                ...initialState,
                createSuccess: true
            }
        }

        case collectionActions.CREATE_FAILED: {
            return {
                ...state,
                createFailed: true
            }
        }
        case collectionActions.CREATE_COLLECTION_SUCCESS: {
            return {
                ...initialState
            }
        }
        case collectionActions.GET_COLLECTION_SUCCESS: {
            return {
                ...state,
                collection: { ...action.payload }
            }
        }
        default: {
            return state
        }
    }
}

export default collectionReducer
