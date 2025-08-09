<script setup lang="ts">
import { useUserStore } from "./stores/user";
const { locales, setLocale } = useI18n();
const userStore = useUserStore();

const { t } = useI18n();

onMounted(() => {
  userStore.fetchUser();
});
</script>

<template>
  <header class="main-header">
    <nav class="navbar">
      <div class="nav-left">
        <ul class="nav-links">
          <li><NuxtLink to="/">{{ t('nav.home') }}</NuxtLink></li>
          <li
            
          >
            <NuxtLink :class="{ 'router-link-exact-active': $route.path.startsWith('/post') }" to="/post">{{ t('nav.posts') }}</NuxtLink>
          </li>

          <li><NuxtLink to="/users">{{ t('nav.users') }}</NuxtLink></li>
          <li><NuxtLink to="/new">{{ t('nav.new') }}</NuxtLink></li>
          <li v-if="!userStore.username">
            <NuxtLink to="/login">{{ t('nav.login') }}</NuxtLink>
          </li>
          <li v-if="userStore.loaded && userStore.username">
            <NuxtLink to="/me">{{ t('nav.me') }}</NuxtLink>
          </li>
        </ul>
      </div>
      <div class="nav-right">
        <div class="locale-dropdown">
          <button class="locale-button">🌐</button>
          <div class="locale-menu">
            <button
              v-for="locale in locales"
              :key="locale.code"
              :class="{ active: $i18n.locale === locale.code }"
              @click="setLocale(locale.code)"
            >
              {{ locale.name }}
            </button>
          </div>
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
  background: #b0bdff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.07);
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
  text-decoration: none;
  padding: 0.3rem 0.7rem;
  border-radius: 4px;
}
.nav-links a:hover,
.nav-links .router-link-exact-active {
  color: #eebbc3;
  background: #232946;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.locale-dropdown {
  position: relative;
}

.locale-button {
  background: transparent;
  border: 1px solid #eebbc3;
  color: #eebbc3;
  padding: 0.2rem 0.7rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.95rem;
}

.locale-menu {
  position: absolute;
  /* top: 110%; */
  right: 0;
  display: none;
  flex-direction: column;
  background: #232946;
  border: 1px solid #eebbc3;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 10;
}

.locale-menu button {
  background: transparent;
  border: none;
  padding: 0.5rem 1rem;
  text-align: left;
  font-size: 0.95rem;
  cursor: pointer;
}

.locale-menu button:hover,
.locale-menu button.active {
  color: #eebbc3;
  background: #232946;
}

/* Show menu on hover */
.locale-dropdown:hover .locale-menu {
  display: flex;
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
  box-shadow: 0 2px 16px rgba(35, 41, 70, 0.07);
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
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
</style>
