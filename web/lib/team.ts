import { fetchCollection } from './payload'
import type { TeamMember } from './types'

export async function getTeamMembers(): Promise<TeamMember[]> {
  const { docs } = await fetchCollection<TeamMember>(
    'team-members',
    '?depth=1&limit=100&sort=order',
  )
  return docs
}
