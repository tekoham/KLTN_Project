import axios from 'axios'

class Request {
  instance
  constructor() {
    const instance = axios.create({
      baseURL: process.env.REACT_APP_API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })

    instance.interceptors.request.use(
      async (config) => {
        const accessToken = localStorage.getItem('accessToken')
        // if (accessToken) {
        //     config.headers['Authorization'] = `Bearer ${accessToken}`
        // }

        return config
      },
      (error) => {
        Promise.reject(error)
      }
    )

    this.instance = instance
  }

  get = (url, params) => {
    return this.instance.get(url, { params })
  }

  post = (url, data) => {
    return this.instance.post(url, data)
  }

  put = (url, data) => {
    return this.instance.put(url, data)
  }

  patch = (url, data) => {
    return this.instance.patch(url, data)
  }

  delete = (url) => {
    return this.instance.delete(url)
  }
}

export default new Request()
