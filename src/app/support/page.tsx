import PageHero from '@/components/PageHero'
import EditorialSection from '@/components/EditorialSection'
import { publications } from '@/data/publications'

const uniquePubCount = new Set(publications.map((p) => p.title)).size

const milestones = [
  {
    year: '2024',
    text: 'Launched BEST-NMOSD, one of the first head-to-head pragmatic clinical trials comparing disease-modifying treatments in NMOSD, funded by PCORI.',
  },
  {
    year: '2024',
    text: 'Contributed to the international consensus diagnostic criteria for MOGAD, defining the clinical framework for diagnosis worldwide.',
  },
  {
    year: '2023',
    text: 'Founded the annual MOG Symposium, bringing together researchers, clinicians, and patients to advance MOGAD awareness and collaboration.',
  },
  {
    year: '2023',
    text: 'Grew our federated registries to 700+ patients across six disease areas, creating one of the largest cohorts in autoimmune neurology.',
  },
]

const namedFunds = [
  {
    name: 'MOGAD Research Fund',
    description:
      'Supports our MOG antibody disease research program, including the MOG Symposium, cell-based assay development, and treatment outcome studies.',
  },
  {
    name: 'NMOSD Clinical Trials Fund',
    description:
      'Advances head-to-head treatment trials and comparative effectiveness research that directly guide clinical decisions for NMOSD patients.',
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
    impact: 'Funds biorepository sample processing for 10 patients, preserving critical research material for future studies.',
  },
  {
    amount: '$5,000',
    impact: 'Supports a research fellow for one month of dedicated registry data analysis, enabling new discoveries from existing cohort data.',
  },
  {
    amount: '$25,000',
    impact: 'Funds a year of cell-based assay reagents and testing, advancing antibody detection for MOGAD and related conditions.',
  },
  {
    amount: '$100,000',
    impact: 'Seeds a new multi-center collaboration, enabling pooled data from institutions worldwide to study ultra-rare disease subtypes.',
  },
]

export default function SupportPage() {
  return (
    <>
      <PageHero
        overline="Philanthropy"
        title="Support Our Research"
        description="Your investment in ANDOR directly accelerates discovery for patients living with rare autoimmune neurological diseases. Help us close the research gap."
      />

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
              papers and maintains collaborative agreements with institutions worldwide including
              Mayo Clinic, Yale, McGill, UCSF, and Charité Berlin.
            </p>
          </div>
        </div>
      </EditorialSection>

      {/* Milestones Timeline */}
      <EditorialSection>
        <div className="mx-auto max-w-3xl">
          <p className="overline">Recent Milestones</p>
          <h2 className="mt-3 font-display text-[clamp(28px,4vw,44px)]">
            Achievements made possible by research investment
          </h2>

          <div className="mt-12 space-y-0">
            {milestones.map((m, i) => (
              <div
                key={i}
                className="flex gap-8 border-l border-[var(--color-rule)] py-6 pl-8 relative"
              >
                <div className="absolute -left-px top-6 h-px w-4 bg-[var(--color-rule)]" />
                <div className="shrink-0 w-16">
                  <span className="font-display text-2xl text-[var(--color-primary)]">{m.year}</span>
                </div>
                <p className="text-[15px] leading-relaxed text-[var(--color-ink-secondary)]">{m.text}</p>
              </div>
            ))}
          </div>
        </div>
      </EditorialSection>

      {/* Gift Impact */}
      <EditorialSection>
        <div className="mx-auto max-w-3xl">
          <p className="overline">Your Gift at Work</p>
          <h2 className="mt-3 font-display text-[clamp(28px,4vw,44px)]">
            How investment translates to impact
          </h2>
          <div className="mt-12 space-y-8">
            {giftImpact.map((item) => (
              <div key={item.amount} className="grid gap-4 sm:grid-cols-[120px_1fr] items-baseline">
                <div className="stat-figure text-[var(--color-accent)] !text-[36px]">{item.amount}</div>
                <p className="text-[17px] leading-relaxed text-[var(--color-ink-secondary)]">{item.impact}</p>
              </div>
            ))}
          </div>
        </div>
      </EditorialSection>

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
            To discuss philanthropic support for ANDOR, please contact the Mass General Brigham
            Development Office. We welcome conversations about directed giving, naming opportunities,
            and research partnerships.
          </p>
          <div className="mt-10 border-t border-[var(--color-rule)] pt-8">
            <p className="font-semibold text-[#1a1614]">Mass General Brigham Development</p>
            <p className="mt-1 text-sm text-[var(--color-ink-secondary)]">
              Department of Neurology, Division of Neuroimmunology
            </p>
            <p className="mt-0.5 text-sm text-[var(--color-ink-secondary)]">
              Massachusetts General Hospital
            </p>
            <p className="mt-4 text-sm text-[var(--color-ink-tertiary)]">
              Please reference &quot;ANDOR Research Group &mdash; Neuroimmunology&quot; in your inquiry.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4 text-sm text-[var(--color-ink-tertiary)]">
            <span>Mass General Brigham</span>
            <span>&middot;</span>
            <span>Harvard Medical School</span>
          </div>
        </div>
      </EditorialSection>
    </>
  )
}
