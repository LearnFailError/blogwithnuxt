export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: true,
  
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/supabase'
  ],
  
  css: ['~/assets/css/main.css'],
  
  // Biarkan default kosong — akan di-override oleh NUXT_PUBLIC_* di Netlify
  runtimeConfig: {
    supabaseServiceKey: '', // di-override oleh NUXT_SUPABASE_SERVICE_KEY
    public: {
      supabaseUrl: '',      // di-override oleh NUXT_PUBLIC_SUPABASE_URL
      supabaseKey: ''       // di-override oleh NUXT_PUBLIC_SUPABASE_KEY
    }
  },
  
  nitro: {
    preset: 'netlify'
  },
  
  supabase: {
    // Module akan auto-baca dari env vars, tapi kita bisa eksplisit juga
    url: process.env.NUXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL,
    key: process.env.NUXT_PUBLIC_SUPABASE_KEY || process.env.SUPABASE_KEY,
    redirectOptions: {
      login: '/login',
      callback: '/confirm',
      exclude: ['/','/blog/*','/api/*']
    }
  }
})