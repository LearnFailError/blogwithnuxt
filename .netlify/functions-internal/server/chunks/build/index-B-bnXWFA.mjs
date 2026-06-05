import { _ as __nuxt_component_0 } from './nuxt-link-CnixMvjk.mjs';
import { withAsyncContext, mergeProps, unref, withCtx, createVNode, toDisplayString, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderComponent } from 'vue/server-renderer';
import { u as useHead } from './v3-BE6GLR8H.mjs';
import { u as useFetch } from './fetch-BQgLDPLZ.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import './server.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'vue-router';
import '@supabase/ssr';
import '@vue/shared';

const _sfc_main$1 = {
  __name: "BlogCard",
  __ssrInlineRender: true,
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  setup(__props) {
    const formatDate = (dateString) => {
      if (!dateString) return "";
      return new Date(dateString).toLocaleDateString("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<article${ssrRenderAttrs(mergeProps({ class: "bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300" }, _attrs))}><div class="p-6">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: `/blog/${__props.post.slug}`
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h2 class="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors mb-2"${_scopeId}>${ssrInterpolate(__props.post.title)}</h2>`);
          } else {
            return [
              createVNode("h2", { class: "text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors mb-2" }, toDisplayString(__props.post.title), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<p class="text-gray-600 mb-4 line-clamp-3">${ssrInterpolate(__props.post.excerpt || __props.post.content.replace(/<[^>]*>/g, "").substring(0, 150) + "...")}</p><div class="flex items-center justify-between"><time class="text-sm text-gray-400">${ssrInterpolate(formatDate(__props.post.published_at))}</time>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: `/blog/${__props.post.slug}`,
        class: "text-blue-600 hover:text-blue-800 text-sm font-medium"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Baca selengkapnya \u2192 `);
          } else {
            return [
              createTextVNode(" Baca selengkapnya \u2192 ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></article>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/BlogCard.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    useHead({
      title: "BlogKu - Blog Sederhana dengan Nuxt.js",
      meta: [
        { name: "description", content: "Blog sederhana dibangun dengan Nuxt.js, Supabase, dan Netlify" }
      ]
    });
    const { data: posts, pending, error, refresh } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      "/api/posts",
      {
        server: true,
        // Fetch di server (SSR)
        default: () => []
      },
      "$lgIIdEkwLA"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    if (error.value && false) ;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_BlogCard = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-4xl mx-auto px-4 py-12" }, _attrs))}><div class="text-center mb-12"><h1 class="text-4xl font-bold text-gray-900 mb-4">Selamat Datang di BlogKu</h1><p class="text-lg text-gray-600">Blog sederhana dibangun dengan Nuxt.js, Supabase, dan Netlify</p></div>`);
      if (unref(pending)) {
        _push(`<div class="text-center py-12"><div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div><p class="mt-2 text-gray-500">Memuat artikel...</p></div>`);
      } else if (unref(error)) {
        _push(`<div class="bg-red-50 border border-red-200 rounded-lg p-6 text-center"><p class="text-red-600 font-medium">Terjadi kesalahan saat memuat data</p><p class="text-red-500 text-sm mt-1">${ssrInterpolate(unref(error).message)}</p><button class="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"> Coba Lagi </button></div>`);
      } else if (!unref(posts) || unref(posts).length === 0) {
        _push(`<div class="text-center py-12"><p class="text-gray-500 text-lg">Belum ada artikel yang dipublikasikan.</p></div>`);
      } else {
        _push(`<div class="grid gap-6 md:grid-cols-2"><!--[-->`);
        ssrRenderList(unref(posts), (post) => {
          _push(ssrRenderComponent(_component_BlogCard, {
            key: post.id,
            post
          }, null, _parent));
        });
        _push(`<!--]--></div>`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-B-bnXWFA.mjs.map
