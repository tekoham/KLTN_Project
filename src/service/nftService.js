import Request from '../request'

import { customAxios } from '../request/customAxios'

const tatumEndpoint = process.env.REACT_APP_TATUM_API_ENDPOINT
const tatumAPIKey = process.env.REACT_APP_TATUM_API_KEY

const nftService = {
  uploadAvatar: async ({ imgFile }) => {
    // const accessToken = localStorage.getItem('accessToken')
    console.log(`${tatumAPIKey}`)
    console.log(imgFile)
    const formData = new FormData()
    formData.append('file', imgFile)
    const config = {
      headers: {
        // Authorization: `${accessToken}`,
        'x-api-key': `${tatumAPIKey}`,
        'content-type': 'multipart/form-data',
      },
    }
    try {
      const response = await customAxios({
        method: 'post',
        url: `${tatumEndpoint}`,
        headers: config.headers,
        data: formData,
      })
      return [response, null]
    } catch (error) {
      return [null, error]
    }
  },
}

export default nftService
