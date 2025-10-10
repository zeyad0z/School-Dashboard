// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@nuxt/icon", "@pinia/nuxt", "@nuxtjs/i18n"],
  css: ["@/assets/css/main.css"],
  app: {
    baseURL: "/Log-in-and-choose/",
  },
  nitro: {
    preset: "github-pages",
  },

  colorMode: {
    preference: "light",
    fallback: "light",
    classSuffix: "",
    storageKey: "nuxt-color-mode",
  },

  i18n: {
    langDir: "locales/",
    locales: [
      { code: "en", name: "English", file: "en.json" },
      { code: "ar", name: "العربية", file: "ar.json", dir: "rtl" },
    ],
    defaultLocale: "en",
    strategy: "no_prefix",
  },
});
