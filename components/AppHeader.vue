<template>
  <header class="bg-white shadow-sm">
    <div class="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
      <NuxtLink to="/" class="text-2xl font-bold text-blue-600">
        BlogKu
      </NuxtLink>
      
      <nav class="flex items-center space-x-6">
        <NuxtLink to="/" class="text-gray-600 hover:text-blue-600 transition">Beranda</NuxtLink>
        
        <!-- Menu Admin (hanya muncul kalau login) -->
        <template v-if="isLoggedIn">
          <NuxtLink to="/admin" class="text-gray-600 hover:text-blue-600 transition">Dashboard</NuxtLink>
          <button 
            @click="logout" 
            class="text-sm bg-red-50 text-red-600 px-3 py-1.5 rounded hover:bg-red-100 transition"
          >
            Keluar
          </button>
        </template>
        
        <NuxtLink 
          v-else 
          to="/login" 
          class="text-sm bg-blue-50 text-blue-600 px-3 py-1.5 rounded hover:bg-blue-100 transition"
        >
          Login Admin
        </NuxtLink>
      </nav>
    </div>
  </header>
</template>

<script setup>
const { isLoggedIn, logout } = useAuth()
</script>