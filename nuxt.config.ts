// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@nuxt/image'],
  app: {
    head: {
      title: 'Planastico',
      meta: [
        { name: 'description', content: 'Tu app de planes en Granada' }
      ]
    }
  },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      'postcss-nested': {},
      'autoprefixer': {}
    }
  }
})
