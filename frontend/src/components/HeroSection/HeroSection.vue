<template>
  <div class="container">
    <div class="hero">
      <h1 class="hero__title">{{ heroTitle }}</h1>
      <p class="hero__subtitle">{{ heroDetails }}</p>
      <p class="hero__highlight">{{ heroHighlight }}</p>
      <router-link :to="heroLink" v-if="heroLink" class="hero__link">
        <button :class="['hero__btn', className]">{{ heroBtn }}</button>
      </router-link>
    </div>
  </div>
</template>

<script setup>
defineProps({
  className: {
    type: String,
    required: false,
    default: '',
  },
  heroTitle: {
    type: String,
    required: true,
  },
  heroDetails: {
    type: String,
    required: true,
  },
  heroHighlight: {
    type: String,
    required: false,
  },
  heroLink: {
    type: String,
    required: false,
    default: '',
  },
  heroBtn: {
    type: String,
    required: true,
  },
})
</script>

<style lang="scss" scoped>
@use './HeroSection.scss' as *;
</style>
