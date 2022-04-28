import Request from '../request'
import { customAxios } from '../request/customAxios'

const serverEndpoint = process.env.REACT_APP_SERVER_API_ENDPOINT

const saleNftService = {
    putOnSale: async data => {
        try {
            const accessToken = localStorage.getItem('accessToken')
            const res = await customAxios({
                method: 'post',
                url: `${serverEndpoint}/v1/sales`,
                data: data,
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            return [res, null]
        } catch (error) {
            return [null, error]
        }
    }
}

export default saleNftService
