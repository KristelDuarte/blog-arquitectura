<script setup lang="ts">
definePageMeta({
  key: (route) => route.fullPath
})

const route = useRoute()
const config = useRuntimeConfig()

const contentPath = route.path.replace(/\/+$/, '') || '/'

const { data: post } = await useAsyncData(`blog-${contentPath}`, () =>
  queryCollection('blog').path(contentPath).first()
)

if (!post.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Artículo no encontrado',
    fatal: true
  })
}

const article = post.value

useSeoMeta({
  title: `${article.title} · Pink Blog`,
  description: article.description,
  ogType: 'article',
  articleAuthor: [article.author],
  articlePublishedTime: new Date(article.date).toISOString()
})

const formattedDate = new Intl.DateTimeFormat('es-ES', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC'
}).format(new Date(article.date))
</script>

<template>
  <article class="post">
    <header class="post-header">
      <NuxtLink to="/blog/" class="back-link">← Volver a los artículos</NuxtLink>
      <p class="eyebrow">Artículo</p>
      <h1>{{ article.title }}</h1>
      <p class="post-meta">
        por {{ article.author }} ·
        <time :datetime="new Date(article.date).toISOString()">{{ formattedDate }}</time>
      </p>
      <ul class="tags">
        <li v-for="tag in article.tags" :key="tag">{{ tag }}</li>
      </ul>
      <img :src="assetUrl(article.image)" :alt="article.title" class="cover" width="1200" height="630">
    </header>

    <div class="prose">
      <ContentRenderer :value="article" />
    </div>

    <section class="comments-section">
      <h2>Comentarios</h2>
      <p class="comments-hint">
        Este hilo es exclusivo de <strong>{{ article.title }}</strong>. Para participar
        necesitas una cuenta de GitHub; los comentarios quedan guardados como issues del
        repositorio de comentarios.
      </p>
      <CommentsUtterances :repo="config.public.utterancesRepo" />
    </section>
  </article>
</template>
