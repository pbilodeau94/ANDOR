import PageHero from '@/components/PageHero'
import EditorialSection from '@/components/EditorialSection'
import { publications } from '@/data/publications'

const uniquePubCount = new Set(publications.map((p) => p.title)).size

const namedFunds = [
  {
    name: 'MOGAD Research Fund',
    description:
      'Supports our MOG antibody disease research program, including the MOG Symposium, biomarker development, and treatment outcome studies.',
  },
  {
    name: 'NMOSD Research Fund',
    description:
      'Advances NMOSD research including comparative effectiveness studies, biomarker discovery, and collaborative multi-center investigations that directly improve care for NMOSD patients.',
  },
  {
    name: 'Biorepository & Lab Fund',
    description:
      'Funds the collection, processing, and storage of biological samples (serum, CSF, PBMCs, tissue) that underpin biomarker discovery and translational research.',
  },
  {
    name: 'Autoimmune Encephalitis Fund',
    description:
      'Supports diagnostic algorithm development, patient-reported outcome measures, and clinical trials for autoimmune encephalitis.',
  },
  {
    name: 'Neuroimmunology Fellowship Fund',
    description:
      'Invests in the next generation of neuroimmunology investigators through fellowship support, career development awards, and research training.',
  },
]

const giftImpact = [
  {
    amount: '$1,000',
    impact: 'Covers the cost of processing and banking 10 patient biosamples in our biorepository, creating a permanent resource for biomarker discovery.',
  },
  {
    amount: '$5,000',
    impact: 'Funds travel and registration for a fellow to present original research at a national conference, building the next generation of neuroimmunology leaders.',
  },
  {
    amount: '$25,000',
    impact: 'Sponsors a visiting researcher from an international partner institution for a 3-month collaborative project, accelerating cross-center discovery.',
  },
  {
    amount: '$50,000',
    impact: 'Underwrites a pilot clinical study testing a new treatment approach, generating the preliminary data needed to secure federal funding.',
  },
  {
    amount: '$100,000',
    impact: 'Launches a new multi-center collaboration, pooling patient data from 15+ institutions to study ultra-rare disease subtypes that no single center can tackle alone.',
  },
]

const majorGifts = [
  {
    amount: '$500,000+',
    name: 'Endowed Research Fellowship',
    description: 'Permanently fund a clinical research fellowship in autoimmune neurology, training one physician-scientist per year in perpetuity.',
  },
  {
    amount: '$1,000,000+',
    name: 'Endowed Chair in Autoimmune Neurology',
    description: 'Establish a named professorship supporting a senior investigator\u2019s research program, providing sustained salary and research support.',
  },
  {
    amount: '$2,000,000+',
    name: 'Endowed Platform Trial',
    description: 'Create a permanently funded adaptive trial infrastructure that can continuously test new therapies across multiple autoimmune neurological diseases.',
  },
  {
    amount: '$5,000,000+',
    name: 'Named Research Center',
    description: 'Establish a named center for autoimmune neurology research with dedicated laboratory space, core staff, and a perpetual endowment for investigator-initiated studies.',
  },
]

