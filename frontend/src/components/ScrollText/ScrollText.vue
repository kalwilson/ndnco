<template>
  <div class="scroll">
    <p class="scroll__text" :style="{ '--speed': speed + 's' }">
      <span v-for="(word, index) in text" :key="index" class="scroll__word">{{ word }} </span>
    </p>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import { useScrollTextStore } from '@/stores/scrollTextStore'

const { text } = defineProps({
  text: {
    type: Array,
    required: true,
  },
})

const scrollStore = useScrollTextStore()
const speed = scrollStore.speed
</script>

<style lang="scss" scoped>
@use './ScrollText.scss' as *;
</style>
