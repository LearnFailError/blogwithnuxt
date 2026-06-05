import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'

export default defineEventHandler(async (event) => {
  // Cek method
  if (getMethod(event) !== 'POST') {
    throw createError({
      statusCode: 405,
      statusMessage: 'Method not allowed'
    })
  }

  // 🔐 CEK AUTH: Pastikan user sudah login
  const user = await serverSupabaseUser(event)
  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized. Silakan login terlebih dahulu.'
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
    
    // Cek slug unik
    const { data: existing } = await client
      .from('posts')
      .select('id')
      .eq('slug', body.slug)
      .single()
    
    if (existing) {
      throw createError({
        statusCode: 409,
        statusMessage: 'Slug sudah digunakan. Gunakan slug lain.'
      })
    }
    
    const { data, error } = await client
      .from('posts')
      .insert([
        {
          title: body.title,
          slug: body.slug,
          content: body.content,
          excerpt: body.excerpt || body.content.replace(/<[^>]*>/g, '').substring(0, 150)
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