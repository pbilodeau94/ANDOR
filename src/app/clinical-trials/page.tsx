import PageHero from '@/components/PageHero'
import EditorialSection from '@/components/EditorialSection'
import StatDisplay from '@/components/StatDisplay'
import { clinicalTrials, statusLabels, statusColors } from '@/data/clinical-trials'

function formatDate(dateStr: string): string {
  const [year, month] = dateStr.split('-')
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  return `${monthNames[Number(month) - 1]} ${year}`
}

export const metadata = {
  title: 'Clinical Trials | ANDOR',
  description: 'Active clinical trials across ANDOR research programs in MOGAD, NMOSD, autoimmune encephalitis, and optic neuritis.',
}

export default function ClinicalTrialsPage() {
  const recruiting = clinicalTrials.filter((t) => t.status === 'recruiting')

  return (
    <>
      <PageHero
        overline="Clinical Trials"
        title="Advancing Treatment Through Clinical Research"
        description="ANDOR investigators lead and participate in clinical trials across autoimmune neurological diseases, bringing novel therapies from bench to bedside."
      >
        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
          <StatDisplay value={String(clinicalTrials.length)} label="Active trials" light />
          <StatDisplay value={String(recruiting.length)} label="Currently recruiting" light />
        </div>
      </PageHero>

      {/* Trials */}
      <EditorialSection rule={false}>
        <div className="mx-auto max-w-4xl">
          <p className="overline">Active Trials</p>
          <h2 className="mt-3 font-serif text-[clamp(28px,4vw,36px)]">
            {clinicalTrials.length} clinical trials
          </h2>
          <p className="mt-4 max-w-[65ch] text-[17px] text-[var(--color-ink-secondary)]">
            Our investigators are actively enrolling patients in trials targeting MOGAD,
            NMOSD, autoimmune encephalitis, and optic neuritis.
          </p>

          <div className="mt-12 space-y-10">
            {clinicalTrials.map((trial) => {
              const isAndorLed = trial.andorRole.toLowerCase().includes('sponsor')
              return (
                <article
                  key={trial.nctId ?? trial.shortName}
                  className={`${
                    isAndorLed
                      ? 'border-l-2 border-[var(--color-accent)] pl-8'
                      : 'border-l border-[var(--color-rule)] pl-8'
                  }`}
                >
                  <div className="flex flex-wrap items-baseline gap-3">
                    <h3 className="font-serif text-xl text-[#1a1614]">
                      {trial.shortName}
                    </h3>
                    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[trial.status]}`}>
                      {statusLabels[trial.status]}
                    </span>
                    <span className="text-xs text-[var(--color-ink-tertiary)]">
                      {trial.phase}
                    </span>
                    {isAndorLed && (
                      <span className="text-xs font-medium text-[var(--color-accent)]">
                        ANDOR-led
                      </span>
                    )}
                  </div>

                  {trial.nctId && (
                    <p className="mt-1 text-xs text-[var(--color-ink-tertiary)]">{trial.nctId}</p>
                  )}

                  <p className="mt-3 max-w-[65ch] text-[15px] leading-relaxed text-[var(--color-ink-secondary)]">
                    {trial.briefSummary}
                  </p>

                  <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-[var(--color-ink-tertiary)]">
                    <span>{trial.conditions.join(', ')}</span>
                    <span className="text-[var(--color-rule)]">&middot;</span>
                    <span>{trial.intervention}</span>
                    <span className="text-[var(--color-rule)]">&middot;</span>
                    <span>{trial.enrollment} participants</span>
                    <span className="text-[var(--color-rule)]">&middot;</span>
                    <span>{formatDate(trial.startDate)} &ndash; {formatDate(trial.completionDate)}</span>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-[var(--color-ink-tertiary)]">
                    <span><span className="font-medium text-[#1a1614]">Sponsor:</span> {trial.sponsor}</span>
                    <span><span className="font-medium text-[#1a1614]">ANDOR Role:</span> {trial.andorRole}</span>
                    <a
                      href={trial.studyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-auto inline-flex items-center gap-1 text-[var(--color-accent)] hover:underline"
                    >
                      View study
                      <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </EditorialSection>

      {/* CTA */}
      <EditorialSection>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-[clamp(28px,4vw,36px)]">
            Interested in participating?
          </h2>
          <p className="mt-4 text-[17px] text-[var(--color-ink-secondary)]">
            If you or a patient you are referring may be eligible for one of our clinical trials,
            please contact our clinical research team at Massachusetts General Hospital.
          </p>
          <p className="mt-4 text-sm text-[var(--color-ink-tertiary)]">
            Our research coordinators can provide detailed eligibility criteria
            and guide you through the enrollment process.
          </p>
        </div>
      </EditorialSection>
    </>
  )
}
