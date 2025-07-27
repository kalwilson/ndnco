import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import { watch } from 'vue'

export const useMobileMenuStore = defineStore('mobileMenu', {
  state: () => ({
    isMobileMenuVisible: false,
  }),
  actions: {
    toggleMenu() {
      this.isMobileMenuVisible = !this.isMobileMenuVisible
    },

    closeOnRouteChange() {
      const router = useRouter()
      watch(
        () => router.currentRoute.value.path,
        () => {
          this.isMobileMenuVisible = false
        },
      )
    },
  },
})
