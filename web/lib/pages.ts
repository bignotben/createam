import { fetchCollection } from './payload'
import type { Page } from './types'

export async function getAllPages(): Promise<Page[]> {
  const { docs } = await fetchCollection<Page>('pages', '?depth=0&limit=100')
  return docs
}

export async function getPageBySlug(slug: string): Promise<Page | undefined> {
  const { docs } = await fetchCollection<Page>(
    'pages',
    `?where[slug][equals]=${encodeURIComponent(slug)}&depth=0&limit=1`,
  )
  return docs[0]
}
