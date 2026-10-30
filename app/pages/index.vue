<script setup lang="ts">
const { data: latest } = await useAsyncData('home-latest', () =>
  queryCollection('blog')
    .order('date', 'DESC')
    .select('path', 'title', 'description', 'date')
    .limit(3)
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
  <div class="home">
    <section class="hero">
      <p class="eyebrow">Arquitectura de la Información</p>
      <h1>Encontrar, entender y <em>usar</em> la información.</h1>
      <p class="hero-lead">
        Apuntes sobre cómo se organiza, etiqueta y navega el contenido de un sitio web.
        Cada artículo abre su propio hilo de comentarios en GitHub.
      </p>
      <NuxtLink to="/blog/" class="button">Leer los artículos</NuxtLink>
    </section>

    <section class="latest">
      <h2>Últimas entradas</h2>
      <ul class="post-list compact">
        <li v-for="post in latest" :key="post.path">
          <NuxtLink :to="`${post.path}/`" class="post-card">
            <span class="post-date">{{ formatDate(post.date) }}</span>
            <h3>{{ post.title }}</h3>
            <p>{{ post.description }}</p>
          </NuxtLink>
        </li>
      </ul>
    </section>
  </div>
</template>
