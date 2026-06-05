import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  try {
    const client = await serverSupabaseClient(event)
    
    const { data: posts, error } = await client
      .from('posts')
      .select('id, title, slug, excerpt, published_at')
      .order('published_at', { ascending: false })
    
    if (error) {
      throw createError({
        statusCode: 500,
        statusMessage: `Database error: ${error.message}`
      })
    }
    
    return posts || []
    
  } catch (err) {
    console.error('API Error:', err)
    throw createError({
      statusCode: 500,
      statusMessage: err.message || 'Internal server error'
    })
  }
})