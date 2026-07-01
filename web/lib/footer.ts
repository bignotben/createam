import { fetchGlobal } from './payload'
import type { FooterGlobal } from './types'

export function getFooter(): Promise<FooterGlobal> {
  return fetchGlobal<FooterGlobal>('footer', 0)
}
