import { loginApiActions } from '../constants/login'

// import userService from 'service/userService'

export const loginApi = (credentials) => {
  return async (dispatch) => {
    dispatch({ type: loginApiActions.LOGIN_LOADING })
    dispatch({
      type: loginApiActions.LOGIN_SUCCESS,
      payload: '',
    })

    // const [data, error] = await userService.login({
    //     ...credentials,
    //     walletAddress: credentials?.walletAddress?.toLowerCase()
    // })

    // if (data && data?.access_token) {
    //     localStorage.setItem('accessToken', data?.access_token)
    //     localStorage.setItem('userId', data?.userId)

    //     dispatch({
    //         type: loginApiActions.LOGIN_SUCCESS,
    //         payload: data
    //     })
    //     return
    // }

    // if (error) {
    //     dispatch({
    //         type: loginApiActions.LOGIN_FAILURE,
    //         payload: error.response.status
    //     })
    // }
  }
}
