import { fetchCollection } from './payload'
import type { CaseStudy } from './types'

export async function getFeaturedCaseStudies(limit = 3): Promise<CaseStudy[]> {
  const { docs } = await fetchCollection<CaseStudy>(
    'case-studies',
    `?where[featured][equals]=true&limit=${limit}&depth=1`,
  )
  return docs
}
