<template>
  <footer class="footer">
    <div class="footer__column">
      <h1 class="footer__brand">Native Digital Networking Communnity</h1>
      <p class="footer__landack">
        Thankful to be living and working on the unceeded territory of the<br />
        <a href="https://snawnawas.org/" class="footer__nation">Snaw'naw'as First Nation.</a>
      </p>
    </div>
    <div class="footer__column">
      <h3 class="footer__title">Follow us</h3>
      <ul class="footer__socials">
        <li class="footer__icon">
          <a href="https://www.facebook.com/" class="footer__icon-link" target="_blank">
            <FacebookIcon />
          </a>
        </li>
        <li class="footer__icon">
          <a href="https://www.instagram.com/" class="footer__icon-link" target="_blank">
            <InstagramIcon />
          </a>
        </li>
      </ul>
    </div>
    <ul v-if="!loading" class="footer__legal">
      <li v-for="route in footerRoutes" :key="route.name" class="footer__item">
        <router-link :to="route.path" class="footer__link">{{ route.name }}</router-link>
      </li>
      <li class="footer__item">
        <router-link :to="{ name: 'Login' }" class="footer__link">Admin Login</router-link>
      </li>
      <li class="footer__copyright">© {{ currentYear }} Native Digital Netowrking Community.</li>
    </ul>
  </footer>
</template>

<script setup>
import { useRouterStore } from '@/stores/routerStore'
import { computed } from 'vue'
import { FacebookIcon, InstagramIcon } from '../AppIcons'

const routerStore = useRouterStore()

const footerRoutes = computed(() => routerStore.getFooterRoutes)
const loading = computed(() => routerStore.loading)

const currentYear = new Date().getFullYear()
</script>

<style lang="scss" scoped>
@use './AppFooter.scss' as *;
</style>
