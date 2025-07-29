<script setup lang="ts">
const { locales, setLocale } = useI18n();
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
        <li>
          <div>
            <button v-for="locale in locales" @click="setLocale(locale.code)">
              {{ locale.name }}
            </button>
            <h1>{{ $t("welcome") }}</h1>
          </div>
        </li>
      </ul>
      <span v-if="userStore.loaded">
        Logged in as: {{ userStore.username || "Guest" }}
      </span>
      <span v-if="!userStore.loaded"> Loading user... </span>
    </nav>
  </header>
  <NuxtPage />
</template>
