import { defineStore } from 'pinia'
import router from '@/router'

export const useRouterStore = defineStore('router', {
  state: () => ({
    routes: [],
    loading: true,
  }),

  actions: {
    async loadRoutes() {
      await router.isReady()
      this.routes = router.options.routes
      this.loading = false
    },
  },

  getters: {
    getRoutes: (state) => {
      if (state.loading) {
        return []
      }
      return state.routes
    },

    getHeaderRoutes: (state) => {
      if (state.loading) return []
      return state.routes.filter((route) => {
        return (
          !route.path.includes(':') &&
          !route.path.startsWith('/legal') &&
          !route.path.startsWith('/login')
        )
      })
    },

    getFooterRoutes: (state) => {
      if (state.loading) return []
      return state.routes.filter((route) => {
        return route.path.startsWith('/legal')
      })
    },
  },
})
