import { fetchCollection } from './payload'
import type { Service, ServiceCategory } from './types'

export async function getServices(): Promise<Service[]> {
  const { docs } = await fetchCollection<Service>('services', '?depth=0&limit=100&sort=order')
  return docs
}

export async function getServicesByCategory(): Promise<Record<ServiceCategory, Service[]>> {
  const services = await getServices()
  return {
    digital: services.filter((s) => s.category === 'digital'),
    brand: services.filter((s) => s.category === 'brand'),
    growth: services.filter((s) => s.category === 'growth'),
  }
}

export async function getServiceBySlug(slug: string): Promise<Service | undefined> {
  const { docs } = await fetchCollection<Service>(
    'services',
    `?where[slug][equals]=${encodeURIComponent(slug)}&depth=1&limit=1`,
  )
  return docs[0]
}
