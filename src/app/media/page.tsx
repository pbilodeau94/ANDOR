import PageHero from '@/components/PageHero'
import EditorialSection from '@/components/EditorialSection'

export const metadata = {
  title: 'Media & Press | ANDOR',
  description: 'News coverage, press mentions, and media resources for ANDOR research at Mass General Brigham and Harvard Medical School.',
}

type MediaItem = {
  title: string
  source: string
  date?: string
  url: string
  category: string
}

const mediaItems: MediaItem[] = [
  {
    title: 'Boston-Based Neurologist Michael Levy Leads Research on Treating NMOSD',
    source: 'Rare Disease Advisor',
    url: 'https://www.rarediseaseadvisor.com/features/boston-based-neurologist-michael-levy-leads-research-nmosd/',
    category: 'Feature',
  },
  {
    title: 'Optimizing DMT Selection to Reduce Relapse Burden in NMOSD',
    source: 'Neurology Advisor',
    date: 'February 2025',
    url: 'https://www.neurologyadvisor.com/news/nmosd-dmt-relapse-risk-reduction/',
    category: 'Research',
  },
  {
    title: 'Key Research Needs and the Potential for FDA-Approved Treatments for MOGAD',
    source: 'NeurologyLive',
    url: 'https://www.neurologylive.com/view/neurovoices-anastasia-vishnevetsky-key-research-needs-potential-for-fda-approved-treatments-for-mogad',
    category: 'Interview',
  },
  {
    title: 'Highlights from the 75th AAN Annual Meeting',
    source: 'touchNEUROLOGY',
    date: '2023',
    url: 'https://touchneurology.com/neuroimmunology/conference-hub/michael-levy-highlights-from-the-75th-aan-annual-meeting-2023/',
    category: 'Conference',
  },
  {
    title: 'Timing of Treatment and Managing Attacks in MOGAD',
    source: 'NeurologyLive',
    url: 'https://www.neurologylive.com/view/timing-of-treatment-and-managing-attacks-mogad-anastasia-vishnevetsky',
    category: 'Interview',
  },
  {
    title: 'METEOROID and CosMOG Clinical Trials for MOGAD Treatments',
    source: 'Siegel Rare Neuroimmune Association',
    url: 'https://wearesrna.org/resources/abcs-of-mogad-meteoroid-and-cosmog-clinical-trials-for-mogad-treatments/',
    category: 'Podcast',
  },
  {
    title: 'Subgroup Analyses of Ravulizumab Demonstrates Effectiveness Across Patient Populations',
    source: 'NeurologyLive',
    url: 'https://www.neurologylive.com/view/subgroup-analyses-ravulizumab-demonstrates-effectiveness-across-patient-populations-michael-levy',
    category: 'Research',
  },
  {
    title: 'Interview With Dr. Anastasia Vishnevetsky on Using Cannabis to Treat NMOSD',
    source: 'Rare Disease Advisor',
    url: 'https://www.rarediseaseadvisor.com/podcasts/an-interview-with-dr-anastasia-vishnevetsky-on-using-cannabis-to-treat-nmosd/',
    category: 'Podcast',
  },
  {
    title: 'Community Meets Clinic \u2014 Dr. Michael Levy',
    source: 'Siegel Rare Neuroimmune Association',
    url: 'https://wearesrna.org/resources/community-meets-clinic-dr-michael-levy',
    category: 'Feature',
  },
  {
    title: '\u2018Rare Vision\u2019 Exhibit Showcases Artists With NMOSD and Similar Disorders',
    source: 'Rare Disease Advisor',
    url: 'https://www.rarediseaseadvisor.com/features/artists-nmosd-like-disorders-showcase-works-rare-vision/',
    category: 'Feature',
  },
  {
    title: 'Looking Ahead: Predictions for Neuroscience and Neurology in 2026',
    source: 'Mass General Brigham Newsroom',
    date: '2026',
    url: 'https://www.massgeneralbrigham.org/en/about/newsroom/articles/2026-predictions-about-neurology',
    category: 'Institutional',
  },
  {
    title: 'Evaluating the Treatment Pipeline for MOGAD',
    source: 'NeurologyLive',
    url: 'https://www.neurologylive.com/view/evaluating-treatment-pipeline-for-mogad',
    category: 'Research',
  },
  {
    title: 'METEOROID: Phase III Trial of Satralizumab in Patients with MOGAD',
    source: 'VJNeurology',
    url: 'https://www.vjneurology.com/video/g-lqwkpgkjq-meteoroid-phase-iii-trial-of-satralizumab-in-patients-with-mogad/',
    category: 'Conference',
  },
  {
    title: 'International Panel Revises NMOSD Diagnostic Criteria Based on Evidence-Based Consensus',
    source: 'NeurologyLive',
    url: 'https://www.neurologylive.com/view/international-panel-revises-nmosd-diagnostic-criteria-based-evidence-based-consensus',
    category: 'Research',
  },
]

const categoryColors: Record<string, string> = {
  Feature: 'bg-blue-100 text-blue-700',
  Research: 'bg-emerald-100 text-emerald-700',
  Interview: 'bg-violet-100 text-violet-700',
  Conference: 'bg-amber-100 text-amber-700',
  Podcast: 'bg-rose-100 text-rose-700',
  Institutional: 'bg-gray-100 text-gray-700',
}

export default function MediaPage() {
  return (
    <>
      <PageHero
        overline="Media & Press"
        title="In the News"
        description="Coverage of ANDOR research, clinical trials, and investigators in scientific and popular media."
      />

      <EditorialSection rule={false}>
        <div className="mx-auto max-w-4xl">
          <div className="space-y-0">
            {mediaItems.map((item) => (
              <a
                key={item.url}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex gap-4 border-b border-[var(--color-rule)] py-5 transition-colors"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-medium ${categoryColors[item.category] || 'bg-gray-100 text-gray-600'}`}>
                      {item.category}
                    </span>
                    <span className="text-xs text-[var(--color-ink-tertiary)]">{item.source}</span>
                    {item.date && (
                      <>
                        <span className="text-xs text-[var(--color-rule)]">&middot;</span>
                        <span className="text-xs text-[var(--color-ink-tertiary)]">{item.date}</span>
                      </>
                    )}
                  </div>
                  <h3 className="mt-2 text-[15px] font-medium leading-snug text-[#1a1614] group-hover:text-[var(--color-accent)]">
                    {item.title}
                  </h3>
                </div>
                <svg className="mt-2 h-4 w-4 shrink-0 text-[var(--color-ink-tertiary)] opacity-0 transition-opacity group-hover:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </EditorialSection>

      {/* Media contact */}
      <EditorialSection>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-[clamp(24px,3.5vw,36px)]">
            Media Inquiries
          </h2>
          <p className="mt-4 text-[17px] text-[var(--color-ink-secondary)]">
            For press inquiries about ANDOR research, clinical trials, or investigators, please contact the
            Mass General Brigham Office of Communications.
          </p>
          <p className="mt-6 text-sm text-[var(--color-ink-tertiary)]">
            Please reference &quot;ANDOR Research Group &mdash; Division of Neuroimmunology&quot; in your inquiry.
          </p>
        </div>
      </EditorialSection>
    </>
  )
}
