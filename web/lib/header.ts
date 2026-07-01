import { fetchGlobal } from './payload'
import type { HeaderGlobal } from './types'

export function getHeader(): Promise<HeaderGlobal> {
  return fetchGlobal<HeaderGlobal>('header', 1)
}
