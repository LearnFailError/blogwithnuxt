<template>
  <article class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
    <div class="p-6">
      <NuxtLink :to="`/blog/${post.slug}`">
        <h2 class="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors mb-2">
          {{ post.title }}
        </h2>
      </NuxtLink>
      <p class="text-gray-600 mb-4 line-clamp-3">{{ post.excerpt || post.content.replace(/<[^>]*>/g, '').substring(0, 150) + '...' }}</p>
      <div class="flex items-center justify-between">
        <time class="text-sm text-gray-400">
          {{ formatDate(post.published_at) }}
        </time>
        <NuxtLink 
          :to="`/blog/${post.slug}`" 
          class="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          Baca selengkapnya →
        </NuxtLink>
      </div>
    </div>
  </article>
</template>

<script setup>
const props = defineProps({
  post: {
    type: Object,
    required: true
  }
})

const formatDate = (dateString) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>