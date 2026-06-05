import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  // Perbaikan: gunakan getMethod() dari h3
  if (getMethod(event) !== 'POST') {
    throw createError({
      statusCode: 405,
      statusMessage: 'Method not allowed'
    })
  }

  try {
    const body = await readBody(event)
    
    // Validasi input
    if (!body.title || !body.slug || !body.content) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Title, slug, and content are required'
      })
    }
    
    const client = await serverSupabaseClient(event)
    
    const { data, error } = await client
      .from('posts')
      .insert([
        {
          title: body.title,
          slug: body.slug,
          content: body.content,
          excerpt: body.excerpt || body.content.replace(/<<[^>]*>/g, '').substring(0, 150)
        }
      ])
      .select()
    
    if (error) {
      throw createError({
        statusCode: 500,
        statusMessage: `Database error: ${error.message}`
      })
    }
    
    return {
      success: true,
      data: data[0]
    }
    
  } catch (err) {
    console.error('API Error:', err)
    throw createError({
      statusCode: err.statusCode || 500,
      statusMessage: err.statusMessage || 'Internal server error'
    })
  }
})