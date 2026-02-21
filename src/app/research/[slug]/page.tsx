import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import PageHero from '@/components/PageHero'
import EditorialSection from '@/components/EditorialSection'
import PullQuote from '@/components/PullQuote'
import StatDisplay from '@/components/StatDisplay'
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

  const investigators = group.keyInvestigators
    .map((name) => team.find((m) => m.name === name))
    .filter((m): m is NonNullable<typeof m> => m != null)

  return (
    <>
      <PageHero
        overline="Research Program"
        title={group.name}
        description={group.description}
      >
        {group.patientCount && (
          <div className="mt-8">
            <StatDisplay value={group.patientCount} label="Registry patients" light />
          </div>
        )}
      </PageHero>

      {/* Program Navigation */}
      <div className="border-b border-[var(--color-rule)] bg-[var(--color-surface)]">
        <div className="mx-auto max-w-5xl overflow-x-auto px-4 sm:px-6 lg:px-8">
          <nav className="-mb-px flex gap-1" aria-label="Research programs">
            {researchGroups.map((g) => {
              const isActive = g.slug === slug
              return (
                <Link
                  key={g.id}
                  href={`/research/${g.slug}`}
                  className={`whitespace-nowrap border-b-2 px-3 py-3 text-sm font-medium transition-colors ${
                    isActive
                      ? 'border-[var(--color-primary)] text-[var(--color-primary)]'
                      : 'border-transparent text-[var(--color-ink-tertiary)] hover:border-[var(--color-rule)] hover:text-[var(--color-ink-secondary)]'
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
        <EditorialSection rule={false}>
          <div className="mx-auto max-w-3xl">
            <p className="overline">Why This Research Matters</p>
            <p className="mt-4 max-w-[65ch] text-[17px] leading-relaxed text-[var(--color-ink-secondary)]">
              {mattersText}
            </p>
          </div>
        </EditorialSection>
      )}

      {/* Research Highlights */}
      {highlights.length > 0 && (
        <EditorialSection>
          <div className="mx-auto max-w-3xl">
            <p className="overline">Research Highlights</p>
            <h2 className="mt-3 font-display text-[clamp(28px,4vw,36px)]">Key contributions</h2>
            <ol className="mt-8 space-y-4 list-decimal list-inside">
              {highlights.map((highlight, idx) => (
                <li
                  key={idx}
                  className="text-[17px] leading-relaxed text-[var(--color-ink-secondary)] marker:font-semibold marker:text-[var(--color-primary)]"
                >
                  {highlight}
                </li>
              ))}
            </ol>
          </div>
        </EditorialSection>
      )}

      {/* Investigators */}
      {investigators.length > 0 && (
        <EditorialSection>
          <div className="mx-auto max-w-3xl">
            <p className="overline">Investigators</p>
            <h2 className="mt-3 font-display text-[clamp(28px,4vw,36px)]">
              {investigators.length} researchers
            </h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {investigators.map((member) => (
                <div key={member.id} className="flex items-center gap-3">
                  {member.imageUrl ? (
                    <Image
                      src={member.imageUrl}
                      alt={member.name}
                      width={48}
                      height={48}
                      className="h-12 w-12 rounded-full object-cover object-top"
                    />
                  ) : (
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-surface-alt)] text-sm font-semibold text-[var(--color-primary)]">
                      {member.name.split(' ').map((n) => n[0]).join('')}
                    </div>
                  )}
                  <div className="min-w-0">
                    {member.catalystUrl ? (
                      <a
                        href={member.catalystUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-semibold text-[#1a1614] hover:text-[var(--color-accent)]"
                      >
                        {member.name}
                      </a>
                    ) : (
                      <p className="text-sm font-semibold text-[#1a1614]">{member.name}</p>
                    )}
                    <p className="text-xs text-[var(--color-ink-tertiary)]">{member.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </EditorialSection>
      )}

      {/* Publications */}
      <EditorialSection>
        <div className="mx-auto max-w-3xl">
          <div className="flex items-baseline justify-between">
            <div>
              <p className="overline">Publications</p>
              <h2 className="mt-3 font-display text-[clamp(28px,4vw,36px)]">Key papers</h2>
            </div>
            {groupPubs.length > 0 && (
              <span className="text-sm text-[var(--color-ink-tertiary)]">
                {groupPubs.length} total
              </span>
            )}
          </div>
          <PublicationsList
            featuredPubs={JSON.parse(JSON.stringify(featuredPubs))}
            allPubs={JSON.parse(JSON.stringify(groupPubs))}
          />
        </div>
      </EditorialSection>
    </>
  )
}
