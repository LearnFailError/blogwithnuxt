<template>
  <div class="max-w-3xl mx-auto px-4 py-12">
    <div class="mb-8">
      <NuxtLink to="/admin" class="text-blue-600 hover:text-blue-800 text-sm flex items-center mb-4">
        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
        </svg>
        Kembali ke Dashboard
      </NuxtLink>
      <h1 class="text-3xl font-bold text-gray-900">Tulis Artikel Baru</h1>
    </div>

    <!-- Success Message -->
    <div v-if="success" class="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
      ✅ Artikel berhasil dipublikasikan! 
      <NuxtLink :to="`/blog/${createdSlug}`" class="underline font-medium">Lihat artikel</NuxtLink>
    </div>

    <!-- Error Message -->
    <div v-if="errorMsg" class="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
      {{ errorMsg }}
    </div>

    <form @submit.prevent="handleSubmit" class="bg-white rounded-lg shadow-md p-6 space-y-6">
      <div>
        <label for="title" class="block text-sm font-medium text-gray-700 mb-1">Judul Artikel *</label>
        <input
          id="title"
          v-model="form.title"
          type="text"
          required
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          placeholder="Contoh: Pengenalan Nuxt.js"
          @input="generateSlug"
        />
      </div>

      <div>
        <label for="slug" class="block text-sm font-medium text-gray-700 mb-1">Slug URL *</label>
        <div class="flex items-center">
          <span class="text-gray-400 mr-2">/blog/</span>
          <input
            id="slug"
            v-model="form.slug"
            type="text"
            required
            class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            placeholder="pengenalan-nuxtjs"
          />
        </div>
        <p class="text-xs text-gray-400 mt-1">Slug akan jadi URL artikel. Hanya huruf kecil, angka, dan tanda hubung.</p>
      </div>

      <div>
        <label for="excerpt" class="block text-sm font-medium text-gray-700 mb-1">Ringkasan</label>
        <textarea
          id="excerpt"
          v-model="form.excerpt"
          rows="2"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          placeholder="Ringkasan singkat artikel (opsional, auto-generate kalau kosong)"
        ></textarea>
      </div>

      <div>
        <label for="content" class="block text-sm font-medium text-gray-700 mb-1">Konten *</label>
        <textarea
          id="content"
          v-model="form.content"
          rows="12"
          required
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition font-mono text-sm"
          placeholder="<p>Tulis konten artikel di sini. Bisa pakai HTML sederhana.</p>"
        ></textarea>
        <p class="text-xs text-gray-400 mt-1">Supports HTML dasar: &lt;p&gt;, &lt;strong&gt;, &lt;h2&gt;, dll.</p>
      </div>

      <div class="flex items-center justify-end space-x-4 pt-4 border-t border-gray-100">
        <NuxtLink to="/admin" class="px-5 py-2.5 text-gray-600 hover:text-gray-800 transition">
          Batal
        </NuxtLink>
        <button
          type="submit"
          :disabled="loading"
          class="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
        >
          <span v-if="loading" class="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
          {{ loading ? 'Menyimpan...' : 'Publikasikan Artikel' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: ['auth']
})

useHead({
  title: 'Tulis Artikel - Dashboard Admin'
})

const router = useRouter()

const form = reactive({
  title: '',
  slug: '',
  excerpt: '',
  content: ''
})

const loading = ref(false)
const errorMsg = ref('')
const success = ref(false)
const createdSlug = ref('')

const generateSlug = () => {
  if (!form.slug || form.slug === '') {
    form.slug = form.title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .substring(0, 60)
  }
}

const handleSubmit = async () => {
  errorMsg.value = ''
  success.value = false
  loading.value = true

  try {
    const result = await $fetch('/api/posts', {
      method: 'POST',
      body: {
        title: form.title,
        slug: form.slug,
        content: form.content,
        excerpt: form.excerpt
      }
    })

    success.value = true
    createdSlug.value = result.data.slug
    
    form.title = ''
    form.slug = ''
    form.excerpt = ''
    form.content = ''
    
    setTimeout(() => {
      router.push('/admin')
    }, 2000)
    
  } catch (err) {
    errorMsg.value = err.statusMessage || err.message || 'Gagal membuat artikel. Coba lagi.'
  } finally {
    loading.value = false
  }
}
</script>