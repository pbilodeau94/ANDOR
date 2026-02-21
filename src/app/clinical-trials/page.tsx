import Link from 'next/link'
import PageHero from '@/components/PageHero'
import EditorialSection from '@/components/EditorialSection'
import StatDisplay from '@/components/StatDisplay'
import { trackedTrials, trialStatusLabels, trialStatusColors } from '@/data/trials-tracker'

const publicTrials = trackedTrials.filter(
  (t) => t.publicFacing && (t.status === 'active' || t.status === 'start_up' || t.status === 'open_label')
)

const diseaseColors: Record<string, string> = {
  'MOGAD': 'bg-blue-500',
  'NMOSD': 'bg-emerald-500',
  'MS': 'bg-indigo-500',
  'Encephalitis': 'bg-purple-500',
  'NMDA Encephalitis': 'bg-purple-500',
  'Optic Neuritis': 'bg-orange-500',
  'Optic Neuritis, Transverse Myelitis': 'bg-teal-500',
  'MOGAD, NMOSD': 'bg-cyan-500',
}

const uniqueDiseases = [...new Set(publicTrials.map((t) => t.disease))]

export const metadata = {
  title: 'Clinical Trials | ANDOR',
  description: 'Active clinical trials across ANDOR research programs in MOGAD, NMOSD, autoimmune encephalitis, and optic neuritis.',
}

export default function ClinicalTrialsPage() {
  return (
    <>
      <PageHero
        overline="Clinical Trials"
        title="Clinical Research"
        description="ANDOR investigators lead and participate in clinical trials across autoimmune neurological diseases."
      >
        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
          <StatDisplay value={String(publicTrials.length)} label="Active trials" light />
        </div>
      </PageHero>

      {/* Disease legend */}
      <div className="border-b border-[var(--color-rule)] bg-[var(--color-surface)]">
        <div className="mx-auto max-w-4xl px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4">
            {uniqueDiseases.map((disease) => (
              <div key={disease} className="flex items-center gap-1.5">
                <span className={`h-2 w-2 rounded-full ${diseaseColors[disease] || 'bg-gray-400'}`} />
                <span className="text-xs text-[var(--color-ink-tertiary)]">{disease}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <EditorialSection rule={false}>
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-4 sm:grid-cols-2">
            {publicTrials.map((trial) => (
              <article
                key={trial.id}
                className={`relative overflow-hidden rounded-xl border border-[var(--color-rule)] p-6 transition-all hover:shadow-md ${
                  trial.andorLed ? 'ring-1 ring-[var(--color-accent)]/30' : ''
                }`}
              >
                {/* Color accent bar */}
                <div className={`absolute left-0 top-0 h-full w-1 ${diseaseColors[trial.disease] || 'bg-gray-300'}`} />

                <div className="pl-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-display text-lg text-[#1a1614]">
                      {trial.shortName}
                    </h3>
                    <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${trialStatusColors[trial.status]}`}>
                      {trialStatusLabels[trial.status]}
                    </span>
                    {trial.andorLed && (
                      <span className="rounded-full bg-[var(--color-accent)]/10 px-2 py-0.5 text-xs font-semibold text-[var(--color-accent)]">
                        ANDOR-led
                      </span>
                    )}
                  </div>

                  <p className="mt-2 text-[14px] leading-relaxed text-[var(--color-ink-secondary)]">
                    {trial.description}
                  </p>

                  <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span className="inline-flex items-center gap-1.5 text-xs text-[var(--color-ink-tertiary)]">
                      <span className={`h-1.5 w-1.5 rounded-full ${diseaseColors[trial.disease] || 'bg-gray-400'}`} />
                      {trial.disease}
                    </span>
                    {trial.nctId && (
                      <>
                        <span className="text-[var(--color-rule)]">&middot;</span>
                        <a
                          href={trial.studyUrl || `https://clinicaltrials.gov/study/${trial.nctId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-medium text-[var(--color-accent)] hover:underline"
                        >
                          {trial.nctId}
                        </a>
                      </>
                    )}
                    {trial.studyUrl && !trial.nctId && (
                      <>
                        <span className="text-[var(--color-rule)]">&middot;</span>
                        <a
                          href={trial.studyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-medium text-[var(--color-accent)] hover:underline"
                        >
                          Study website
                        </a>
                      </>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </EditorialSection>

      <section className="bg-[var(--color-primary)] py-16 text-white">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-display text-[clamp(28px,4vw,36px)]">
            Interested in participating?
          </h2>
          <p className="mt-4 text-[17px] text-gray-300">
            If you or a patient you are referring may be eligible for one of our clinical trials,
            please contact our team.
          </p>
          <div className="mt-8">
            <Link
              href="/contact"
              className="inline-flex items-center rounded border border-white/30 px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
