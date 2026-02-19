import Hero from '@/components/Hero'
import SectionWrapper from '@/components/SectionWrapper'
import StatsBar from '@/components/StatsBar'
import ResearchGroupCard from '@/components/ResearchGroupCard'
import { researchGroups } from '@/data/research-groups'
import { projects } from '@/data/projects'
import Link from 'next/link'

function countActiveProjects(groupName: string): number {
  const diseaseMap: Record<string, string[]> = {
    MOGAD: ['MOGAD'],
    NMOSD: ['NMOSD'],
    'Autoimmune Encephalitis': ['Autoimmune Encephalitis'],
    Neurosarcoidosis: ['Neurosarcoidosis'],
    'CNS Vasculitis': ['Vasculitis'],
    'Translational Neuroimmunology': ['MS'],
  }
  const diseases = diseaseMap[groupName] ?? []
  const diseaseSet = new Set(diseases.map((d) => d.toLowerCase()))
  return projects.filter(
    (p) =>
      p.stage !== 'completed' &&
      p.stage !== 'published' &&
      p.diseases.some((d) => diseaseSet.has(d.toLowerCase()))
  ).length
}

const heroStats = [
  { value: '6', label: 'Research Groups' },
  { value: '30+', label: 'Investigators' },
  { value: '60+', label: 'Active Projects' },
  { value: '700+', label: 'Registry Patients' },
]

const impactStats = [
  { value: '69', label: 'Research Projects' },
  { value: '16', label: 'Grant Applications' },
  { value: '3', label: 'Clinical Trials' },
  { value: '7', label: 'Partner Institutions' },
]

export default function HomePage() {
  return (
    <>
      <Hero
        subtitle="MGB Neurology &middot; Division of Neuroimmunology"
        title="ANDOR Research Group"
        description="Autoimmune Neurological Disorders Observational Studies & Registry — advancing the understanding and treatment of rare autoimmune neurological diseases through collaborative, data-driven research."
        cta={{ label: 'Support Our Research', href: '/support' }}
      >
        <div className="animate-fade-in-up-delay-3 mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4">
          {heroStats.map((stat) => (
            <div key={stat.label}>
              <div className="text-3xl font-bold text-white">{stat.value}</div>
              <div className="text-sm text-gray-300">{stat.label}</div>
            </div>
          ))}
        </div>
      </Hero>

      {/* Research Groups */}
      <SectionWrapper>
        <h2 className="text-center text-3xl font-bold text-[var(--color-primary)]">Research Programs</h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-gray-600">
          Our collaborative spans six core research areas, each with dedicated registries, biorepositories, and active clinical studies.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {researchGroups.map((group) => (
            <ResearchGroupCard
              key={group.id}
              group={group}
              projectCount={countActiveProjects(group.name)}
            />
          ))}
        </div>
      </SectionWrapper>

      {/* Mission & Approach */}
      <SectionWrapper alt>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold text-[var(--color-primary)]">Our Mission</h2>
            <p className="mt-4 leading-relaxed text-gray-600">
              ANDOR was established to create a unified, data-driven research infrastructure across
              Mass General Brigham&apos;s neuroimmunology division. By building federated disease registries,
              shared biorepositories, and standardized clinical databases, we enable investigators to
              collaborate at scale on rare diseases that no single center can study alone.
            </p>
            <p className="mt-4 leading-relaxed text-gray-600">
              Our approach combines prospective patient registries with translational laboratory studies,
              pragmatic clinical trials, and multi-center collaborations with leading institutions worldwide.
              This infrastructure accelerates discovery and improves outcomes for patients with autoimmune
              neurological conditions.
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-[var(--color-primary)]">Research Infrastructure</h2>
            <ul className="mt-4 space-y-3">
              {[
                'Prospective disease-specific registries (700+ patients across conditions)',
                'Centralized biorepository (serum, CSF, PBMCs, tissue)',
                'REDCap longitudinal databases with standardized outcomes',
                'Collaborative agreements with 7+ partner institutions',
                'Cell-based assay laboratory for antibody testing',
                'Advanced imaging protocols (7T MRI, central vein sign)',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <svg
                    className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-accent)]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </SectionWrapper>

      {/* Impact Stats */}
      <SectionWrapper>
        <h2 className="mb-10 text-center text-3xl font-bold text-[var(--color-primary)]">Research Impact</h2>
        <StatsBar stats={impactStats} />
      </SectionWrapper>

      {/* CTA */}
      <SectionWrapper alt>
        <div className="text-center">
          <h2 className="text-3xl font-bold text-[var(--color-primary)]">Support Our Research</h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            Your philanthropic investment accelerates discovery for patients with rare autoimmune
            neurological diseases. Help us expand our registries, fund clinical trials, and train
            the next generation of neuroimmunology investigators.
          </p>
          <Link
            href="/support"
            className="mt-8 inline-flex items-center rounded-lg bg-[var(--color-primary)] px-8 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-[var(--color-primary-light)] hover:shadow-xl"
          >
            Learn How to Give
            <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </SectionWrapper>
    </>
  )
}
