// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },

  // global custom css entry file
  css: ['~/assets/styles/css/main.css', '~/assets/styles/scss/main.scss'],

  modules: ["@nuxtjs/tailwindcss"],
  future: {
    compatibilityVersion: 4
  },
})
