// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE,
    },
  },

  // global custom css entry file
  css: ['~/assets/styles/css/main.css', '~/assets/styles/scss/main.scss', 'leaflet/dist/leaflet.css'],

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/eslint',
    '@nuxt/image',
    '@pinia/nuxt',
    'nuxt-echarts',
    '@nuxtjs/leaflet',
  ],
  tailwindcss: {
    // Options
  },
  future: {
    // Nuxt 4
    compatibilityVersion: 4,
  },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Valmon',
    },
  },
  eslint: {
    config: {
      stylistic: true,

    },
  },
  image: {
    format: ['avif', 'webp', 'jpeg', 'jpg', 'png', 'gif'],
    // The screen sizes predefined by `@nuxt/image`:
    screens: {
      'xs': 320,
      'sm': 640,
      'md': 768,
      'lg': 1024,
      'xl': 1280,
      'xxl': 1536,
      '2xl': 1536,
    },
  },
  routeRules: {
    'api/': { proxy: { to: `https://valmon.ctrixx.com/api/**` } },
    // 'api/**': { proxy: { to: `https://valmon.techr.me/api/**` }, ssr: false },
  },
})