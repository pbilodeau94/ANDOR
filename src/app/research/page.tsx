import Link from 'next/link'
import Hero from '@/components/Hero'
import SectionWrapper from '@/components/SectionWrapper'
import ResearchGroupCard from '@/components/ResearchGroupCard'
import { researchGroups } from '@/data/research-groups'
import { publications } from '@/data/publications'

// Deduplicate publications by title for unique count
const uniquePubCount = new Set(publications.map((p) => p.title)).size

export default function ResearchPage() {
  return (
    <>
      <Hero
        subtitle="Research Programs"
        title="Advancing Autoimmune Neurology"
        description="ANDOR's research spans six interconnected programs, each leveraging shared infrastructure, federated registries, and a collaborative team to tackle rare autoimmune neurological diseases."
      />

      <SectionWrapper>
        <p className="mx-auto max-w-3xl text-center leading-relaxed text-gray-600">
          Our team has published over {uniquePubCount} peer-reviewed papers across
          six core research areas. Select a program below to learn more.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {researchGroups.map((group) => {
            const pubCount = publications.filter(
              (p) => p.researchGroup === group.name
            ).length
            return (
              <div key={group.id} className="flex flex-col">
                <ResearchGroupCard group={group} />
                <div className="mt-2 flex items-center gap-3 px-1">
                  <span className="text-xs text-gray-400">
                    {pubCount} publication{pubCount !== 1 ? 's' : ''}
                  </span>
                  <span className="text-xs text-gray-300">&middot;</span>
                  <span className="text-xs text-gray-400">
                    {group.keyInvestigators.length} investigator{group.keyInvestigators.length !== 1 ? 's' : ''}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </SectionWrapper>

      {/* Research Infrastructure */}
      <SectionWrapper alt>
        <h2 className="text-center text-2xl font-bold text-[var(--color-primary)]">
          Shared Research Infrastructure
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-gray-600">
          All ANDOR programs benefit from shared infrastructure that amplifies
          collaborative discovery across diseases.
        </p>
        <div className="mx-auto mt-8 grid max-w-4xl gap-4 sm:grid-cols-2">
          {[
            'Federated disease-specific registries across MGB',
            'Centralized biorepository (serum, CSF, PBMCs, tissue)',
            'REDCap longitudinal databases with standardized outcomes',
            'Collaborative agreements with 7+ partner institutions',
            'Cell-based assay laboratory for antibody testing',
            'Advanced imaging protocols (7T MRI, central vein sign)',
          ].map((item) => (
            <div key={item} className="flex items-start gap-3 rounded-lg border border-gray-100 bg-white p-4">
              <svg
                className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-accent)]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm text-gray-700">{item}</span>
            </div>
          ))}
        </div>
      </SectionWrapper>
    </>
  )
}
