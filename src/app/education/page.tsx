import PageHero from '@/components/PageHero'
import EditorialSection from '@/components/EditorialSection'
import { fellowships } from '@/data/team'

export const metadata = {
  title: 'Education | ANDOR',
  description: 'Fellowship and training programs in MS, neuroimmunology, and autoimmune neurology at Mass General Brigham.',
}

export default function EducationPage() {
  return (
    <>
      <PageHero
        overline="Education"
        title="Fellowship Programs"
        description="Training the next generation of neuroimmunology investigators through clinical and research fellowships at Mass General Brigham and Harvard Medical School."
      />

      {fellowships.map((fellowship, i) => (
        <EditorialSection key={fellowship.name} rule={i > 0}>
          <div className="mx-auto max-w-3xl">
            <p className="overline">Fellowship Program</p>
            <h2 className="mt-3 font-display text-[clamp(24px,3.5vw,36px)]">
              {fellowship.name}
            </h2>

            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-sm text-[var(--color-ink-tertiary)]">
              {fellowship.director && (
                <span>Director: <span className="text-[#1a1614]">{fellowship.director}</span></span>
              )}
              {fellowship.associateDirector && (
                <span>Associate Director: <span className="text-[#1a1614]">{fellowship.associateDirector}</span></span>
              )}
            </div>

            <p className="mt-6 text-[17px] leading-relaxed text-[var(--color-ink-secondary)]">
              {fellowship.description}
            </p>

            {fellowship.tracks && (
              <div className="mt-10 space-y-8">
                {fellowship.tracks.map((track) => (
                  <div key={track.name} className="border-l-2 border-[var(--color-accent)] pl-6">
                    <h3 className="font-display text-lg text-[#1a1614]">{track.name}</h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-[var(--color-ink-secondary)]">
                      {track.description}
                    </p>
                    {track.pis && (
                      <div className="mt-4 space-y-3">
                        <p className="text-xs font-medium uppercase tracking-wide text-[var(--color-ink-tertiary)]">
                          Research Mentors
                        </p>
                        {track.pis.map((pi) => (
                          <div key={pi.name} className="border-b border-[var(--color-rule)] pb-3">
                            <p className="text-sm text-[#1a1614]">{pi.name}</p>
                            <p className="text-xs text-[var(--color-ink-tertiary)]">{pi.institution}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {fellowship.applyUrl && (
              <div className="mt-8">
                <a
                  href={fellowship.applyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm font-medium text-[var(--color-accent)] hover:underline"
                >
                  Learn more & apply
                  <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            )}
          </div>
        </EditorialSection>
      ))}

      <EditorialSection>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-[clamp(24px,3.5vw,36px)]">
            Questions about our programs?
          </h2>
          <p className="mt-4 text-[17px] text-[var(--color-ink-secondary)]">
            For inquiries about fellowship training opportunities, please contact the program coordinators
            or visit the{' '}
            <a
              href="https://www.mgbneurologyfellowships.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-accent)] hover:underline"
            >
              MGB Neurology Fellowships
            </a>{' '}
            website.
          </p>
        </div>
      </EditorialSection>
    </>
  )
}
