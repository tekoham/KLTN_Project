import Request from '../request'

import { customAxios } from '../request/customAxios'

const tatumEndpoint = process.env.REACT_APP_TATUM_API_ENDPOINT
const tatumAPIKey = process.env.REACT_APP_TATUM_API_KEY
const prefix = 'https://ipfs.io/ipfs/'

const uploadImageService = {
    uploadImageIPFS: async ({ imgFile }) => {
        const formData = new FormData()
        let imageLink = prefix
        formData.append('file', imgFile)
        const config = {
            headers: {
                'x-api-key': `${tatumAPIKey}`,
                'content-type': 'multipart/form-data'
            }
        }
        try {
            const response = await customAxios({
                method: 'post',
                url: `${tatumEndpoint}`,
                headers: config.headers,
                data: formData
            })
            if (response) {
                imageLink += response?.data?.ipfsHash
            }
            return [imageLink, null]
        } catch (error) {
            return [null, error]
        }
    }
}

export default uploadImageService
