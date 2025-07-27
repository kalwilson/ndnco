<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24px"
    viewBox="0 -960 960 960"
    width="24px"
    fill="currentColor"
    :class="['icon', className]"
  >
    <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
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
