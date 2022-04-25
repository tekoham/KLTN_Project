import Request from '../request'

import { customAxios } from '../request/customAxios'

const serverEndpoint = process.env.REACT_APP_SERVER_API_ENDPOINT

const collectionService = {
  postCollection: async (data) => {
    console.log(data)
    try {
      const response = await Request.post(
        `${serverEndpoint}/v1/collections`,
        data
      )
      return [response.data, null]
    } catch (error) {
      return [null, error]
    }
  },
}

export default collectionService
