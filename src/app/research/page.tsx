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
          <p className="mt-4 max-w-[65ch] text-[17px] text-[var(--color-ink-secondary)]">
            All ANDOR programs benefit from shared infrastructure that enables
            cross-disease collaboration and accelerates research at scale.
          </p>

          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            <div className="space-y-5 text-[17px] leading-relaxed text-[var(--color-ink-secondary)]">
              <p>
                Our federated disease-specific registries span conditions from MOGAD and
                NMOSD to autoimmune encephalitis, neurosarcoidosis, and CNS vasculitis, with
                over 700 patients enrolled across the collaborative.
              </p>
              <p>
                A centralized biorepository collects and stores serum, CSF, PBMCs, and
                tissue samples linked to detailed clinical phenotyping, enabling biomarker
                discovery and translational research.
              </p>
            </div>
            <div className="space-y-5 text-[17px] leading-relaxed text-[var(--color-ink-secondary)]">
              <p>
                Standardized REDCap longitudinal databases capture outcomes using validated
                instruments, creating datasets suitable for multi-center analyses and
                pragmatic clinical trials.
              </p>
              <p>
                Collaborative agreements with institutions worldwide — including Mayo Clinic,
                Yale, McGill, UCSF, and Charité Berlin — enable pooled analyses of conditions
                too rare for any single center to study alone.
              </p>
            </div>
          </div>
        </div>
      </EditorialSection>
    </>
  )
}
