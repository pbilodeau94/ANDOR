'use client'

import Link from 'next/link'
import { getRelatedGrants, getRelatedProjects, getRelatedTrials, getRelatedAgreements } from '@/data/cross-links'

type RelatedEntitiesProps = {
  diseases: string[]
  excludeId?: string
  exclude?: ('grants' | 'projects' | 'trials' | 'agreements')[]
}

export default function RelatedEntities({ diseases, excludeId, exclude = [] }: RelatedEntitiesProps) {
  if (diseases.length === 0) return null

  const grants = exclude.includes('grants') ? [] : getRelatedGrants(diseases, excludeId)
  const projects = exclude.includes('projects') ? [] : getRelatedProjects(diseases, excludeId)
  const trials = exclude.includes('trials') ? [] : getRelatedTrials(diseases, excludeId)
  const agreements = exclude.includes('agreements') ? [] : getRelatedAgreements(diseases, excludeId)

  const total = grants.length + projects.length + trials.length + agreements.length
  if (total === 0) return null

  return (
    <div>
      <span className="text-xs font-semibold uppercase text-gray-400">Related</span>
      <div className="mt-1 flex flex-wrap gap-1.5">
        {grants.map((g) => (
          <Link
            key={g.id}
            href="/portal/grants"
            className="inline-flex rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-medium text-blue-600 hover:bg-blue-100"
          >
            Grant: {g.title.length > 40 ? g.title.slice(0, 40) + '...' : g.title}
          </Link>
        ))}
        {projects.map((p) => (
          <Link
            key={p.id}
            href="/portal/projects"
            className="inline-flex rounded-full bg-violet-50 px-2 py-0.5 text-[10px] font-medium text-violet-600 hover:bg-violet-100"
          >
            Project: {p.title.length > 40 ? p.title.slice(0, 40) + '...' : p.title}
          </Link>
        ))}
        {trials.map((t) => (
          <Link
            key={t.id}
            href="/portal/trials"
            className="inline-flex rounded-full bg-teal-50 px-2 py-0.5 text-[10px] font-medium text-teal-600 hover:bg-teal-100"
          >
            Trial: {t.shortName}
          </Link>
        ))}
        {agreements.map((a) => (
          <Link
            key={a.id}
            href="/portal/agreements"
            className="inline-flex rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-medium text-amber-600 hover:bg-amber-100"
          >
            Agreement: {a.partner}
          </Link>
        ))}
      </div>
    </div>
  )
}
