<template>
  <div class="login">
    <h1 class="login__heading">Admin Login</h1>
    <form class="login__form">
      <label for="username" class="login__label">Username:</label>
      <input type="text" id="username" v-model="username" class="login__input" />

      <label for="password" class="login__label">Password:</label>
      <input type="text" id="password" v-model="password" class="login__input" />
      <button class="login__btn" @click="handleLogin">Login</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()
const username = ref(authStore.username)
const password = ref('')

const handleLogin = (event) => {
  event.preventDefault()

  try {
    authStore.login(username.value, password.value)

    this.$router.push('/legal')
  } catch (err) {
    console.error('Error at login:', err)
  }
}
</script>

<style lang="scss">
@use './LoginView.scss' as *;
</style>

// In your login page component mounted() { if (this.isAuthenticated) {
this.$router.push('/dashboard'); // Redirect to dashboard if logged in } }
