import moment from 'moment'

export const isTokenExpired = () => {
    const expriDate = localStorage.getItem('expireDate')
    const currentTime = moment().unix()
    return currentTime > expriDate
}
