import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import Hero from '@/components/Hero'
import SectionWrapper from '@/components/SectionWrapper'
import { researchGroups } from '@/data/research-groups'
import { publications } from '@/data/publications'
import { team } from '@/data/team'
import { programHighlights, whyThisMatters } from '@/data/program-highlights'
import PublicationsList from './PublicationsList'

export function generateStaticParams() {
  return researchGroups.map((g) => ({ slug: g.slug }))
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
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
  'indigo-500': 'border-indigo-500',
}

const accentBgMap: Record<string, string> = {
  'blue-500': 'bg-blue-50',
  'emerald-500': 'bg-emerald-50',
  'violet-500': 'bg-violet-50',
  'amber-600': 'bg-amber-50',
  'rose-500': 'bg-rose-50',
  'teal-500': 'bg-teal-50',
  'indigo-500': 'bg-indigo-50',
}

const accentTextMap: Record<string, string> = {
  'blue-500': 'text-blue-700',
  'emerald-500': 'text-emerald-700',
  'violet-500': 'text-violet-700',
  'amber-600': 'text-amber-700',
  'rose-500': 'text-rose-700',
  'teal-500': 'text-teal-700',
  'indigo-500': 'text-indigo-700',
}

const borderLeftMap: Record<string, string> = {
  'blue-500': 'border-l-blue-500',
  'emerald-500': 'border-l-emerald-500',
  'violet-500': 'border-l-violet-500',
  'amber-600': 'border-l-amber-600',
  'rose-500': 'border-l-rose-500',
  'teal-500': 'border-l-teal-500',
  'indigo-500': 'border-l-indigo-500',
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
  const featuredPubs = groupPubs.filter((p) => p.featured)
  const mattersText = whyThisMatters[group.name]

  // Use keyInvestigators from research group data (curated list)
  const investigators = group.keyInvestigators
    .map((name) => team.find((m) => m.name === name))
    .filter((m): m is NonNullable<typeof m> => m != null)

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

      {/* Program Navigation */}
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-5xl overflow-x-auto px-4 sm:px-6 lg:px-8">
          <nav className="-mb-px flex gap-1" aria-label="Research programs">
            {researchGroups.map((g) => {
              const isActive = g.slug === slug
              const leftBorder = borderLeftMap[g.accentColor] ?? 'border-l-gray-400'
              return (
                <Link
                  key={g.id}
                  href={`/research/${g.slug}`}
                  className={`whitespace-nowrap border-b-2 px-3 py-3 text-sm font-medium transition-colors ${
                    isActive
                      ? 'border-[var(--color-primary)] text-[var(--color-primary)]'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  {g.name}
                </Link>
              )
            })}
          </nav>
        </div>
      </div>

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
      {investigators.length > 0 && (
        <SectionWrapper alt>
          <h2 className="text-2xl font-bold text-[var(--color-primary)]">Investigators</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {investigators.map((member) => (
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
          <h2 className="text-2xl font-bold text-[var(--color-primary)]">Key Publications</h2>
          {groupPubs.length > 0 && (
            <span className="text-sm text-gray-500">
              {groupPubs.length} total paper{groupPubs.length !== 1 ? 's' : ''}
            </span>
          )}
        </div>
        <PublicationsList
          featuredPubs={JSON.parse(JSON.stringify(featuredPubs))}
          allPubs={JSON.parse(JSON.stringify(groupPubs))}
        />
      </SectionWrapper>
    </>
  )
}
