import axios from 'axios'
import { useAuthStore } from './stores/authStore'
import { config } from './config'

const axiosinstance = axios.create({
  baseurl: config.backendUrl,
})

const authStore = useAuthStore()

axiosinstance.interceptors.request.use(
  (confi) => {
    const accessToken = localStorage.getItem('access_token') || authStore.accessToken

    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`
    }

    return confi
  },
  (error) => {
    return Promise.reject(error)
  },
)

axiosinstance.interceptors.response.use(
  (response) => response,

  async (error) => {
    if (error.response && error.response.status === 401 && authStore.refreshToken) {
      try {
        const response = await axios.put(`${config.backendUrl}/auth/refresh`, {
          refreshToken: authStore.refreshToken,
        })

        authStore.accessToken = response.data.accessToken
        localStorage.setItem('access_token', authStore.accessToken)

        error.config.headers['Authorization'] = `Bearer ${authStore.accessToken}`
        return axiosinstance(error.config)
      } catch (err) {
        authStore.logout()
        return Promise.reject(err)
      }
    }

    return Promise.reject(error)
  },
)

export default axiosinstance
