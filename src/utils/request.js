import axios from 'axios'

const service = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? process.env.VUE_APP_BASE_URL : process.env.VUE_APP_BASE_API,
  withCredentials: true,
  timeout: 5000,
})
service.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8'

// request 拦截器
service.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  (response) => {
    const res = response.data
    console.log(res)
    if (res.status && res.status !== 200) {
      return Promise.reject(res)
    } else {
      return Promise.resolve(res)
    }
  },
  (error) => {
    console.log(error)
    return Promise.reject(error)
  }
)
export default service
