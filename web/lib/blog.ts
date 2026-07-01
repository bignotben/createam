import { fetchCollection } from './payload'
import type { BlogPost } from './types'

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const { docs } = await fetchCollection<BlogPost>(
    'blog-posts',
    '?depth=1&limit=100&sort=-publishedDate',
  )
  return docs
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const { docs } = await fetchCollection<BlogPost>(
    'blog-posts',
    `?where[slug][equals]=${encodeURIComponent(slug)}&depth=1&limit=1`,
  )
  return docs[0]
}
