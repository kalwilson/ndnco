<template>
  <header class="header">
    <div class="header__container">
      <router-link to="/" class="header__branding">
        <h1 class="header__wordmark">NDNCo</h1>
        <p class="header__tagline">Native Digital 🍁</p>
        <p class="header__tagline">Networking Community</p>
      </router-link>
      <MenuFull />
      <button class="header__mobile-btn" @click="toggleMenu">
        <MenuIcon />
      </button>
    </div>
    <MenuMobile v-if="mobileMenuStore.isMobileMenuVisible" />
  </header>
</template>

<script setup>
import MenuFull from '../MenuFull/MenuFull.vue'
import { MenuIcon } from '@/components/AppIcons'
import MenuMobile from '@/components/MenuMobile/MenuMobile.vue'
import { useMobileMenuStore } from '@/stores/mobileMenuStore'

const mobileMenuStore = useMobileMenuStore()
mobileMenuStore.closeOnRouteChange()

const toggleMenu = mobileMenuStore.toggleMenu
</script>

<style lang="scss" scoped>
@use './AppHeader.scss' as *;
</style>
