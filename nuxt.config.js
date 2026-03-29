// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@nuxt/image', 'reka-ui/nuxt', '@nuxtjs/supabase', '@pinia/nuxt', 'nuxt-turnstile'],
  turnstile: {
    siteKey: process.env.NUXT_PUBLIC_TURNSTILE_SITE_KEY ?? '',
  },
  runtimeConfig: {
    turnstile: {
      secretKey: process.env.NUXT_TURNSTILE_SECRET_KEY ?? '',
    },
  },
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
