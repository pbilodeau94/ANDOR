import Image from 'next/image'
import Hero from '@/components/Hero'
import SectionWrapper from '@/components/SectionWrapper'
import StatsBar from '@/components/StatsBar'
import ResearchGroupCard from '@/components/ResearchGroupCard'
import { researchGroups } from '@/data/research-groups'
import { publications } from '@/data/publications'
import { team } from '@/data/team'
import Link from 'next/link'

const featuredTeam = team.filter((m) => m.role === 'faculty' && m.imageUrl)

// Deduplicate publications by title for unique count
const uniquePubCount = new Set(publications.map((p) => p.title)).size

const heroStats = [
  { value: '8', label: 'Research Programs' },
  { value: '15+', label: 'Investigators' },
  { value: '60+', label: 'Active Projects' },
  { value: '700+', label: 'Registry Patients' },
]

const impactStats = [
  { value: String(uniquePubCount) + '+', label: 'Publications' },
  { value: '69', label: 'Research Projects' },
  { value: '6', label: 'Clinical Trials' },
  { value: '7+', label: 'Partner Institutions' },
]

export default function HomePage() {
  return (
    <>
      <Hero
        variant="centered"
        showLogo
        title="Advancing Autoimmune Neurology Research"
        description="Autoimmune Neurological DisOrders Registry &mdash; advancing the understanding and treatment of rare autoimmune neurological diseases through collaborative, data-driven research."
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
        <div className="animate-fade-in-up-delay-3 mt-10 flex flex-col items-center gap-3">
          <div className="flex items-center gap-6">
            <Image
              src="/mgb-logo.png"
              alt="Mass General Brigham"
              width={140}
              height={23}
              className="h-5 w-auto brightness-0 invert opacity-70"
            />
            <Image
              src="/hms-logo.png"
              alt="Harvard Medical School"
              width={140}
              height={46}
              className="h-8 w-auto brightness-0 invert opacity-70"
            />
          </div>
          <p className="text-xs font-medium uppercase tracking-widest text-gray-400">
            MGB Neurology &middot; Division of Neuroimmunology
          </p>
        </div>
      </Hero>

      {/* Research Groups */}
      <SectionWrapper>
        <h2 className="text-center text-3xl font-bold text-[var(--color-primary)]">Research Programs</h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-gray-600">
          Our collaborative spans eight core research areas, each with dedicated registries, biorepositories, and active clinical studies.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {researchGroups.map((group) => (
            <ResearchGroupCard
              key={group.id}
              group={group}
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
            <p className="mt-4 text-sm leading-relaxed text-gray-500">
              Our research is funded by NIH, PCORI, the Department of Defense, NMSS, AAN, and philanthropic support.
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-[var(--color-primary)]">Research Infrastructure</h2>
            <ul className="mt-4 space-y-3">
              {[
                'Prospective disease-specific registries (700+ patients across conditions)',
                'Centralized biorepository (serum, CSF, PBMCs, tissue)',
                'REDCap longitudinal databases with standardized outcomes',
                'Collaborative agreements with partner institutions worldwide',
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

      {/* Our Team */}
      <SectionWrapper alt>
        <div className="text-center">
          <h2 className="text-3xl font-bold text-[var(--color-primary)]">Our Team</h2>
          <p className="mx-auto mt-3 max-w-2xl text-gray-600">
            A multidisciplinary group of neurologists, immunologists, and research staff dedicated to advancing care for patients with rare autoimmune neurological diseases.
          </p>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredTeam.map((member) => (
            <div key={member.id} className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4">
              <Image
                src={member.imageUrl!}
                alt={member.name}
                width={56}
                height={56}
                className="h-14 w-14 rounded-full object-cover object-top"
              />
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
                <p className="mt-0.5 truncate text-xs text-gray-500">{member.title}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link
            href="/team"
            className="inline-flex items-center text-sm font-semibold text-[var(--color-accent)] hover:underline"
          >
            Meet the full team
            <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </SectionWrapper>

      {/* CTA */}
      <SectionWrapper>
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
