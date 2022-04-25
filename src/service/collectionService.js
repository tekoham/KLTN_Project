import Request from '../request'

import { customAxios } from '../request/customAxios'

const serverEndpoint = process.env.REACT_APP_SERVER_API_ENDPOINT

const collectionService = {
    postCollection: async data => {
        try {
            const accessToken = localStorage.getItem('accessToken')
            const res = await customAxios({
                method: 'post',
                url: `${serverEndpoint}/v1/collections`,
                data: data,
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            return [res.data, null]
        } catch (error) {
            return [null, error]
        }
    },

    getListOfCollection: async ({ name = '', user_id, page = 1, page_size = 999 }) => {
        try {
            const response = await Request.get(
                `${serverEndpoint}/v1/collections/query/list?name=${name}&creator_id=${user_id}&page=${page}&page_size=${page_size}`
            )
            return [response.data, null]
        } catch (error) {
            return [null, error]
        }
    },

    getCollectionDetail: async collectionId => {
        try {
            const response = await Request.get(`${serverEndpoint}/v1/collections/${collectionId}`)
            return [response.data, null]
        } catch (error) {
            return [null, error]
        }
    }
}

export default collectionService
