import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import { config } from '@/config'

export const useBusinessRegisterStore = defineStore('businessRegister', () => {
  const formData = ref({
    business_name: '',
    city: '',
    region: '',
    reserve: false,
    country: 'Canada',
    contact_name: '',
    contact_position: '',
    contact_email: '',
    category_id: null,
    subcategory_id: null,
    business_type: '',
    business_description: '',
    products_or_services: '',
  })

  const isLoading = ref(false)
  const error = ref(null)
  const success = ref(false)

  const submitForm = async () => {
    isLoading.value = true
    error.value = null
    success.value = false

    try {
      const newData = {
        ...formData.value,
      }
      console.log('New data:', newData)

      const response = await axios.post(`${config.backendUrl}/businesses`, newData)
      success.value = true
      return response.data
    } catch (error) {
      error.value = error.response?.data?.message || 'Submission failed.'
      throw error
    } finally {
      isLoading.value = false
      resetForm()
    }
  }

  const resetForm = () => {
    formData.value = {
      business_name: '',
      city: '',
      region: '',
      reserve: false,
      country: 'Canada',
      contact_name: '',
      contact_position: '',
      contact_email: '',
      category_id: null,
      subcategory_id: null,
      business_type: '',
      business_description: '',
      products_or_services: '',
    }
    success.value = false
    error.value = null
  }

  return { formData, isLoading, error, success, submitForm, resetForm }
})
