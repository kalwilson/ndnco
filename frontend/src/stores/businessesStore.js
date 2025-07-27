import { defineStore } from 'pinia'
import axios from 'axios'
import { config } from '@/config'

export const useBusinessStore = defineStore('business', {
  state: () => ({
    businesses: [],
    categories: [],
    subcategories: [],
    cities: [],
    regions: [],
    filteredCategories: [],
    filteredSubcategories: [],
    filteredCities: [],
    filteredRegions: [],
    loading: false,
    error: null,
    totalCount: 0,
    currentPage: 1,
    totalPages: 1,
    searchParams: {
      category_id: null,
      subcategory_id: null,
      reserve: null,
      city: '',
      region: '',
      limit: 10,
      offset: 0,
    },
  }),
  actions: {
    async getCategoriesAndSubcategories() {
      try {
        const categoriesResponse = await axios.get(`${config.backendUrl}/categories`)
        const subcategoriesResponse = await axios.get(
          `${config.backendUrl}/categories/subcategories`,
        )

        this.categories = categoriesResponse.data
        this.subcategories = subcategoriesResponse.data

        this.filterCategoriesAndSubcategories()
      } catch (err) {
        console.error(`Error getting categories or subcategories: ${err}`)
        this.error = 'Failed to get categories or subcategories'
      }
    },

    async getBusinesses() {
      this.loading = true
      this.error = null

      try {
        const response = await axios.get(`${config.backendUrl}/businesses`, {
          params: this.searchParams,
        })

        console.log('API Response:', response.data)

        this.businesses = response.data.businesses
        console.log('Businesses response:', this.businesses)
        this.totalCount = response.data.totalCount
        console.log('Total count:', this.totalCount)
        this.currentPage = response.data.currentPage
        this.totalPages = response.data.totalPages

        await this.getCategoriesAndSubcategories()
        await this.filterCitiesAndRegions()

        return response.data
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to get businesses data'
        throw error
      } finally {
        this.loading = false
      }
    },

    clearFilters() {
      this.searchParams.category_id = null
      this.searchParams.subcategory_id = null
      this.searchParams.city = ''
      this.searchParams.region = ''
      this.searchParams.offset = 0

      this.getBusinesses()
    },

    filterCategoriesAndSubcategories() {
      if (this.businesses && this.businesses.length > 0) {
        const categoryIds = new Set(this.businesses.map((business) => business.category_id))
        const subcategoryIds = new Set(this.businesses.map((business) => business.subcategory_id))

        this.filteredCategories = this.categories.filter((category) => categoryIds.has(category.id))
        this.filteredSubcategories = this.subcategories.filter(
          (subcategory) =>
            categoryIds.has(subcategory.category_id) && subcategoryIds.has(subcategory.id),
        )
        this.filterCitiesAndRegions()
      }
    },

    filterCitiesAndRegions() {
      if (this.businesses && this.businesses.length > 0) {
        const cities = new Set(this.businesses.map((business) => business.city))
        const regions = new Set(this.businesses.map((business) => business.region))

        this.filteredCities = Array.from(cities)
        this.filteredRegions = Array.from(regions)
      } else {
        console.warn('Businesses data unavailable, or empty.')
      }
    },

    async searchBusinesses(params = {}) {
      this.loading = true
      this.error = null

      const searchParams = { ...this.searchParams, ...params }

      try {
        const response = await axios.get(`${config.backendUrl}/businesses/search`, {
          params: searchParams,
        })

        this.businesses = response.data.businesses
        this.totalCount = response.data.totalCount
        this.currentPage = response.data.currentPage
        this.totalPages = response.data.totalPages
        this.searchParams = searchParams

        this.filterCategoriesAndSubcategories()
        this.filterCitiesAndRegions()

        return response.data
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to search businesses'
        throw error
      } finally {
        this.loading = false
      }
    },
    async changePage(page) {
      const limit = this.searchParams.limit
      const offset = (page - 1) * limit
      await this.searchBusinesses({ offset })
    },
  },
})
