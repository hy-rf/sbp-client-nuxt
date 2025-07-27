<script setup lang="ts">
import { useUserStore } from "./stores/user";
const userStore = useUserStore();

onMounted(() => {
  userStore.fetchUser();
});
</script>

<template>
  <header>
    <nav>
      <ul>
        <li><NuxtLink to="/">Home</NuxtLink></li>
        <li><NuxtLink to="/login">Login</NuxtLink></li>
        <li><NuxtLink to="/users">Users</NuxtLink></li>
      </ul>
      <span v-if="userStore.loaded">
        Logged in as: {{ userStore.username || "Guest" }}
      </span>
      <span v-if="!userStore.loaded"> Loading user... </span>
    </nav>
  </header>
  <NuxtPage />
</template>
