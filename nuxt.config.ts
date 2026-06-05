export default defineNuxtConfig({
  devtools: { enabled: true },
  
  ssr: true,  // ← Penting untuk SSR/SSG hybrid
  
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/supabase'
  ],
  
  css: ['~/assets/css/main.css'],
  
  runtimeConfig: {
    supabaseServiceKey: process.env.SUPABASE_SERVICE_KEY,
    public: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_KEY
    }
  },
  
  nitro: {
    preset: 'netlify'
  },
  
  supabase: {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY,
    redirectOptions: {
      login: '/login',
      callback: '/confirm',
      exclude: ['/','/blog/*','/api/*']
    }
  }
})