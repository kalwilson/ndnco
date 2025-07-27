import { defineStore } from 'pinia'
import axios from 'axios'
import { config } from '@/config'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    username: '',
    password: '',
    user: null,
    accessToken: null,
    refreshToken: null,
    isAuthenticated: false,
  }),

  actions: {
    async login(username, password) {
      try {
        console.log('Login with:', username, password)
        const response = await axios.post(
          `${config.backendUrl}/auth/login`,
          {
            username,
            password,
          },
          { timeout: 3000, withCredentials: true },
        )
        const { accessToken, refreshToken, user } = response.data

        if (user) {
          this.user = { id: user.id, username: user.username }
          console.log('Username:', user.username)
          console.log('ID:', user.id)
        } else {
          console.error('UserObj missing')
          throw new Error('User data is not available')
        }

        this.accessToken = accessToken
        this.refreshToken = refreshToken
        this.isAuthenticated = true

        localStorage.setItem('access_token', this.accessToken)
        localStorage.setItem('refresh_token', this.refreshToken)

        localStorage.setItem('user_id', user.id)
        localStorage.setItem('username', user.username)
      } catch (error) {
        console.error('Authentication failed:', error)
        throw error
      }
    },
    logout() {
      this.accessToken = null
      this.refreshToken = null
      this.user = null
      this.isAuthenticated = false

      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
    },

    async refreshAccessToken() {
      try {
        const response = await axios.post(`${config.backendUrl}/auth/refresh`, {
          refreshToken: this.refreshToken,
        })

        this.accessToken = response.data.accessToken
      } catch (error) {
        console.error('Failed to refresh token:', error)
        this.logout
      }
    },

    autoLogin() {
      const accessToken = localStorage.getItem('access_token')
      const refreshToken = localStorage.getItem('refresh_token')

      if (accessToken && refreshToken) {
        this.accessToken = accessToken
        this.refreshToken = refreshToken
        this.isAuthenticated = true
      }
    },
  },
})
