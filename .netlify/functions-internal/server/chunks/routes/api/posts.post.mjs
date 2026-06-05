import { d as defineEventHandler, e as createError, r as readBody } from '../../_/nitro.mjs';
import { s as serverSupabaseClient } from '../../_/serverSupabaseClient.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import '@supabase/ssr';

const posts_post = defineEventHandler(async (event) => {
  if (event.node.req.method !== "POST") {
    throw createError({
      statusCode: 405,
      statusMessage: "Method not allowed"
    });
  }
  try {
    const body = await readBody(event);
    if (!body.title || !body.slug || !body.content) {
      throw createError({
        statusCode: 400,
        statusMessage: "Title, slug, and content are required"
      });
    }
    const client = await serverSupabaseClient(event);
    const { data, error } = await client.from("posts").insert([
      {
        title: body.title,
        slug: body.slug,
        content: body.content,
        excerpt: body.excerpt || body.content.replace(/<[^>]*>/g, "").substring(0, 150)
      }
    ]).select();
    if (error) {
      throw createError({
        statusCode: 500,
        statusMessage: `Database error: ${error.message}`
      });
    }
    return {
      success: true,
      data: data[0]
    };
  } catch (err) {
    console.error("API Error:", err);
    throw createError({
      statusCode: err.statusCode || 500,
      statusMessage: err.statusMessage || "Internal server error"
    });
  }
});

export { posts_post as default };
//# sourceMappingURL=posts.post.mjs.map
