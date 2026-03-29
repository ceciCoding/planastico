// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@nuxt/image', 'reka-ui/nuxt', '@nuxtjs/supabase', '@pinia/nuxt'],
  app: {
    head: {
      title: 'Planástico',
      meta: [{ name: 'description', content: 'Tu app de planes en Granada' }],
      htmlAttrs: {
        lang: 'es',
      },
    },
  },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      'postcss-nested': {},
      autoprefixer: {},
    },
  },
  supabase: {
    redirect: false,
  },
});
