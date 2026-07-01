import { fetchGlobal } from './payload'
import type { HomePageGlobal } from './types'

export function getHomePage(): Promise<HomePageGlobal> {
  return fetchGlobal<HomePageGlobal>('home-page', 1)
}
