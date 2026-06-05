import { createClient } from '@supabase/supabase-js'

export const useSupabase = () => {
  const config = useRuntimeConfig()
  
  if (!config.public.supabaseUrl || !config.public.supabaseKey) {
    console.warn('Supabase credentials not configured')
  }
  
  return createClient(
    config.public.supabaseUrl,
    config.public.supabaseKey
  )
}