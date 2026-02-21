import Image from 'next/image'
import Link from 'next/link'
import Logo from '@/components/Logo'
import EditorialSection from '@/components/EditorialSection'
import StatDisplay from '@/components/StatDisplay'
import { researchGroups } from '@/data/research-groups'
import { publications } from '@/data/publications'
import { team } from '@/data/team'

const uniquePubCount = new Set(publications.map((p) => p.title)).size
const featuredTeam = team.filter((m) => m.role === 'faculty' && m.imageUrl)

const heroStats = [
  { value: '700+', label: 'Registry Patients' },
  { value: String(uniquePubCount) + '+', label: 'Publications' },
  { value: '6', label: 'Clinical Trials' },
  { value: '15+', label: 'Investigators' },
]

export default function HomePage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative bg-[var(--color-primary)] text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40">
          <div className="grid gap-12 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <Logo className="h-10 text-white mb-6" />
              <p className="text-sm tracking-wide text-gray-400">
                <span className="font-semibold text-gray-300">A</span>utoimmune{' '}
                <span className="font-semibold text-gray-300">N</span>eurological{' '}
                <span className="font-semibold text-gray-300">D</span>is
                <span className="font-semibold text-gray-300">O</span>rders{' '}
                <span className="font-semibold text-gray-300">R</span>egistry
              </p>
              <h1 className="mt-4 font-display text-[clamp(36px,5vw,72px)] leading-[1.08]">
                Advancing the Science of Autoimmune Neurology
              </h1>
              <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-gray-300">
                A division-wide research collaborative within Mass General Brigham and Harvard Medical School,
                dedicated to understanding and treating rare autoimmune neurological diseases through
                registries, clinical trials, and translational research.
              </p>

              <div className="mt-8 flex items-center gap-6">
                <Image
                  src="/mgb-logo.png"
                  alt="Mass General Brigham"
                  width={140}
                  height={23}
                  className="h-5 w-auto opacity-80"
                />
                <Image
                  src="/hms-logo.png"
                  alt="Harvard Medical School"
                  width={140}
                  height={46}
                  className="h-8 w-auto opacity-80"
                />
              </div>

              <div className="mt-8">
                <Link
                  href="/support"
                  className="inline-flex items-center rounded border border-white/30 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
                >
                  Support Our Research
                </Link>
              </div>
            </div>

            {/* Stats column */}
            <div className="hidden lg:flex flex-col gap-8">
              {heroStats.map((stat) => (
                <StatDisplay key={stat.label} value={stat.value} label={stat.label} light />
              ))}
            </div>
          </div>

          {/* Mobile stats */}
          <div className="mt-12 grid grid-cols-2 gap-6 lg:hidden">
            {heroStats.map((stat) => (
              <StatDisplay key={stat.label} value={stat.value} label={stat.label} light />
            ))}
          </div>
        </div>
      </section>

      {/* ── Mission ── */}
      <EditorialSection>
        <div className="grid gap-12 lg:grid-cols-[7fr_4fr]">
          <div>
            <p className="overline">Our Mission</p>
            <h2 className="mt-3 font-display text-[clamp(28px,4vw,44px)]">
              Building the infrastructure to solve rare disease
            </h2>
            <p className="mt-6 max-w-[65ch] text-[17px] leading-relaxed text-[var(--color-ink-secondary)]">
              ANDOR creates unified, data-driven research infrastructure across
              Mass General Brigham&apos;s neuroimmunology division. By building federated disease registries,
              shared biorepositories, and standardized clinical databases, we enable investigators to
              collaborate at scale on rare diseases that no single center can study alone.
            </p>
            <p className="mt-6 text-sm text-[var(--color-ink-tertiary)]">
              Funded by NIH, PCORI, the Department of Defense, NMSS, AAN, and philanthropic support.
            </p>
          </div>

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
      </EditorialSection>

      {/* ── Research Programs ── */}
      <EditorialSection>
        <p className="overline">Research Programs</p>
        <h2 className="mt-3 font-display text-[clamp(28px,4vw,44px)]">
          Eight interconnected programs
        </h2>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {researchGroups.map((group) => (
            <Link
              key={group.id}
              href={`/research/${group.slug}`}
              className="group relative rounded-lg border border-[var(--color-rule)] p-5 transition-all hover:border-[var(--color-primary)] hover:shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-display text-lg text-[#1a1614] group-hover:text-[var(--color-primary)]">
                  {group.name}
                </h3>
                {group.patientCount && (
                  <span className="shrink-0 rounded-full bg-[var(--color-surface-alt)] px-2.5 py-0.5 text-xs font-medium tabular-nums text-[var(--color-ink-secondary)]">
                    {group.patientCount} patients
                  </span>
                )}
              </div>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-ink-tertiary)] line-clamp-2">
                {group.description.split('. ').slice(0, 1).join('. ')}.
              </p>
              <span className="mt-3 inline-flex items-center text-xs font-medium text-[var(--color-accent)] opacity-0 transition-opacity group-hover:opacity-100">
                Learn more
                <svg className="ml-1 h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </EditorialSection>

      {/* ── Team ── */}
      <EditorialSection>
        <div className="grid gap-12 lg:grid-cols-[4fr_7fr]">
          <div>
            <p className="overline">Our Team</p>
            <h2 className="mt-3 font-display text-[clamp(28px,4vw,44px)]">
              {team.length} investigators
            </h2>
            <Link
              href="/team"
              className="mt-4 inline-flex items-center text-sm font-medium text-[var(--color-accent)] hover:underline"
            >
              Meet the full team
              <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {featuredTeam.map((member) => (
              <div key={member.id} className="flex items-center gap-3">
                <Image
                  src={member.imageUrl!}
                  alt={member.name}
                  width={56}
                  height={56}
                  className="h-14 w-14 shrink-0 rounded-full object-cover object-top"
                />
                <div className="min-w-0">
                  {member.catalystUrl ? (
                    <a
                      href={member.catalystUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-[#1a1614] hover:text-[var(--color-accent)]"
                    >
                      {member.name}{member.degrees ? `, ${member.degrees}` : ''}
                    </a>
                  ) : (
                    <p className="text-sm font-semibold text-[#1a1614]">
                      {member.name}{member.degrees ? `, ${member.degrees}` : ''}
                    </p>
                  )}
                  <p className="mt-0.5 text-xs text-[var(--color-ink-tertiary)] truncate">{member.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </EditorialSection>

      {/* ── CTA ── */}
      <section className="bg-[var(--color-primary)] py-20 sm:py-24 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-[clamp(28px,4vw,44px)]">
            Support the science
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[17px] leading-relaxed text-gray-300">
            Your philanthropic investment accelerates discovery for patients with rare autoimmune
            neurological diseases.
          </p>
          <div className="mt-8">
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
