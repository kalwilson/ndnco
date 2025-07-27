<template>
  <form @submit.prevent="applyFilters" class="search">
    <div class="search__top">
      <select v-model="category_id" class="search__select">
        <option value="" disabled>Select a Category</option>
        <option v-for="category in filteredCategories" :key="category.id" :value="category.id">
          {{ category.name }}
        </option>
      </select>

      <select v-model="subcategory_id" class="search__select">
        <option class="search__option" value="" disabled>Select Subcategory</option>
        <option
          class="search__option"
          v-for="subcategory in filteredSubcategories"
          :key="subcategory.id"
          :value="subcategory.id"
        >
          {{ subcategory.name }}
        </option>
      </select>

      <select v-model="region" class="search__select">
        <option class="search__option" value="" disabled>Select a Region</option>
        <option
          class="search__option"
          v-for="regionOption in filteredRegions"
          :key="regionOption"
          :value="regionOption"
        >
          {{ regionOption }}
        </option>
      </select>

      <select v-model="city" class="search__select">
        <option value="" disabled>Select a City</option>
        <option v-for="cityOption in filteredCities" :key="cityOption" :value="cityOption">
          {{ cityOption }}
        </option>
      </select>
    </div>
    <div class="search__btns">
      <button type="submit" class="search__btn">Search</button>
      <button
        @click="clearFilters"
        class="search__btn--clear"
        :disabled="!category_id && !subcategory_id && !city && !region"
      >
        Clear Filters
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useBusinessStore } from '@/stores/businessesStore'

const businessStore = useBusinessStore()

const category_id = ref('')
const subcategory_id = ref('')
const city = ref('')
const region = ref('')

const applyFilters = async () => {
  const filters = {
    category_id: category_id.value,
    subcategory_id: subcategory_id.value,
    city: city.value,
    region: region.value,
  }
  await businessStore.searchBusinesses(filters)
}

onMounted(() => {
  businessStore.getBusinesses()
})

const filteredCategories = computed(() => businessStore.filteredCategories)
const filteredSubcategories = computed(() => businessStore.filteredSubcategories)
const filteredCities = computed(() => businessStore.filteredCities)
const filteredRegions = computed(() => businessStore.filteredRegions)

const clearFilters = () => {
  category_id.value = ''
  subcategory_id.value = ''
  city.value = ''
  region.value = ''

  businessStore.clearFilters()
  businessStore.getBusinesses()
}
</script>

<style lang="scss" scoped>
@use './BusinessSearch.scss' as *;
</style>
