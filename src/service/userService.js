import Request from '../request'

import { customAxios } from '../request/customAxios'

const serverEndpoint = process.env.REACT_APP_SERVER_API_ENDPOINT

const userService = {
  login: async (credentials) => {
    try {
      const response = await Request.post(
        `${serverEndpoint}/v1/users/login`,
        credentials
      )
      return [response.data, null]
    } catch (error) {
      return [null, error]
    }
  },

  editUserProfile: async (data) => {},
  getUserInfo: async (queryParam) => {
    try {
      const response = await Request.get(
        `${serverEndpoint}/v1/users/profile/${queryParam?.userId}`
      )
      return [response.data, null]
    } catch (error) {
      return [null, error]
    }
  },
  uploadAvatar: async ({ userId, imgFile }) => {},
}

export default userService
