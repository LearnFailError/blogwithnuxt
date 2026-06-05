/// <reference types="node" />
// https://nuxt.com/docs/api/configuration/nuxt-config
const process = (globalThis as any).process ?? { env: {} }

export default defineNuxtConfig({
  devtools: { enabled: true },
  
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/supabase'  // ← PENTING! Wajib ada untuk serverSupabaseClient
  ],
  
  css: ['~/assets/css/main.css'],
  
  runtimeConfig: {
    // Private keys (hanya di server)
    supabaseServiceKey: process.env.SUPABASE_SERVICE_KEY,
    
    // Public keys (bisa diakses di client & server)
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