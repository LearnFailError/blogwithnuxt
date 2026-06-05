<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 px-4">
    <div class="max-w-md w-full bg-white rounded-lg shadow-md p-8">
      <div class="text-center mb-8">
        <h1 class="text-2xl font-bold text-gray-900">Login Admin</h1>
        <p class="text-gray-500 mt-2">Masuk ke dashboard blog</p>
      </div>

      <!-- Error Message -->
      <div v-if="errorMsg" class="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded mb-4 text-sm">
        {{ errorMsg }}
      </div>

      <form @submit.prevent="handleLogin" class="space-y-6">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            placeholder="admin@blogku.com"
          />
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            id="password"
            v-model="form.password"
            type="password"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
        >
          <span v-if="loading" class="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
          {{ loading ? 'Memuat...' : 'Masuk' }}
        </button>
      </form>

      <div class="mt-6 text-center">
        <NuxtLink to="/" class="text-sm text-blue-600 hover:text-blue-800">
          ← Kembali ke Blog
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: false
})

const { login } = useAuth()
const router = useRouter()

const form = reactive({
  email: '',
  password: ''
})

const loading = ref(false)
const errorMsg = ref('')

const handleLogin = async () => {
  errorMsg.value = ''
  loading.value = true
  
  try {
    await login(form.email, form.password)
    await router.push('/admin')
  } catch (error) {
    errorMsg.value = error.message || 'Email atau password salah'
  } finally {
    loading.value = false
  }
}
</script>