<template>
  <div class="card" v-for="business in mappedBusinesses" :key="business.id">
    <div class="card__top">
      <div class="card__logo"></div>
      <h4 class="card__contact">{{ business.contact_position }}: {{ business.contact_name }}</h4>
    </div>
    <div class="card__bottom">
      <h4 class="card__name">{{ business.business_name }}</h4>
      <div class="card__lists">
        <ul class="card__list">
          <li class="card__item">{{ business.categoryName }}</li>
          <li class="card__item--alt">{{ business.subcategoryName }}</li>
        </ul>
        <ul class="card__list--right">
          <li class="card__item">
            {{ business.city }}<span class="card__region">, {{ business.region }}</span>
          </li>
          <li class="card__item">
            <span v-if="business.reserve">On Reserve</span><span v-else>Off Reserve</span>
          </li>
        </ul>
      </div>
      <p class="card__description">{{ business.products_or_services }}</p>
    </div>
    <router-link :to="{ name: 'Business', params: { id: business.id } }">
      <button class="card__btn">Read more</button>
    </router-link>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useBusinessStore } from '@/stores/businessesStore'

const businessStore = useBusinessStore()

onMounted(async () => {
  if (!businessStore.businesses.length) {
    businessStore.getBusinesses()
  }

  if (!businessStore.categories.length) {
    businessStore.getCategoriesAndSubcategories()
  }
})

const mappedBusinesses = computed(() => {
  return businessStore.businesses.map((business) => {
    const category = businessStore.categories.find((cate) => cate.id === business.category_id)
    const subcategory = businessStore.subcategories.find(
      (sub) => sub.category_id === business.category_id && sub.id === business.subcategory_id,
    )

    return {
      ...business,
      categoryName: category?.name || 'Unknown Category',
      subcategoryName: subcategory?.name || 'Unknown Subcategory',
    }
  })
})
</script>

<style lang="scss" scoped>
@use './BusinessCard.scss' as *;
</style>
