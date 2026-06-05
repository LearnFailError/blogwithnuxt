import { d as defineEventHandler, e as createError } from '../../_/nitro.mjs';
import { s as serverSupabaseClient } from '../../_/serverSupabaseClient.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import '@supabase/ssr';

const posts_get = defineEventHandler(async (event) => {
  try {
    const client = await serverSupabaseClient(event);
    const { data: posts, error } = await client.from("posts").select("id, title, slug, excerpt, published_at").order("published_at", { ascending: false });
    if (error) {
      throw createError({
        statusCode: 500,
        statusMessage: `Database error: ${error.message}`
      });
    }
    return posts || [];
  } catch (err) {
    console.error("API Error:", err);
    throw createError({
      statusCode: 500,
      statusMessage: err.message || "Internal server error"
    });
  }
});

export { posts_get as default };
//# sourceMappingURL=posts.get.mjs.map
