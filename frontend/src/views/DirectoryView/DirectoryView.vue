<template>
  <div class="directory">
    <h1 class="directory__heading">Directory</h1>
    <BusinessSearch />
    <div class="directory__display">
      <BusinessCard />
    </div>
  </div>
</template>

<script setup>
import { BusinessCard, BusinessSearch } from '@/components'
</script>

<style src="./DirectoryView.scss"></style>
