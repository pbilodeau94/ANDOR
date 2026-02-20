import Hero from '@/components/Hero'
import SectionWrapper from '@/components/SectionWrapper'
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
  const other = clinicalTrials.filter((t) => t.status !== 'recruiting')

  return (
    <>
      <Hero
        subtitle="Clinical Trials"
        title="Advancing Treatment Through Clinical Research"
        description="ANDOR investigators lead and participate in clinical trials across autoimmune neurological diseases, bringing novel therapies from bench to bedside."
      />

      <SectionWrapper>
        <div className="mx-auto max-w-4xl">
          <p className="text-gray-600">
            Our investigators are actively enrolling patients in {recruiting.length} clinical trials
            targeting MOGAD, autoimmune encephalitis, and optic neuritis. These trials evaluate
            novel immunotherapies including FcRn antagonists, IL-6 receptor blockers, and B cell-depleting
            agents.
          </p>
          <p className="mt-3 text-sm text-gray-500">
            If you are a patient or referring physician interested in trial enrollment,
            please contact our clinical research team.
          </p>
        </div>
      </SectionWrapper>

      <SectionWrapper alt>
        <h2 className="text-2xl font-bold text-[var(--color-primary)]">Active Trials</h2>
        <div className="mt-8 space-y-6">
          {[...recruiting, ...other].map((trial) => (
            <div
              key={trial.nctId ?? trial.shortName}
              className="rounded-xl border border-gray-200 bg-white overflow-hidden"
            >
              <div className="border-b border-gray-100 bg-gray-50 px-6 py-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="text-lg font-semibold text-[var(--color-primary)]">
                      {trial.shortName}
                    </h3>
                    {trial.nctId && <p className="mt-0.5 text-sm text-gray-500">{trial.nctId}</p>}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[trial.status]}`}>
                      {statusLabels[trial.status]}
                    </span>
                    <span className="inline-flex rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700">
                      {trial.phase}
                    </span>
                  </div>
                </div>
              </div>

              <div className="px-6 py-4">
                <p className="text-sm leading-relaxed text-gray-700">{trial.briefSummary}</p>

                <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">Conditions</span>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {trial.conditions.map((c) => (
                        <span key={c} className="inline-flex rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-700">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">Intervention</span>
                    <p className="mt-1 text-sm text-gray-700">{trial.intervention}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">Enrollment</span>
                    <p className="mt-1 text-sm text-gray-700">{trial.enrollment} participants</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">Timeline</span>
                    <p className="mt-1 text-sm text-gray-700">
                      {formatDate(trial.startDate)} &ndash; {formatDate(trial.completionDate)}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-4 border-t border-gray-100 pt-4">
                  <div className="text-xs text-gray-500">
                    <span className="font-medium text-gray-700">Sponsor:</span> {trial.sponsor}
                  </div>
                  <div className="text-xs text-gray-500">
                    <span className="font-medium text-gray-700">ANDOR Role:</span> {trial.andorRole}
                  </div>
                  <a
                    href={trial.studyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-auto inline-flex items-center gap-1 rounded-lg bg-[var(--color-primary)] px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-[var(--color-primary-light)]"
                  >
                    View on ClinicalTrials.gov
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold text-[var(--color-primary)]">Interested in Participating?</h2>
          <p className="mt-4 text-gray-600">
            If you or a patient you are referring may be eligible for one of our clinical trials,
            please contact our clinical research team at Massachusetts General Hospital.
          </p>
          <p className="mt-4 text-sm text-gray-500">
            Our research coordinators can provide detailed eligibility criteria
            and guide you through the enrollment process.
          </p>
        </div>
      </SectionWrapper>
    </>
  )
}
