export default defineNuxtRouteMiddleware(() => {
  const user = useSupabaseUser()
  
  // Kalau belum login, tendang ke halaman login
  if (!user.value) {
    return navigateTo('/login')
  }
})