export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: true,
  
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/supabase'
  ],
  
  css: ['~/assets/css/main.css'],
  
  runtimeConfig: {
    supabaseServiceKey: '',
    public: {
      supabaseUrl: '',
      supabaseKey: ''
    }
  },
  
  nitro: {
    preset: 'netlify'
  },
  
  supabase: {
    url: process.env.NUXT_PUBLIC_SUPABASE_URL,
    key: process.env.NUXT_PUBLIC_SUPABASE_KEY,
    redirectOptions: {
      login: '/login',
      callback: '/confirm',
      exclude: ['/', '/blog/*', '/api/*', '/login']
    }
  }
})