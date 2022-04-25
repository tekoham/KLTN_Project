import Request from '../request'

import { customAxios } from '../request/customAxios'

const serverEndpoint = process.env.REACT_APP_SERVER_API_ENDPOINT

const nftService = {
    createNft: async data => {
        try {
            const accessToken = localStorage.getItem('accessToken')
            const res = await customAxios({
                method: 'post',
                url: `${serverEndpoint}/v1/items`,
                data: data,
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            return [res.data, null]
        } catch (error) {
            return [null, error]
        }
    }
}

export default nftService
