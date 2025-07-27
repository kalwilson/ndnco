<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24px"
    viewBox="0 -960 960 960"
    width="24px"
    fill="currentColor"
    :class="['icon', className]"
  >
    <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
  </svg>
</template>

<script setup>
defineProps({
  className: {
    type: String,
    default: '',
  },
})
</script>

<style lang="scss">
@use '@/styles/partials/icons.scss' as *;
</style>
