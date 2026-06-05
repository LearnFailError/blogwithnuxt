export const useAuth = () => {
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()
  const router = useRouter()

  // Login dengan email & password
  const login = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    
    if (error) throw error
    return data
  }

  // Register user baru
  const register = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password
    })
    
    if (error) throw error
    return data
  }

  // Logout
  const logout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    
    await router.push('/')
  }

  // Cek apakah sudah login
  const isLoggedIn = computed(() => !!user.value)

  return {
    user,
    isLoggedIn,
    login,
    register,
    logout
  }
}