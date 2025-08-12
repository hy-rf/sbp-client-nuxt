<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const username = ref('')
const password = ref('')
const message = ref('')
const router = useRouter()

const register = async () => {
  message.value = ''
  try {
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: username.value, password: password.value })
    })
    const text = await res.text()
    if (res.ok) {
      message.value = text
    } else {
      message.value = text
    }
  } catch (err) {
    message.value = 'Network error'
  }
}
</script>

<template>
  <div>
    <h1>Register</h1>
    <form @submit.prevent="register">
      <div>
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="username" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit">Register</button>
    </form>
    <div v-if="message" style="margin-top: 1em; color: red;">{{ message }}</div>
  </div>
</template>

<style lang="css" scoped>
/* Add your styles here */
</style>