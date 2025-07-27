<template>
  <form class="form" @submit.prevent="handleSubmit">
    <div class="form__section">
      <h3 class="form__heading">Business Information:</h3>

      <div class="form__set">
        <label for="business_name" class="form__label">Business Name *</label>
        <input
          type="text"
          id="business_name"
          class="form__input"
          v-model="formData.business_name"
          required
        />
      </div>

      <div class="form__set">
        <label for="city" class="form__label">City *</label>
        <input type="text" class="form__input" v-model="formData.city" required />
      </div>

      <div class="form__set">
        <label for="region" class="form__label">Province *</label>
        <input type="text" id="region" v-model="formData.region" class="form__input" required />
      </div>

      <div class="form__set">
        <label for="country" class="form__label">Country *</label>
        <input id="country" v-model="formData.country" class="form__select" readonly required />
      </div>

      <div class="form__set--radio">
        <label for="reserve-on">
          <input
            type="radio"
            name="reserve"
            id="reserve-on"
            v-model="formData.reserve"
            :value="true"
            class="form__option"
            required
          />
          On Reserve
        </label>

        <label for="reserve-off">
          <input
            type="radio"
            name="reserve"
            id="reserve-off"
            v-model="formData.reserve"
            :value="false"
            class="form__option"
            required
          />
          Off Reserve
        </label>
      </div>

      <div class="form__set">
        <label for="business_type" class="form__label">Business Type *</label>
        <select id="business_type" v-model="formData.business_type" class="form__select">
          <option value="" class="form__option">Select Type</option>
          <option value="sole_proprietorship" class="form__option">
            Sole Proprietorship (Entrepreneur/Freelancer/Solopreneur)
          </option>
          <option value="partnership" class="form__option">Partnership</option>
          <option value="corporation" class="form__option">Corporation</option>
          <option value="llc" class="form__option">LLC</option>
        </select>
      </div>

      <div class="form__set">
        <label for="category_id" class="form__label">Category *</label>
        <select
          id="category_id"
          class="form__select"
          v-model="formData.category_id"
          @change="getSubcategories"
        >
          <option value="null" class="form__option">Select Category</option>
          <option
            v-for="category in categories"
            :key="category.id"
            :value="category.id"
            class="form__option"
          >
            {{ category.name }}
          </option>
        </select>
      </div>

      <div class="form__set">
        <label for="subcategory_id" class="form__label">Subcategory *</label>
        <select
          id="subcategory_id"
          v-model="formData.subcategory_id"
          required
          class="form__select"
          :disabled="!formData.category_id"
        >
          <option value="null" class="form__option">Select Subcategory</option>
          <option
            v-for="subcategory in subcategories"
            :key="subcategory.id"
            :value="subcategory.id"
            class="form__option"
          >
            {{ subcategory.name }}
          </option>
        </select>
      </div>

      <div class="form__set">
        <label for="business_description" class="form__label">Business Description *</label>
        <textarea
          id="business_description"
          v-model="formData.business_description"
          required
          rows="4"
          class="form__textarea"
        ></textarea>
      </div>

      <div class="form__set">
        <label for="products_or_services" class="form__label"
          >Products and/or Services Offered</label
        >
        <textarea
          id="products_or_services"
          v-model="formData.products_or_services"
          required
          rows="4"
          class="form__textarea"
        ></textarea>
      </div>
    </div>

    <div class="form__section">
      <h3 class="form__heading">Contact Information:</h3>

      <div class="form__set">
        <label for="contact_name" class="form__label">Contact Person Name *</label>
        <input type="text" id="contact_name" v-model="formData.contact_name" class="form__input" />
      </div>

      <div class="form__set">
        <label for="contact_position" class="form__label">Contact Person Position *</label>
        <input
          type="text"
          id="contact_position"
          v-model="formData.contact_position"
          class="form__input"
        />
      </div>

      <div class="form__set">
        <label for="contact_email" class="form__label">Contact Person Email *</label>
        <input
          type="email"
          id="contact_email"
          v-model="formData.contact_email"
          class="form__input"
          required
        />
      </div>

      <div class="form__actions">
        <button class="form__btn" type="submit" :disabled="isLoading">
          {{ isLoading ? 'Submitting...' : 'Register Business' }}
        </button>
        <button type="button" @click="resetClick" class="form__btn--reset">Reset Form</button>
      </div>
    </div>

    <div class="form__error" v-if="error">{{ error }}</div>
    <div class="form__success" v-if="success">Business submitted successfully!</div>
  </form>
</template>

<script setup>
import { config } from '@/config'
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useBusinessRegisterStore } from '@/stores/businessRegister'

const registerStore = useBusinessRegisterStore()
const { formData, isLoading, error, success, submitForm, resetForm } = registerStore

const categories = ref([])
const subcategories = ref([])

const getCategories = async () => {
  try {
    const response = await axios.get(`${config.backendUrl}/categories`)
    categories.value = response.data
  } catch (error) {
    console.error('Loading categories failed', error)
  }
}

const getSubcategories = async () => {
  if (!formData.category_id) {
    subcategories.value = []
    return
  }
  try {
    const response = await axios.get(
      `${config.backendUrl}/categories/${formData.category_id}/subcategories`,
    )
    subcategories.value = response.data
  } catch (error) {
    console.error('Failed to get subcategories', error)
  }
}

const handleSubmit = async () => {
  try {
    await submitForm()
    console.log('Form submitted')
  } catch (error) {
    console.error('Form submission error:', error)
  }
}

const resetClick = () => {
  resetForm()
  subcategories.value = []
}

onMounted(() => {
  getCategories()
})
</script>

<style lang="scss" scoped>
@use './RegisterForm.scss' as *;
</style>
