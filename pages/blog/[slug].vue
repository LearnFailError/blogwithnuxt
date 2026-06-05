<template>
  <div class="max-w-3xl mx-auto px-4 py-12">
    <!-- Back Button -->
    <NuxtLink 
      to="/" 
      class="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8 transition"
    >
      <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
      </svg>
      Kembali ke Beranda
    </NuxtLink>
    
    <!-- Loading -->
    <div v-if="pending" class="text-center py-12">
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      <p class="mt-2 text-gray-500">Memuat artikel...</p>
    </div>
    
    <!-- Error -->
    <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
      <h2 class="text-xl font-bold text-red-600 mb-2">Artikel Tidak Ditemukan</h2>
      <p class="text-red-500">{{ error.statusMessage || error.message }}</p>
      <NuxtLink 
        to="/" 
        class="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Kembali ke Beranda
      </NuxtLink>
    </div>
    
    <!-- Article Content -->
    <article v-else-if="post">
      <header class="mb-8">
        <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{{ post.title }}</h1>
        <div class="flex items-center text-gray-500 text-sm">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
          </svg>
          <time>{{ formatDate(post.published_at) }}</time>
        </div>
      </header>
      
      <div 
        class="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-600"
        v-html="post.content"
      ></div>
    </article>
  </div>
</template>

<script setup>
const route = useRoute()
const slug = route.params.slug

// Fetch single post
const { data: post, pending, error } = await useFetch(`/api/posts/${slug}`, {
  server: true,
  key: `post-${slug}`  // Cache key unik
})

// SEO Dynamic
useHead(() => ({
  title: post.value ? `${post.value.title} - BlogKu` : 'Artikel Tidak Ditemukan',
  meta: [
    { 
      name: 'description', 
      content: post.value ? post.value.excerpt : 'Artikel tidak ditemukan' 
    }
  ]
}))

const formatDate = (dateString) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// Set error page jika 404
if (error.value && error.value.statusCode === 404) {
  showError({
    statusCode: 404,
    statusMessage: 'Artikel tidak ditemukan'
  })
}
</script>