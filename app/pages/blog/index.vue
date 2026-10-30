<script setup lang="ts">
useSeoMeta({
  title: 'Artículos · Pink Blog',
  description: 'Seis artículos sobre organización, etiquetado, navegación y búsqueda de información.'
})

const { data: posts } = await useAsyncData('blog-list', () =>
  queryCollection('blog')
    .order('date', 'DESC')
    .select('path', 'title', 'description', 'author', 'date', 'image', 'tags')
    .all()
)

const formatDate = (value: Date) =>
  new Intl.DateTimeFormat('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC'
  }).format(new Date(value))
</script>

<template>
  <div class="blog-index">
    <header class="page-header">
      <p class="eyebrow">Blog</p>
      <h1>Artículos</h1>
      <p class="page-lead">
        Seis entradas sobre los pilares de la arquitectura de la información.
        Abre cualquiera y deja tu comentario: cada artículo tiene su propio hilo.
      </p>
    </header>

    <ul class="post-list">
      <li v-for="post in posts" :key="post.path">
        <NuxtLink :to="`${post.path}/`" class="post-card">
          <img :src="assetUrl(post.image)" :alt="post.title" class="post-thumb" width="1200" height="630" loading="lazy">
          <div class="post-card-body">
            <span class="post-date">{{ formatDate(post.date) }} · {{ post.author }}</span>
            <h2>{{ post.title }}</h2>
            <p>{{ post.description }}</p>
            <ul class="tags">
              <li v-for="tag in post.tags" :key="tag">{{ tag }}</li>
            </ul>
          </div>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
