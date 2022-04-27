import { loginApiActions } from '../constants/login'

import userService from '../../service/userService'

export const loginApi = credentials => {
    return async dispatch => {
        dispatch({ type: loginApiActions.LOGIN_LOADING })
        const [data, error] = await userService.login({
            ...credentials,
            signature: credentials?.signature?.toLowerCase()
        })

        if (data && data?.token) {
            localStorage.setItem('userId', data?.data?.id)
            localStorage.setItem('userAddress', data?.data?.address)
            localStorage.setItem('accessToken', data?.token?.token)
            localStorage.setItem('expireDate', data?.token?.expired_at)
            localStorage.setItem('refreshToken', data?.token?.refresh_token)

            dispatch({
                type: loginApiActions.LOGIN_SUCCESS,
                payload: data
            })
            return
        }

        if (error) {
            dispatch({
                type: loginApiActions.LOGIN_FAILURE,
                payload: error.response.status
            })
            dispatch({ type: loginApiActions.CLOSE_LOADING_CONNECT })
        }
    }
}
