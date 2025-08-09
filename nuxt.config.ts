// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  ssr: true,

  modules: [
    "@nuxt/test-utils",
    "@nuxt/image",
    "@nuxt/icon",
    "@nuxt/fonts",
    "@nuxt/eslint",
    "@nuxt/ui",
    "@pinia/nuxt",
    "@nuxtjs/i18n",
    "nuxt-tiptap-editor",
  ],

  runtimeConfig: {
    public: {
      API_BASE_URL: process.env.NUXT_PUBLIC_API_BASE_URL,
      BASE_URL: process.env.NUXT_PUBLIC_BASE_URL
    },
    backendBase: 'http://localhost:8080' 
  },
  nitro: {
    routeRules: {
      "/api/**": { proxy: `${process.env.NUXT_PUBLIC_API_BASE_URL}/**` },
    },
  },

  i18n: {
    strategy: 'no_prefix',
    locales: [
      { code: "en", name: "en-US", file: "en-US.json" },
      { code: "jp", name: "jp-JP", file: "jp-JP.json" },
      { code: "zh", name: "zh-CN", file: "zh-CN.json" },
    ],
    defaultLocale: "en",
  },

  tiptap: {
    prefix: 'Tiptap', //prefix for Tiptap imports, composables not included
  },
});