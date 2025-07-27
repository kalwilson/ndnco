<script setup>
import { AppHeader, AppFooter } from '@/components'
import { useRouterStore } from '@/stores/routerStore'
const routerStore = useRouterStore()
routerStore.loadRoutes()
</script>

<template>
  <AppHeader />
  <RouterView />
  <AppFooter />
</template>

<style lang="scss">
@use '@/styles/global.scss' as *;
</style>
