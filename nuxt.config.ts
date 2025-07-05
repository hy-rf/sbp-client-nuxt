// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },

  modules: [
    "@nuxt/test-utils",
    "@nuxt/image",
    "@nuxt/icon",
    "@nuxt/fonts",
    "@nuxt/eslint",
    "@nuxt/ui",
  ],

  runtimeConfig: {
    public: {
      API_BASE_URL: process.env.NUXT_PUBLIC_API_BASE_URL,
    },
  },
  nitro: {
    routeRules: {
      "/api/**": { proxy: `${process.env.NUXT_PUBLIC_API_BASE_URL}/**` },
    }
  }
});
