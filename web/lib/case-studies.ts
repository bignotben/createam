import { fetchCollection } from './payload'
import type { CaseStudy } from './types'

export async function getFeaturedCaseStudies(limit = 3): Promise<CaseStudy[]> {
  const { docs } = await fetchCollection<CaseStudy>(
    'case-studies',
    `?where[featured][equals]=true&limit=${limit}&depth=1`,
  )
  return docs
}

export async function getAllCaseStudies(): Promise<CaseStudy[]> {
  const { docs } = await fetchCollection<CaseStudy>('case-studies', '?depth=1&limit=100')
  return docs
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudy | undefined> {
  const { docs } = await fetchCollection<CaseStudy>(
    'case-studies',
    `?where[slug][equals]=${encodeURIComponent(slug)}&depth=2&limit=1`,
  )
  return docs[0]
}
