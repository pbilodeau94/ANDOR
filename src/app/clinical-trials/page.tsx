import Link from 'next/link'
import PageHero from '@/components/PageHero'
import EditorialSection from '@/components/EditorialSection'
import StatDisplay from '@/components/StatDisplay'
import { trackedTrials, trialStatusLabels, trialStatusColors } from '@/data/trials-tracker'

const publicTrials = trackedTrials.filter(
  (t) => t.publicFacing && (t.status === 'active' || t.status === 'start_up' || t.status === 'open_label')
)

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

      <EditorialSection rule={false}>
        <div className="mx-auto max-w-4xl">
          <div className="space-y-8">
            {publicTrials.map((trial) => (
              <article
                key={trial.id}
                className={`${
                  trial.andorLed
                    ? 'border-l-2 border-[var(--color-accent)] pl-6'
                    : 'border-l border-[var(--color-rule)] pl-6'
                }`}
              >
                <div className="flex flex-wrap items-baseline gap-3">
                  <h3 className="font-display text-lg text-[#1a1614]">
                    {trial.shortName}
                  </h3>
                  <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${trialStatusColors[trial.status]}`}>
                    {trialStatusLabels[trial.status]}
                  </span>
                  {trial.andorLed && (
                    <span className="text-xs font-medium text-[var(--color-accent)]">
                      ANDOR-led
                    </span>
                  )}
                </div>

                {trial.nctId && (
                  <p className="mt-1 text-xs text-[var(--color-ink-tertiary)]">
                    <a
                      href={trial.studyUrl || `https://clinicaltrials.gov/study/${trial.nctId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[var(--color-accent)]"
                    >
                      {trial.nctId}
                    </a>
                  </p>
                )}

                <p className="mt-2 max-w-[65ch] text-[15px] leading-relaxed text-[var(--color-ink-secondary)]">
                  {trial.description}
                </p>

                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-[var(--color-ink-tertiary)]">
                  <span>{trial.disease}</span>
                  <span className="text-[var(--color-rule)]">&middot;</span>
                  <span>{trial.sponsor}</span>
                  {trial.studyUrl && (
                    <>
                      <span className="text-[var(--color-rule)]">&middot;</span>
                      <a
                        href={trial.studyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--color-accent)] hover:underline"
                      >
                        View study
                      </a>
                    </>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </EditorialSection>

      <EditorialSection>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-[clamp(28px,4vw,36px)]">
            Interested in participating?
          </h2>
          <p className="mt-4 text-[17px] text-[var(--color-ink-secondary)]">
            If you or a patient you are referring may be eligible for one of our clinical trials,
            please <Link href="/contact" className="text-[var(--color-accent)] hover:underline">contact our team</Link>.
          </p>
        </div>
      </EditorialSection>
    </>
  )
}
