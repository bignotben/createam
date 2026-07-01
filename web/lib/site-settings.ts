import { fetchGlobal } from './payload'
import type { SiteSettingsGlobal } from './types'

export function getSiteSettings(): Promise<SiteSettingsGlobal> {
  return fetchGlobal<SiteSettingsGlobal>('site-settings', 1)
}
