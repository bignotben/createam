import type { Media } from './types'

const CMS_URL = process.env.NEXT_PUBLIC_CMS_URL || 'http://localhost:3001'

async function fetchJson<T>(path: string): Promise<T> {
  const res = await fetch(`${CMS_URL}${path}`)
  if (!res.ok) {
    throw new Error(`Payload fetch failed: ${path} (${res.status})`)
  }
  return res.json() as Promise<T>
}

export function fetchGlobal<T>(slug: string, depth = 1): Promise<T> {
  return fetchJson<T>(`/api/globals/${slug}?depth=${depth}`)
}

export function fetchCollection<T>(slug: string, query = ''): Promise<{ docs: T[] }> {
  return fetchJson<{ docs: T[] }>(`/api/${slug}${query}`)
}

const withCmsUrl = (url: string) => (url.startsWith('http') ? url : `${CMS_URL}${url}`)

export function mediaUrl(media?: Media | null): string | undefined {
  if (!media?.url) return undefined
  return withCmsUrl(media.url)
}

export function mediaSizeUrl(
  media: Media | null | undefined,
  size: 'thumbnail' | 'card' | 'hero',
): string | undefined {
  const sizeUrl = media?.sizes?.[size]?.url
  if (!sizeUrl) return mediaUrl(media)
  return withCmsUrl(sizeUrl)
}
