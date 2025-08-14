<script setup lang="ts">
import { useUserStore } from "./stores/user";
const { locales, setLocale } = useI18n();
const userStore = useUserStore();
const router = useRouter();

const { t } = useI18n();

onMounted(() => {
  userStore.fetchUser();
});

watch(
  () => userStore.loaded,
  (loaded) => {
    if (!loaded) {
      // User logged out or not loaded, redirect or refresh accordingly
      router.push("/login");
      // or window.location.reload() if you want full reload
    }
  }
);
const runtimeConfig = useRuntimeConfig();

</script>

<template>
  <header>
    <nav>
      <div class="nav-left">
        <ul class="nav-links">
          <li>
            <NuxtLink to="/">{{ t("nav.home") }}</NuxtLink>
          </li>
          <!-- <li>
            <NuxtLink
              :class="{
                'router-link-exact-active': $route.path.startsWith('/post'),
              }"
              to="/post"
              >{{ "Post search/filter/sort with pinia" }}</NuxtLink
            >
          </li> -->

          <li v-if="userStore.loaded">
            <NuxtLink to="/users">{{ t("nav.users") }}</NuxtLink>
          </li>
          <li v-if="userStore.loaded">
            <NuxtLink to="/new">{{ t("nav.new") }}</NuxtLink>
          </li>

          <li v-if="userStore.loaded">
            <NuxtLink to="/me">{{ t("nav.me") }}</NuxtLink>
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

        <span class="user-info">
          <template v-if="userStore.username">
            <span>👤 {{ userStore.username }}</span>
            <button class="logout-button" @click="userStore.logout">{{ t("nav.logout") }}</button>
          </template>
          <template v-if="userStore.loaded && !userStore.loading && !userStore.username">
            <NuxtLink to="/login">{{ t("nav.login") }}</NuxtLink>
            <NuxtLink to="/register">{{ t("nav.register") }}</NuxtLink>
          </template>
          <template v-if="userStore.loading">
            <p>Loading</p>
          </template>
        </span>
      </div>
    </nav>
  </header>
  <main class="main-content">
    <NuxtPage />
  </main>
  <footer>Version: {{ runtimeConfig.public.VERSION }}</footer>
</template>

<style scoped>
header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: #dcfcda;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.07);
  height: 70px;
}

nav {
  display: flex;
  height: 100%;
  justify-content: space-between;
  align-items: center;
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
  color: #ffffff;
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
  color: #ffffff;
}

.locale-menu button:hover,
.locale-menu button.active {
  color: #ff0026;
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

.logout-button {
  height: 25px;
  padding: 0 0.5rem;
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

@media (min-width: 768px) {
  
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
