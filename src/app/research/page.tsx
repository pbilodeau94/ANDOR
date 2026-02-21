import Link from 'next/link'
import PageHero from '@/components/PageHero'
import EditorialSection from '@/components/EditorialSection'
import { researchGroups } from '@/data/research-groups'
import { publications } from '@/data/publications'

const uniquePubCount = new Set(publications.map((p) => p.title)).size

export default function ResearchPage() {
  return (
    <>
      <PageHero
        overline="Research Programs"
        title="Advancing Autoimmune Neurology"
        description={`Our team has published over ${uniquePubCount} peer-reviewed papers across eight core research areas. Each program leverages shared infrastructure, federated registries, and a collaborative team.`}
      />

      {/* Program list */}
      <EditorialSection rule={false}>
        <div className="mx-auto max-w-4xl">
          {researchGroups.map((group) => {
            const pubCount = publications.filter(
              (p) => p.researchGroup === group.name
            ).length
            return (
              <Link
                key={group.id}
                href={`/research/${group.slug}`}
                className="group flex items-baseline justify-between border-b border-[var(--color-rule)] py-5 transition-colors hover:border-[var(--color-primary)]"
              >
                <div className="min-w-0">
                  <h2 className="text-lg font-semibold text-[#1a1614] group-hover:text-[var(--color-primary)]">
                    {group.name}
                  </h2>
                  <p className="mt-1 text-sm text-[var(--color-ink-tertiary)] line-clamp-1 max-w-xl">
                    {group.description.split('.')[0]}.
                  </p>
                </div>
                <div className="ml-4 flex shrink-0 items-center gap-4 text-sm text-[var(--color-ink-tertiary)]">
                  {group.patientCount && (
                    <span className="tabular-nums">{group.patientCount} patients</span>
                  )}
                  <span>&middot;</span>
                  <span>{pubCount} publications</span>
                  <span>&middot;</span>
                  <span>{group.keyInvestigators.length} investigators</span>
                </div>
              </Link>
            )
          })}
        </div>
      </EditorialSection>

      {/* Shared Infrastructure */}
      <EditorialSection>
        <div className="mx-auto max-w-4xl">
          <p className="overline">Shared Infrastructure</p>
          <h2 className="mt-3 font-display text-[clamp(28px,4vw,44px)]">
            Amplifying collaborative discovery
          </h2>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {[
              { label: 'Federated Registries', stat: '700+', unit: 'patients enrolled', desc: 'Disease-specific registries spanning MOGAD, NMOSD, encephalitis, neurosarcoidosis, and CNS vasculitis.' },
              { label: 'Biorepository', stat: '4', unit: 'sample types', desc: 'Serum, CSF, PBMCs, and tissue linked to detailed clinical phenotyping.' },
              { label: 'REDCap Databases', stat: '6', unit: 'disease areas', desc: 'Longitudinal databases with validated outcome instruments for multi-center analyses.' },
              { label: 'Global Collaborations', stat: '15+', unit: 'institutions', desc: 'Pooled analyses across institutions worldwide for ultra-rare conditions.' },
            ].map((item) => (
              <div key={item.label} className="rounded-lg border border-[var(--color-rule)] p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-primary)]">{item.label}</p>
                <div className="mt-2 flex items-baseline gap-1.5">
                  <span className="font-display text-2xl text-[#1a1614]">{item.stat}</span>
                  <span className="text-sm text-[var(--color-ink-tertiary)]">{item.unit}</span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-ink-secondary)]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </EditorialSection>
    </>
  )
}
