import { notFound } from 'next/navigation'
import Image from 'next/image'
import Hero from '@/components/Hero'
import SectionWrapper from '@/components/SectionWrapper'
import { researchGroups } from '@/data/research-groups'
import { publications } from '@/data/publications'
import { team } from '@/data/team'
import { programHighlights, whyThisMatters } from '@/data/program-highlights'
import { extractAndorAuthors } from '@/data/author-utils'

export function generateStaticParams() {
  return researchGroups.map((g) => ({ slug: g.slug }))
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  // Use synchronous lookup since generateStaticParams defines all valid slugs
  return params.then(({ slug }) => {
    const group = researchGroups.find((g) => g.slug === slug)
    if (!group) return { title: 'Research | ANDOR' }
    return {
      title: `${group.name} Research | ANDOR`,
      description: group.description,
    }
  })
}

const accentBorderMap: Record<string, string> = {
  'blue-500': 'border-blue-500',
  'emerald-500': 'border-emerald-500',
  'violet-500': 'border-violet-500',
  'amber-600': 'border-amber-600',
  'rose-500': 'border-rose-500',
  'teal-500': 'border-teal-500',
}

const accentBgMap: Record<string, string> = {
  'blue-500': 'bg-blue-50',
  'emerald-500': 'bg-emerald-50',
  'violet-500': 'bg-violet-50',
  'amber-600': 'bg-amber-50',
  'rose-500': 'bg-rose-50',
  'teal-500': 'bg-teal-50',
}

const accentTextMap: Record<string, string> = {
  'blue-500': 'text-blue-700',
  'emerald-500': 'text-emerald-700',
  'violet-500': 'text-violet-700',
  'amber-600': 'text-amber-700',
  'rose-500': 'text-rose-700',
  'teal-500': 'text-teal-700',
}

export default async function DiseaseResearchPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const group = researchGroups.find((g) => g.slug === slug)
  if (!group) notFound()

  const highlights = programHighlights[group.name] ?? []
  const groupPubs = publications.filter((p) => p.researchGroup === group.name)
  const mattersText = whyThisMatters[group.name]
  const investigators = extractAndorAuthors(groupPubs, team)

  // Also include keyInvestigators who may not appear on publications
  const investigatorIds = new Set(investigators.map((m) => m.id))
  const additionalFromGroup = group.keyInvestigators
    .map((name) => team.find((m) => m.name === name))
    .filter((m): m is NonNullable<typeof m> => m != null && !investigatorIds.has(m.id))

  const allInvestigators = [...investigators, ...additionalFromGroup]

  const borderClass = accentBorderMap[group.accentColor] ?? 'border-gray-400'
  const bgClass = accentBgMap[group.accentColor] ?? 'bg-gray-50'
  const textClass = accentTextMap[group.accentColor] ?? 'text-gray-700'

  return (
    <>
      <Hero
        subtitle="Research Program"
        title={group.name}
        description={group.description}
      />

      {/* Why This Matters */}
      {mattersText && (
        <SectionWrapper>
          <div className={`rounded-xl border-l-4 ${borderClass} ${bgClass} p-6 sm:p-8`}>
            <h2 className={`text-lg font-bold ${textClass}`}>Why This Research Matters</h2>
            <p className="mt-3 leading-relaxed text-gray-700">{mattersText}</p>
          </div>
        </SectionWrapper>
      )}

      {/* Investigators */}
      {allInvestigators.length > 0 && (
        <SectionWrapper alt>
          <h2 className="text-2xl font-bold text-[var(--color-primary)]">Investigators</h2>
          <p className="mt-2 text-sm text-gray-500">
            ANDOR members who have contributed to {group.name} research
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {allInvestigators.map((member) => (
              <div key={member.id} className="flex items-center gap-3 rounded-lg border border-gray-100 bg-white p-3">
                {member.imageUrl ? (
                  <Image
                    src={member.imageUrl}
                    alt={member.name}
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-full object-cover object-top"
                  />
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-primary)]/10 text-sm font-semibold text-[var(--color-primary)]">
                    {member.name.split(' ').map((n) => n[0]).join('')}
                  </div>
                )}
                <div className="min-w-0">
                  {member.catalystUrl ? (
                    <a
                      href={member.catalystUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-gray-900 hover:text-[var(--color-accent)]"
                    >
                      {member.name}
                    </a>
                  ) : (
                    <p className="text-sm font-semibold text-gray-900">{member.name}</p>
                  )}
                  <p className="truncate text-xs text-gray-500">{member.title}</p>
                </div>
              </div>
            ))}
          </div>
        </SectionWrapper>
      )}

      {/* Research Highlights */}
      {highlights.length > 0 && (
        <SectionWrapper>
          <h2 className="text-2xl font-bold text-[var(--color-primary)]">Research Highlights</h2>
          <ul className="mt-6 space-y-3">
            {highlights.map((highlight, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <svg
                  className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-accent)]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span className="leading-relaxed text-gray-700">{highlight}</span>
              </li>
            ))}
          </ul>
        </SectionWrapper>
      )}

      {/* Publications */}
      <SectionWrapper alt>
        <div className="flex items-baseline justify-between">
          <h2 className="text-2xl font-bold text-[var(--color-primary)]">Publications</h2>
          {groupPubs.length > 0 && (
            <span className="text-sm text-gray-500">
              {groupPubs.length} paper{groupPubs.length !== 1 ? 's' : ''}
            </span>
          )}
        </div>
        {groupPubs.length > 0 ? (
          <ul className="mt-6 space-y-4">
            {groupPubs.map((pub) => (
              <li key={pub.id} className="rounded-lg border border-gray-100 bg-white p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    {pub.pmid ? (
                      <a
                        href={`https://pubmed.ncbi.nlm.nih.gov/${pub.pmid}/`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-gray-900 hover:text-[var(--color-accent)]"
                      >
                        {pub.title}
                      </a>
                    ) : pub.doi ? (
                      <a
                        href={`https://doi.org/${pub.doi}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-gray-900 hover:text-[var(--color-accent)]"
                      >
                        {pub.title}
                      </a>
                    ) : (
                      <p className="font-medium text-gray-900">{pub.title}</p>
                    )}
                    <p className="mt-1 text-sm text-gray-500">
                      {pub.journal} ({pub.year})
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-gray-400 line-clamp-1">
                      {pub.authors}
                    </p>
                  </div>
                  {pub.pmid && (
                    <a
                      href={`https://pubmed.ncbi.nlm.nih.gov/${pub.pmid}/`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 rounded bg-gray-100 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-gray-500 transition-colors hover:bg-[var(--color-accent)] hover:text-white"
                      title="View on PubMed"
                    >
                      PubMed
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-6 text-sm italic text-gray-400">Publications coming soon</p>
        )}
      </SectionWrapper>
    </>
  )
}
