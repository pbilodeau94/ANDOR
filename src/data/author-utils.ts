import type { TeamMember } from './team'
import type { Publication } from './publications'

/**
 * Extract the last name from a citation-format author string like "Bilodeau PA" or "Levy M".
 */
function extractLastName(authorStr: string): string {
  const clean = authorStr.trim()
  if (!clean) return ''
  const parts = clean.split(/\s+/)
  return parts[0].replace(/,/g, '').toLowerCase()
}

/**
 * Given a set of publications and the team roster, return unique TeamMembers
 * whose last name appears as an author on at least one publication.
 * Results are ordered by number of publications (descending).
 */
export function extractAndorAuthors(
  pubs: Publication[],
  teamMembers: TeamMember[]
): TeamMember[] {
  const lastNameToMember = new Map<string, TeamMember>()
  for (const m of teamMembers) {
    const lastName = m.name.split(' ').pop()?.toLowerCase()
    if (lastName) lastNameToMember.set(lastName, m)
  }

  const counts = new Map<string, number>()

  for (const pub of pubs) {
    const authors = pub.authors.split(',').map((a) => a.trim()).filter(Boolean)
    const seen = new Set<string>()
    for (const a of authors) {
      const lastName = extractLastName(a)
      if (lastName && lastNameToMember.has(lastName) && !seen.has(lastName)) {
        seen.add(lastName)
        counts.set(lastName, (counts.get(lastName) ?? 0) + 1)
      }
    }
  }

  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([lastName]) => lastNameToMember.get(lastName)!)
}
