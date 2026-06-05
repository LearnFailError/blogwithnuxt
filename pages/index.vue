<template>
  <div class="max-w-4xl mx-auto px-4 py-12">
    <div class="text-center mb-12">
      <h1 class="text-4xl font-bold text-gray-900 mb-4">Selamat Datang di BlogKu</h1>
      <p class="text-lg text-gray-600">Blog sederhana dibangun dengan Nuxt.js, Supabase, dan Netlify</p>
    </div>
    
    <!-- Loading State -->
    <div v-if="pending" class="text-center py-12">
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      <p class="mt-2 text-gray-500">Memuat artikel...</p>
    </div>
    
    <!-- Error State -->
    <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
      <p class="text-red-600 font-medium">Terjadi kesalahan saat memuat data</p>
      <p class="text-red-500 text-sm mt-1">{{ error.message }}</p>
      <button 
        @click="refresh()" 
        class="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
      >
        Coba Lagi
      </button>
    </div>
    
    <!-- Empty State -->
    <div v-else-if="!posts || posts.length === 0" class="text-center py-12">
      <p class="text-gray-500 text-lg">Belum ada artikel yang dipublikasikan.</p>
    </div>
    
    <!-- Posts List -->
    <div v-else class="grid gap-6 md:grid-cols-2">
      <BlogCard v-for="post in posts" :key="post.id" :post="post" />
    </div>
  </div>
</template>

<script setup>
// SEO Meta
useHead({
  title: 'BlogKu - Blog Sederhana dengan Nuxt.js',
  meta: [
    { name: 'description', content: 'Blog sederhana dibangun dengan Nuxt.js, Supabase, dan Netlify' }
  ]
})

// Fetch data dari API
const { data: posts, pending, error, refresh } = await useFetch('/api/posts', {
  server: true,  // Fetch di server (SSR)
  default: () => []
})

// Handle error di client
if (error.value && process.client) {
  console.error('Failed to fetch posts:', error.value)
}
</script>