export default function SupportPage() {
  return (
    <>
      <PageHero
        overline="Philanthropy"
        title="Support Our Research"
        description="Your investment in ANDOR directly accelerates discovery for patients living with rare autoimmune neurological diseases."
      />

      {/* Donate CTA — right after hero */}
      <section className="bg-[var(--color-accent)] py-12 text-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-display text-2xl sm:text-3xl">Make a gift today</h2>
              <p className="mt-1 text-sm text-white/80">
                Reference &quot;ANDOR Research Group &mdash; Neuroimmunology&quot; in your donation.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://giving.massgeneral.org/donate"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded bg-white px-6 py-3 text-sm font-semibold text-[var(--color-accent)] transition-colors hover:bg-white/90"
              >
                Donate via Mass General
                <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
              <a
                href="https://giving.brighamandwomens.org/give1/?appeal=25XXAGWM&utm_medium=web&utm_source=bwhgiving&utm_campaign=25XXAGWM&utm_content=donatebuttonheader&pk_vid=7229a602d936529017716928711d80b6"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded border-2 border-white px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Donate via Brigham and Women&apos;s
                <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why Support */}
      <EditorialSection rule={false}>
        <div className="mx-auto max-w-3xl">
          <p className="overline">Why Support ANDOR?</p>
          <h2 className="mt-3 font-display text-[clamp(28px,4vw,44px)]">
            Closing the research gap
          </h2>
          <div className="mt-8 space-y-5 text-[17px] leading-relaxed text-[var(--color-ink-secondary)]">
            <p>
              Autoimmune neurological diseases like MOGAD, NMOSD, autoimmune encephalitis, and
              neurosarcoidosis are rare, devastating conditions that are chronically underfunded
              relative to their impact. Patients face diagnostic delays, limited treatment options,
              and a research landscape that moves too slowly for conditions this severe.
            </p>
            <p>
              ANDOR exists to change this. By building shared registries, biorepositories, and
              collaborative infrastructure, we multiply the impact of every research dollar. A single
              philanthropic gift doesn&apos;t fund one study &mdash; it enables an entire ecosystem of
              investigators working on interconnected questions across disease boundaries.
            </p>
            <p>
              Our team of 15 investigators across Massachusetts General Hospital, Brigham
              and Women&apos;s Hospital, and Harvard Medical School has published over {uniquePubCount} peer-reviewed
              papers and maintains collaborative agreements with institutions worldwide.
            </p>
          </div>
        </div>
      </EditorialSection>

      {/* Gift Impact */}
      <EditorialSection>
        <div className="mx-auto max-w-3xl">
          <p className="overline">Your Gift at Work</p>
          <h2 className="mt-3 font-display text-[clamp(28px,4vw,44px)]">
            What your investment makes possible
          </h2>
          <div className="mt-12 space-y-0">
            {giftImpact.map((item, idx) => (
              <div key={item.amount} className="flex gap-6 border-l-2 border-[var(--color-accent)] py-6 pl-6">
                <div className="w-24 shrink-0 font-display text-xl text-[var(--color-accent)]">{item.amount}</div>
                <p className="text-[15px] leading-relaxed text-[var(--color-ink-secondary)]">{item.impact}</p>
              </div>
            ))}
          </div>
        </div>
      </EditorialSection>

      {/* Major Gifts */}
      <section className="bg-[var(--color-primary)] py-16 text-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-gray-400">Transformational Giving</p>
          <h2 className="mt-3 font-display text-[clamp(28px,4vw,44px)]">
            Legacy opportunities
          </h2>
          <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-gray-300">
            Major gifts create permanent infrastructure that advances autoimmune neurology research for generations.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {majorGifts.map((gift) => (
              <div
                key={gift.name}
                className="rounded-lg border border-white/15 bg-white/5 p-6 backdrop-blur-sm"
              >
                <div className="font-display text-xl text-[var(--color-accent-light)]">{gift.amount}</div>
                <h3 className="mt-2 text-lg font-semibold">{gift.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-300">
                  {gift.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Named Funds */}
      <EditorialSection>
        <div className="mx-auto max-w-3xl">
          <p className="overline">Named Research Funds</p>
          <h2 className="mt-3 font-display text-[clamp(28px,4vw,44px)]">
            Direct your support
          </h2>
          <dl className="mt-10 space-y-6">
            {namedFunds.map((fund) => (
              <div key={fund.name} className="border-b border-[var(--color-rule)] pb-6">
                <dt className="font-semibold text-[#1a1614]">{fund.name}</dt>
                <dd className="mt-2 text-[15px] leading-relaxed text-[var(--color-ink-secondary)]">
                  {fund.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </EditorialSection>

      {/* Contact */}
      <EditorialSection>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-[clamp(28px,4vw,44px)]">Get in Touch</h2>
          <p className="mt-4 text-[17px] text-[var(--color-ink-secondary)]">
            To discuss philanthropic support for ANDOR, please contact the Mass General
            Development Office. We welcome conversations about directed giving, naming opportunities,
            and research partnerships.
          </p>
          <div className="mt-10 border-t border-[var(--color-rule)] pt-8">
            <p className="font-semibold text-[#1a1614]">Mass General Development Office</p>
            <p className="mt-1 text-sm text-[var(--color-ink-secondary)]">
              Department of Neurology, Division of Neuroimmunology
            </p>
            <a
              href="mailto:mghdevelopment@mgh.harvard.edu"
              className="mt-3 inline-block text-sm font-medium text-[var(--color-accent)] hover:underline"
            >
              mghdevelopment@mgh.harvard.edu
            </a>
            <p className="mt-4 text-sm text-[var(--color-ink-tertiary)]">
              Please reference &quot;ANDOR Research Group &mdash; Neuroimmunology&quot; in your inquiry.
            </p>
          </div>
        </div>
      </EditorialSection>
    </>
  )
}
