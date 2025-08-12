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
      VERSION: process.env.VERSION,
    },
  },
  // nitro: {
  //   routeRules: {
  //     "/sbapi/**": { proxy: `${process.env.NUXT_PUBLIC_BASE_URL}/**` },
  //   },
  // },

  i18n: {
    strategy: 'no_prefix',
    locales: [
      { code: "en-US", name: "English(US)", file: "en-US.json" },
      { code: "jp-JP", name: "日本語", file: "jp-JP.json" },
      { code: "zh-TW", name: "繁體中文", file: "zh-TW.json" },
      { code: "zh-CN", name: "中文", file: "zh-CN.json" },
    ],
    defaultLocale: "en-US",
  },

  tiptap: {
    prefix: 'Tiptap', //prefix for Tiptap imports, composables not included
  },
});