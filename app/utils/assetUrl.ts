export function assetUrl(path: string) {
  const baseURL = useRuntimeConfig().app.baseURL.replace(/\/$/, '')
  return `${baseURL}${path.startsWith('/') ? path : `/${path}`}`
}
