<script setup lang="ts">
import { useUserStore } from "./stores/user";
const { locales, setLocale } = useI18n();
const userStore = useUserStore();

onMounted(() => {
  userStore.fetchUser();
});
</script>

<template>
  <header class="main-header">
    <nav class="navbar">
      <div class="nav-left">
        <ul class="nav-links">
          <li><NuxtLink to="/">Home</NuxtLink></li>
          <li><NuxtLink to="/users">Users</NuxtLink></li>
          <li><NuxtLink to="/new">New</NuxtLink></li>
          <li v-if="!userStore.username"><NuxtLink to="/login">Login</NuxtLink></li>
          <li v-if="userStore.loaded && userStore.username"><NuxtLink to="/me">Me</NuxtLink></li>
        </ul>
      </div>
      <div class="nav-right">
        <div class="locale-switcher">
          <button
            v-for="locale in locales"
            :key="locale.code"
            :class="{ active: $i18n.locale === locale.code }"
            @click="setLocale(locale.code)"
          >
            {{ locale.name }}
          </button>
        </div>
        <span class="user-info" v-if="userStore.loaded">
          <template v-if="userStore.username">
            <span>👤 {{ userStore.username }}</span>
          </template>
          <template v-else>
            <span>Guest</span>
          </template>
        </span>
        <span v-if="!userStore.loaded" class="loading">Loading...</span>
      </div>
    </nav>
  </header>
  <main class="main-content">
    <NuxtPage />
  </main>
</template>

<style scoped>
.main-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: #232946;
  color: #fff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.07);
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1100px;
  margin: 0 auto;
  padding: 0.5rem 2rem;
}

.logo {
  font-weight: bold;
  font-size: 1.3rem;
  color: #eebbc3;
  text-decoration: none;
  margin-right: 2rem;
  letter-spacing: 1px;
  transition: color 0.2s;
}
.logo:hover {
  color: #ffd803;
}

.nav-links {
  display: flex;
  gap: 1.2rem;
  list-style: none;
  margin: 0;
  padding: 0;
}
.nav-links li {
  display: flex;
}
.nav-links a {
  color: #fff;
  text-decoration: none;
  padding: 0.3rem 0.7rem;
  border-radius: 4px;
  transition: linear 0.2s, color 0.2s;
}
.nav-links a:hover,
.nav-links .router-link-exact-active {
  background: #eebbc3;
  color: #232946;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.locale-switcher {
  display: flex;
  gap: 0.3rem;
}
.locale-switcher button {
  background: transparent;
  border: 1px solid #eebbc3;
  color: #eebbc3;
  padding: 0.2rem 0.7rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.95rem;
  transition: linear 0.2s, color 0.2s;
}
.locale-switcher button.active,
.locale-switcher button:hover {
  background: #eebbc3;
  color: #232946;
}

.user-info {
  font-size: 1rem;
  color: #ffd803;
  margin-left: 0.5rem;
}

.loading {
  color: #aaa;
  font-size: 0.95rem;
}

.main-content {
  max-width: 900px;
  margin: 2rem auto 0 auto;
  padding: 2rem 1rem;
  background: #f4f6fb;
  min-height: 80vh;
  border-radius: 12px;
  box-shadow: 0 2px 16px rgba(35,41,70,0.07);
}

@media (max-width: 700px) {
  .navbar {
    flex-direction: column;
    align-items: flex-start;
    padding: 1rem;
  }
  .main-content {
    padding: 1rem 0.3rem;
  }
  .nav-links {
    gap: 0.7rem;
  }
}
</style>

<style>
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
</style>