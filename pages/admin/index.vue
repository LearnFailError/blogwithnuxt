<template>
  <div class="max-w-4xl mx-auto px-4 py-12">
    <div class="flex justify-between items-center mb-8">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">Dashboard Admin</h1>
        <p class="text-gray-500 mt-1">Kelola artikel blog Anda</p>
      </div>
      <NuxtLink 
        to="/admin/create" 
        class="bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition flex items-center"
      >
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
        </svg>
        Tulis Artikel
      </NuxtLink>
    </div>

    <!-- Daftar Artikel -->
    <div v-if="pending" class="text-center py-12 text-gray-500">Memuat artikel...</div>
    
    <div v-else-if="error" class="bg-red-50 text-red-600 p-4 rounded-lg">
      Gagal memuat artikel: {{ error.message }}
    </div>
    
    <div v-else-if="!posts || posts.length === 0" class="text-center py-12 bg-white rounded-lg border border-dashed border-gray-300">
      <p class="text-gray-500">Belum ada artikel. Yuk tulis yang pertama!</p>
    </div>
    
    <div v-else class="bg-white rounded-lg shadow overflow-hidden">
      <table class="w-full text-left">
        <thead class="bg-gray-50 border-b border-gray-200">
          <tr>
            <th class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Judul</th>
            <th class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Slug</th>
            <th class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
            <th class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-right">Aksi</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr v-for="post in posts" :key="post.id" class="hover:bg-gray-50">
            <td class="px-6 py-4 font-medium text-gray-900">{{ post.title }}</td>
            <td class="px-6 py-4 text-gray-500 text-sm">{{ post.slug }}</td>
            <td class="px-6 py-4 text-gray-500 text-sm">{{ formatDate(post.published_at) }}</td>
            <td class="px-6 py-4 text-right space-x-2">
              <NuxtLink 
                :to="`/blog/${post.slug}`" 
                target="_blank"
                class="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                Lihat
              </NuxtLink>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: ['auth']
})

useHead({
  title: 'Dashboard Admin - BlogKu'
})

const { data: posts, pending, error } = await useFetch('/api/posts')

const formatDate = (dateString) => {
  if (!dateString) return '-'
  return new Date(dateString).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
}
</script>