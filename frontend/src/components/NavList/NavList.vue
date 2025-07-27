<template>
  <nav class="nav">
    <ul v-if="!loading" class="nav__list">
      <li v-for="route in headerRoutes" :key="route.name" class="nav__item">
        <router-link :to="route.path" class="nav__link">{{ route.name }}</router-link>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { useRouterStore } from '@/stores/routerStore'
import { computed } from 'vue'

const routerStore = useRouterStore()

const headerRoutes = computed(() => routerStore.getHeaderRoutes)
const loading = computed(() => routerStore.loading)
</script>

<style lang="scss" scoped>
@use './NavList.scss' as *;
</style>
