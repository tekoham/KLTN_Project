import moment from "moment"

export const isTokenExpired = () => {
    const refreshToken = localStorage.getItem('refreshToken')
    const currentTime = moment().unix()
    return currentTime > refreshToken
}
