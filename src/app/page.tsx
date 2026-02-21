import Image from 'next/image'
import Link from 'next/link'
import EditorialSection from '@/components/EditorialSection'
import PullQuote from '@/components/PullQuote'
import StatDisplay from '@/components/StatDisplay'
import { researchGroups } from '@/data/research-groups'
import { publications } from '@/data/publications'
import { whyThisMatters } from '@/data/program-highlights'
import { team } from '@/data/team'

const uniquePubCount = new Set(publications.map((p) => p.title)).size
const featuredTeam = team.filter((m) => m.role === 'faculty' && m.imageUrl)

const heroStats = [
  { value: '700+', label: 'Registry Patients' },
  { value: String(uniquePubCount) + '+', label: 'Publications' },
  { value: '6', label: 'Clinical Trials' },
  { value: '15+', label: 'Investigators' },
]

const impactStats = [
  { value: '700+', label: 'Registry Patients' },
  { value: String(uniquePubCount) + '+', label: 'Peer-Reviewed Papers' },
  { value: '6', label: 'Active Clinical Trials' },
  { value: '8', label: 'Research Programs' },
]

export default function HomePage() {
  return (
    <>
      {/* ── Section 1: Hero ── */}
      <section className="relative bg-[var(--color-primary)] text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-28 sm:py-36 lg:py-44">
          <div className="grid gap-16 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="overline text-gray-400">ANDOR Research Group</p>
              <h1 className="mt-4 font-display text-[clamp(40px,6vw,80px)] leading-[1.05]">
                Advancing the Science of Autoimmune Neurology
              </h1>
              <p className="mt-4 text-sm tracking-wide text-gray-400">
                <span className="font-semibold text-gray-300">A</span>utoimmune{' '}
                <span className="font-semibold text-gray-300">N</span>eurological{' '}
                <span className="font-semibold text-gray-300">D</span>is
                <span className="font-semibold text-gray-300">O</span>rders{' '}
                <span className="font-semibold text-gray-300">R</span>egistry
              </p>
              <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-gray-300">
                A division-wide research collaborative within Mass General Brigham and Harvard Medical School,
                dedicated to understanding and treating rare autoimmune neurological diseases through
                registries, clinical trials, and translational research.
              </p>

              <div className="mt-10 flex items-center gap-6">
                <Image
                  src="/mgb-logo.png"
                  alt="Mass General Brigham"
                  width={140}
                  height={23}
                  className="h-5 w-auto brightness-0 invert opacity-60"
                />
                <Image
                  src="/hms-logo.png"
                  alt="Harvard Medical School"
                  width={140}
                  height={46}
                  className="h-8 w-auto opacity-80"
                />
              </div>
              <p className="mt-3 text-[10px] font-medium uppercase tracking-widest text-gray-500">
                MGB Neurology &middot; Division of Neuroimmunology
              </p>

              <div className="mt-10">
                <Link
                  href="/support"
                  className="inline-flex items-center rounded border border-white/30 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
                >
                  Support Our Research
                </Link>
              </div>
            </div>

            {/* Stats column */}
            <div className="hidden lg:flex flex-col gap-10">
              {heroStats.map((stat) => (
                <StatDisplay key={stat.label} value={stat.value} label={stat.label} light />
              ))}
            </div>
          </div>

          {/* Mobile stats */}
          <div className="mt-16 grid grid-cols-2 gap-8 lg:hidden">
            {heroStats.map((stat) => (
              <StatDisplay key={stat.label} value={stat.value} label={stat.label} light />
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 2: Mission ── */}
      <EditorialSection>
        <div className="grid gap-16 lg:grid-cols-[7fr_4fr]">
          <div>
            <p className="overline">Our Mission</p>
            <h2 className="mt-3 font-display text-[clamp(28px,4vw,44px)]">
              Building the infrastructure to solve rare disease
            </h2>
            <div className="mt-8 max-w-[65ch] space-y-5 text-[17px] leading-relaxed text-[var(--color-ink-secondary)]">
              <p>
                ANDOR was established to create a unified, data-driven research infrastructure across
                Mass General Brigham&apos;s neuroimmunology division. By building federated disease registries,
                shared biorepositories, and standardized clinical databases, we enable investigators to
                collaborate at scale on rare diseases that no single center can study alone.
              </p>
              <p>
                Our approach combines prospective patient registries with translational laboratory studies,
                pragmatic clinical trials, and multi-center collaborations with leading institutions worldwide.
                This infrastructure accelerates discovery and improves outcomes for patients with autoimmune
                neurological conditions.
              </p>
            </div>
            <p className="mt-8 text-sm text-[var(--color-ink-tertiary)]">
              Funded by NIH, PCORI, the Department of Defense, NMSS, AAN, and philanthropic support.
            </p>
          </div>

          <div className="space-y-10">
            <PullQuote
              quote="We enable investigators to collaborate at scale on rare diseases that no single center can study alone."
            />

            <div>
              <p className="overline mb-4">Infrastructure</p>
              <ul className="space-y-4">
                {[
                  'Prospective disease-specific registries (700+ patients)',
                  'Centralized biorepository (serum, CSF, PBMCs, tissue)',
                  'REDCap longitudinal databases with standardized outcomes',
                  'Collaborative agreements with partner institutions worldwide',
                ].map((item) => (
                  <li key={item} className="border-b border-[var(--color-rule)] pb-4 text-sm text-[var(--color-ink-secondary)]">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </EditorialSection>

      {/* ── Section 3: Research Programs ── */}
      <EditorialSection>
        <div className="grid gap-16 lg:grid-cols-[1fr_380px]">
          <div>
            <p className="overline">Research Programs</p>
            <h2 className="mt-3 font-display text-[clamp(28px,4vw,44px)]">
              Eight interconnected programs
            </h2>
            <p className="mt-4 max-w-[65ch] text-[17px] text-[var(--color-ink-secondary)]">
              Each program leverages shared infrastructure, federated registries, and a collaborative
              team to tackle rare autoimmune neurological diseases.
            </p>

            <div className="mt-10">
              {researchGroups.map((group) => (
                <Link
                  key={group.id}
                  href={`/research/${group.slug}`}
                  className="group flex items-baseline justify-between border-b border-[var(--color-rule)] py-4 transition-colors hover:border-[var(--color-primary)]"
                >
                  <div className="min-w-0">
                    <h3 className="font-semibold text-[#1a1614] group-hover:text-[var(--color-primary)]">
                      {group.name}
                    </h3>
                    <p className="mt-1 text-sm text-[var(--color-ink-tertiary)] line-clamp-1 max-w-lg">
                      {group.description.split('.')[0]}.
                    </p>
                  </div>
                  {group.patientCount && (
                    <span className="ml-4 shrink-0 text-sm font-medium tabular-nums text-[var(--color-ink-tertiary)]">
                      {group.patientCount} patients
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>

          {/* Sticky featured panel */}
          <div className="hidden lg:block">
            <div className="sticky top-24 rounded-sm border-l-2 border-[var(--color-accent)] bg-[var(--color-surface-alt)] p-8">
              <p className="overline">Featured Program</p>
              <h3 className="mt-3 font-display text-2xl">MOGAD</h3>
              <p className="mt-4 text-sm leading-relaxed text-[var(--color-ink-secondary)]">
                {whyThisMatters['MOGAD']?.split('.').slice(0, 2).join('.') + '.'}
              </p>
              <div className="mt-6">
                <StatDisplay value="~350" label="Registry patients" />
              </div>
              <Link
                href="/research/mogad"
                className="mt-6 inline-flex items-center text-sm font-medium text-[var(--color-accent)] hover:underline"
              >
                Learn more
                <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </EditorialSection>

      {/* ── Section 4: Impact ── */}
      <EditorialSection dark rule={false}>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {impactStats.map((stat) => (
            <StatDisplay key={stat.label} value={stat.value} label={stat.label} light />
          ))}
        </div>
        <p className="mt-12 text-center text-sm text-gray-400">
          Published in <em>JAMA Neurology</em>, <em>Nature Reviews Neurology</em>,{' '}
          <em>Neurology: Neuroimmunology &amp; Neuroinflammation</em>,{' '}
          <em>The Lancet Neurology</em>, and <em>Annals of Neurology</em>.
        </p>
      </EditorialSection>

      {/* ── Section 5: Flagship Trial ── */}
      <EditorialSection>
        <div className="grid gap-16 lg:grid-cols-[7fr_4fr]">
          <div>
            <p className="overline">Flagship Clinical Trial</p>
            <h2 className="mt-3 font-display text-[clamp(28px,4vw,44px)]">
              BEST-NMOSD
            </h2>
            <p className="mt-6 max-w-[65ch] text-[17px] leading-relaxed text-[var(--color-ink-secondary)]">
              One of the first head-to-head pragmatic clinical trials comparing
              disease-modifying treatments in NMOSD. This ANDOR-led, PCORI-funded international
              study provides the real-world comparative effectiveness evidence clinicians need
              to guide treatment decisions.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-[var(--color-ink-tertiary)]">
              <span>PCORI-funded</span>
              <span className="text-[var(--color-rule)]">&middot;</span>
              <span>International</span>
              <span className="text-[var(--color-rule)]">&middot;</span>
              <span>200 patients</span>
            </div>
            <div className="mt-6">
              <a
                href="https://best-nmosd.org"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm font-medium text-[var(--color-accent)] hover:underline"
              >
                Visit best-nmosd.org
                <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>

          <div className="flex items-center">
            <PullQuote
              quote="NMOSD can cause devastating attacks of blindness and paralysis. While three FDA-approved treatments now exist, we still don't know which works best for which patients."
            />
          </div>
        </div>
      </EditorialSection>

      {/* ── Section 6: Team ── */}
      <EditorialSection>
        <div className="grid gap-16 lg:grid-cols-[5fr_7fr]">
          <div>
            <p className="overline">Our Team</p>
            <h2 className="mt-3 font-display text-[clamp(28px,4vw,44px)]">
              {team.length} investigators
            </h2>
            <p className="mt-4 text-[17px] text-[var(--color-ink-secondary)]">
              A multidisciplinary group of neurologists, immunologists, and research staff
              from across Mass General Brigham.
            </p>
            <Link
              href="/team"
              className="mt-6 inline-flex items-center text-sm font-medium text-[var(--color-accent)] hover:underline"
            >
              Meet the full team
              <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {featuredTeam.map((member) => (
              <div key={member.id} className="flex items-center gap-4">
                {member.imageUrl ? (
                  <Image
                    src={member.imageUrl}
                    alt={member.name}
                    width={80}
                    height={80}
                    className="h-20 w-20 shrink-0 rounded-full object-cover object-top"
                  />
                ) : (
                  <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-white/10 text-lg font-semibold text-white/60">
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
                  <p className="mt-0.5 text-xs text-[var(--color-ink-tertiary)]">{member.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </EditorialSection>

      {/* ── Section 7: CTA ── */}
      <section className="bg-[var(--color-primary)] py-24 sm:py-32 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-[clamp(28px,4vw,44px)]">
            Support the science
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-[17px] leading-relaxed text-gray-300">
            Your philanthropic investment accelerates discovery for patients with rare autoimmune
            neurological diseases. Help us expand our registries, fund clinical trials, and train
            the next generation of neuroimmunology investigators.
          </p>
          <div className="mt-10">
            <Link
              href="/support"
              className="inline-flex items-center rounded border border-white/30 px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
            >
              Learn How to Give
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
