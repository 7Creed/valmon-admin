// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },

  // global custom css entry file
  css: ['~/assets/styles/css/main.css', '~/assets/styles/scss/main.scss'],

  modules: ["@nuxtjs/tailwindcss", "@nuxt/eslint"],
  tailwindcss: {
    // Options
  },
  future: {
    // Nuxt 4
    compatibilityVersion: 4
  },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Valmon',
    }
  },
  eslint: {
    config: {
      stylistic: true,
      
    }
  }
})
