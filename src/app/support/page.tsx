import Hero from '@/components/Hero'
import SectionWrapper from '@/components/SectionWrapper'
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
    text: 'Founded the annual ANDOR MOG Symposium, bringing together researchers, clinicians, and patients to advance MOGAD awareness and collaboration.',
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

const givingOpportunities = [
  {
    title: 'Registry Expansion',
    description:
      'Help us enroll more patients across our disease registries, enabling larger studies with greater statistical power to detect treatment effects in rare diseases.',
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
        />
      </svg>
    ),
  },
  {
    title: 'Biorepository & Lab Infrastructure',
    description:
      'Fund the collection, processing, and storage of biological samples (serum, CSF, PBMCs, tissue) that underpin translational research and biomarker discovery.',
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5"
        />
      </svg>
    ),
  },
  {
    title: 'Clinical Trials',
    description:
      'Support pragmatic clinical trials like BEST-NMOSD and ExTINGUISH that compare treatments and improve care for patients with autoimmune neurological diseases.',
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
        />
      </svg>
    ),
  },
  {
    title: 'Training & Education',
    description:
      'Invest in the next generation of neuroimmunology investigators through fellowship support, career development awards, and research training programs.',
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
        />
      </svg>
    ),
  },
]

export default function SupportPage() {
  return (
    <>
      <Hero
        subtitle="Philanthropy"
        title="Support Our Research"
        description="Your investment in ANDOR directly accelerates discovery for patients living with rare autoimmune neurological diseases. Help us close the research gap."
      />

      {/* Why Support */}
      <SectionWrapper>
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold text-[var(--color-primary)]">Why Support ANDOR?</h2>
          <div className="mt-6 space-y-4 leading-relaxed text-gray-600">
            <p>
              Autoimmune neurological diseases like MOGAD, NMOSD, autoimmune encephalitis, and
              neurosarcoidosis are rare, devastating conditions that are chronically underfunded
              relative to their impact. Patients face diagnostic delays, limited treatment options,
              and a research landscape that moves too slowly for conditions this severe.
            </p>
            <p>
              ANDOR exists to change this. By building shared registries, biorepositories, and
              collaborative infrastructure, we multiply the impact of every research dollar. A single
              philanthropic gift doesn&apos;t fund one study — it enables an entire ecosystem of
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
      </SectionWrapper>

      {/* Recent Milestones */}
      <SectionWrapper alt>
        <h2 className="text-center text-3xl font-bold text-[var(--color-primary)]">
          Recent Milestones
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-gray-600">
          Recent achievements made possible by research investment.
        </p>
        <div className="mx-auto mt-10 max-w-3xl space-y-4">
          {milestones.map((m) => (
            <div key={m.text} className="flex items-start gap-4 rounded-lg border border-gray-200 bg-white p-5">
              <div className="shrink-0 rounded-full bg-[var(--color-accent)]/10 px-3 py-1 text-sm font-bold text-[var(--color-accent)]">
                {m.year}
              </div>
              <p className="text-sm leading-relaxed text-gray-700">{m.text}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* Named Giving Funds */}
      <SectionWrapper>
        <h2 className="text-center text-3xl font-bold text-[var(--color-primary)]">
          Named Research Funds
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-gray-600">
          Direct your support to a specific research program.
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {namedFunds.map((fund) => (
            <div
              key={fund.name}
              className="rounded-xl border border-gray-200 bg-white p-5 transition-shadow hover:shadow-md"
            >
              <h3 className="font-semibold text-[var(--color-primary)]">{fund.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">{fund.description}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* Your Gift at Work */}
      <SectionWrapper alt>
        <h2 className="text-center text-3xl font-bold text-[var(--color-primary)]">
          Your Gift at Work
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-gray-600">
          See how philanthropic investment translates to research impact.
        </p>
        <div className="mx-auto mt-10 max-w-3xl space-y-6">
          {giftImpact.map((item) => (
            <div key={item.amount} className="flex items-start gap-4">
              <div className="shrink-0 text-2xl font-bold text-[var(--color-accent)]">{item.amount}</div>
              <p className="text-gray-600">{item.impact}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* Giving Opportunities */}
      <SectionWrapper>
        <h2 className="text-center text-3xl font-bold text-[var(--color-primary)]">
          Areas of Support
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-gray-600">
          Direct your support to the areas that matter most to you.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {givingOpportunities.map((opp) => (
            <div
              key={opp.title}
              className="rounded-xl border border-gray-200 bg-white p-6"
            >
              <div className="text-[var(--color-accent)]">{opp.icon}</div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">{opp.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">{opp.description}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* Contact */}
      <SectionWrapper alt>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-[var(--color-primary)]">Get in Touch</h2>
          <p className="mt-4 text-gray-600">
            To discuss philanthropic support for ANDOR, please contact the Mass General Brigham
            Development Office. We welcome conversations about directed giving, naming opportunities,
            and research partnerships.
          </p>
          <div className="mt-8 rounded-xl border border-gray-200 bg-white p-6">
            <p className="font-semibold text-gray-900">Mass General Brigham Development</p>
            <p className="mt-1 text-sm text-gray-600">
              Department of Neurology, Division of Neuroimmunology
            </p>
            <p className="mt-1 text-sm text-gray-600">
              Massachusetts General Hospital
            </p>
            <p className="mt-3 text-sm text-gray-500">
              Please reference &quot;ANDOR Research Group &mdash; Neuroimmunology&quot; in your inquiry.
            </p>
          </div>

          <div className="mt-8">
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-400">
              <span>Mass General Brigham</span>
              <span className="hidden sm:inline">&middot;</span>
              <span>Harvard Medical School</span>
            </div>
          </div>
        </div>
      </SectionWrapper>
    </>
  )
}
