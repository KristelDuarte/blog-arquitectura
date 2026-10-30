export default defineNuxtConfig({
  compatibilityDate: '2026-01-01',
  modules: ['@nuxt/content'],
  css: ['~/assets/css/blog.css'],

  typescript: {
    nodeTsConfig: {
      compilerOptions: {
        types: ['node']
      }
    }
  },

  app: {
    baseURL: process.env.NUXT_APP_BASE_URL || '/',
    head: {
      htmlAttrs: { lang: 'es' },
      title: 'Pink Blog',
      meta: [
        { name: 'description', content: 'Blog sobre arquitectura de la información, organización, etiquetado y navegación de contenidos.' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600&family=Inter:wght@400;500;600&display=swap' }
      ]
    }
  },

  runtimeConfig: {
    public: {
      utterancesRepo: process.env.NUXT_PUBLIC_UTTERANCES_REPO || 'KristelDuarte/arquitectura-comentarios'
    }
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/', '/blog']
    }
  }
})
