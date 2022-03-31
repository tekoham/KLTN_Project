export const isUserAuthenticated = () => {
    const accessToken = localStorage.getItem('accessToken')
    return accessToken ? true : false
}
