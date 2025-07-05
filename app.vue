<script setup lang="ts">
const counter = useState('counter', () => Math.round(Math.random() * 1000))
</script>

<template>
  <header>
    <nav>
      <ul>
        <li><NuxtLink to="/">Home</NuxtLink></li>
        <li><NuxtLink to="/login">Login</NuxtLink></li>
        <li><NuxtLink to="/users">Users</NuxtLink></li>
      </ul>
    </nav>
  </header>
  <div>
    Counter: {{ counter }}
    <button @click="counter++">
      +
    </button>
    <button @click="counter--">
      -
    </button>
  </div>
  <NuxtPage />
</template>
