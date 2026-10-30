<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    repo: string
    theme?: string
    issueTerm?: string
    label?: string
  }>(),
  {
    theme: 'github-light',
    issueTerm: 'pathname',
    label: 'comments'
  }
)

const container = ref<HTMLElement | null>(null)
const route = useRoute()
let observer: MutationObserver | null = null

function forceEagerIframe() {
  const iframe = container.value?.querySelector('iframe')
  if (!iframe) return false
  iframe.loading = 'eager'
  return true
}

function loadComments() {
  if (!container.value) return
  observer?.disconnect()
  container.value.innerHTML = ''

  const script = document.createElement('script')
  script.src = 'https://utteranc.es/client.js'
  script.async = true
  script.crossOrigin = 'anonymous'
  script.setAttribute('repo', props.repo)
  script.setAttribute('issue-term', props.issueTerm)
  script.setAttribute('label', props.label)
  script.setAttribute('theme', props.theme)

  container.value.appendChild(script)

  observer = new MutationObserver(() => {
    if (forceEagerIframe()) observer?.disconnect()
  })
  observer.observe(container.value, { childList: true, subtree: true })
  forceEagerIframe()
}

onMounted(loadComments)
watch(() => route.fullPath, loadComments)
onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <div ref="container" class="comments" data-utterances />
</template>
