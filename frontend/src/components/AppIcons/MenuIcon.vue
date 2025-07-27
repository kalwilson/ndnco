<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24px"
    viewBox="0 -960 960 960"
    width="24px"
    fill="currentColor"
    :class="['icon', className]"
  >
    <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
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
