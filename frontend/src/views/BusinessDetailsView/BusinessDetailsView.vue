<template>
  <div class="biz" v-if="business">
    <div class="biz__header">
      <button class="biz__back" @click="goBack"><ArrowBackIcon className="black" /></button>
      <h1 class="biz__name">{{ business.business_name }}</h1>
    </div>
    <div class="biz__container">
      <div class="biz__info">
        <div class="biz__logo"></div>
        <p class="biz__description">{{ business.business_description }}</p>
      </div>
      <div class="card">
        <h3 class="card__heading">Contact:</h3>
        <ul class="card__list">
          <li class="card__item">
            {{ business.contact_position }}:
            <span class="card__contact"> {{ business.contact_name }}</span>
          </li>
          <li class="card__item">
            Phone Number: <span class="card__contact"> {{ business.contact_phone }} </span>
          </li>
          <li class="card__item">
            Email Address: <span class="card__contact"> {{ business.contact_email }}</span>
          </li>
        </ul>
        <h3 class="card__heading">Location:</h3>
        <ul class="card__list">
          <li class="card__item">
            This business is: <span v-if="business.reserve" class="card__reserve">On Reserve</span
            ><span v-else class="card__reserve--alt">Off Reserve</span>
          </li>
          <li class="card__item">
            {{ business.city }}, {{ business.region }}, {{ business.country }}
          </li>
        </ul>
        <h3 class="card__heading">Find {{ business.business_name }}:</h3>
        <a v-if="business.website" href="#" target="_blank" class="card__website">
          {{ business.business_name }}'s Website
        </a>
        <ul class="card__socials">
          <li v-if="business.linkedin" class="card__social">
            <a href="`${business.linkedin}`" target="_blank" class="card__social-link">LinkedIn</a>
          </li>
          <li v-if="business.instagram" class="card__social">
            <a href="`${business.instagram}`" target="_blank" class="card__social-link"
              >Instagram</a
            >
          </li>
          <li v-if="business.facebook" class="card__social">
            <a href="`${business.facebook}`" target="_blank" class="card__social-link">Facebook</a>
          </li>
          <li v-if="business.tiktok" class="card__social">
            <a href="`${business.tiktok}`" target="_blank" class="card__social-link">TikTok</a>
          </li>
          <li v-if="business.twitter" class="card__social">
            <a href="`${business.twitter}`" target="_blank" class="card__social-link">Twitter/X</a>
          </li>
          <li v-if="business.youtube" class="card__social">
            <a href="`${business.youtube}`" target="_blank" class="card__social-link">YouTube</a>
          </li>
          <li v-if="business.pinterest" class="card__social">
            <a href="`${business.pinterest}`" target="_blank" class="card__social-link"
              >Pinterest</a
            >
          </li>
          <li v-if="business.snapchat" class="card__social">
            <a href="`${business.snapchat}`" target="_blank" class="card__social-link">Snapchat</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ArrowBackIcon } from '@/components/AppIcons'
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import { config } from '@/config'

const route = useRoute()
const router = useRouter()
const business = ref(null)
const categories = ref([])
const subcategories = ref([])

const goBack = () => {
  router.back()
}

onMounted(async () => {
  try {
    const response = await axios.get(`${config.backendUrl}/businesses/${route.params.id}`)
    business.value = response.data

    const categoriesResponse = await axios.get(`${config.backendUrl}/categories`)
    console.log('Category response data:', categoriesResponse.data)
    categories.value = categoriesResponse.data

    const subcategoriesResponse = await axios.get(`${config.backendUrl}/categories/subcategories`)
    console.log('Subcategory response data:', subcategoriesResponse.data)
    subcategories.value = subcategoriesResponse.data

    const category = categories.value.find((cate) => cate.id === business.value.category_id)
    business.value.categoryName = category ? category.name : 'Unknown Category'

    const subcategory = subcategories.value.find((sub) => sub.id === business.value.subcategory_id)
    business.value.subcategoryName = subcategory ? subcategory.name : 'Unknonw Subcategory'
  } catch (err) {
    console.error(`Error getting single business: ${err}`)
  }
})
</script>

<style lang="scss" scoped>
@use './BusinessDetailsView.scss' as *;
</style>

<!-- import { ArrowBackIcon } from '../AppIcons'
import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => {
  router.back()
} -->
