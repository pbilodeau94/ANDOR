import PageHero from '@/components/PageHero'
import EditorialSection from '@/components/EditorialSection'

export const metadata = {
  title: 'Patient Resources | ANDOR',
  description: 'Resources, support organizations, and clinical information for patients and families affected by MOGAD, NMOSD, autoimmune encephalitis, and other autoimmune neurological diseases.',
}

const diseaseResources = [
  {
    disease: 'MOGAD',
    fullName: 'Myelin Oligodendrocyte Glycoprotein Antibody-Associated Disease',
    description: 'MOGAD is a rare autoimmune condition where antibodies attack the myelin sheath of the central nervous system, causing optic neuritis, transverse myelitis, and brain inflammation. There are currently no FDA-approved treatments, though several clinical trials are underway.',
    mgbLink: 'https://www.massgeneral.org/neurology/treatments-and-services/about-mog-antibody-disease',
    organizations: [
      { name: 'The MOG Project', url: 'https://mogproject.org/', description: 'Nonprofit devoted to MOGAD awareness, education, and research support with virtual support groups and community connection.' },
      { name: 'Siegel Rare Neuroimmune Association', url: 'https://wearesrna.org/', description: 'International nonprofit serving 15,000+ people with podcasts, courses, family camps, and support groups for MOGAD and related disorders.' },
      { name: 'The Sumaira Foundation', url: 'https://www.sumairafoundation.org/', description: 'Dedicated to global awareness of NMOSD and MOGAD, building patient communities and funding research.' },
    ],
  },
  {
    disease: 'NMOSD',
    fullName: 'Neuromyelitis Optica Spectrum Disorder',
    description: 'NMOSD is a severe autoimmune condition targeting aquaporin-4 channels in the central nervous system. Attacks can cause blindness and paralysis. Three FDA-approved treatments now exist, and our BEST-NMOSD trial is comparing them head-to-head.',
    mgbLink: 'https://www.massgeneral.org/neurology/treatments-and-services/neuroimmunology-clinic',
    organizations: [
      { name: 'Guthy-Jackson Charitable Foundation', url: 'https://guthyjacksonfoundation.org/', description: 'Leading international NMO research funder with a specialist directory, patient advocacy team, and support groups.' },
      { name: 'The Sumaira Foundation', url: 'https://www.sumairafoundation.org/', description: 'Raises global NMOSD awareness, leads advocacy, and funds research breakthroughs.' },
      { name: 'Siegel Rare Neuroimmune Association', url: 'https://wearesrna.org/', description: 'NMOSD-specific learning courses, support groups, bi-annual symposia, and research grants.' },
      { name: 'NORD', url: 'https://rarediseases.org/', description: 'NMOSD medical assistance programs and copay support for patients.' },
    ],
  },
  {
    disease: 'Autoimmune Encephalitis',
    fullName: 'Autoimmune Encephalitis',
    description: 'Autoimmune encephalitis occurs when the immune system attacks the brain, causing seizures, cognitive dysfunction, and psychiatric symptoms. It can mimic psychiatric disease, leading to delayed diagnosis. Many patients test negative for known antibodies yet still respond to immunotherapy.',
    organizations: [
      { name: 'International Autoimmune Encephalitis Society', url: 'https://autoimmune-encephalitis.org/', description: 'Global organization exclusively for AE patients and families, offering monthly support groups and case management advocacy.' },
      { name: 'Autoimmune Encephalitis Alliance', url: 'https://aealliance.org/', description: 'Supports patients in diagnosis and treatment, facilitates research, and operates a clinicians network.' },
      { name: 'Encephalitis International', url: 'https://www.encephalitis.info/', description: 'International nonprofit focused on awareness and research for all forms of encephalitis.' },
    ],
  },
  {
    disease: 'Neurosarcoidosis',
    fullName: 'Neurosarcoidosis',
    description: 'Neurosarcoidosis occurs when sarcoidosis affects the nervous system. It remains one of the most difficult neuroimmunological diagnoses, with no FDA-approved therapies and most treatment decisions based on limited evidence.',
    organizations: [
      { name: 'Foundation for Sarcoidosis Research', url: 'https://www.stopsarcoidosis.org/', description: 'Leading international sarcoidosis organization with virtual support groups, peer support navigators, and patient advisory committees.' },
      { name: 'Life & Breath Foundation', url: 'https://www.lifeandbreath.org/', description: 'Provides the sarcoidosis community with care management resources, monthly webinars with leading specialists.' },
    ],
  },
  {
    disease: 'CNS Vasculitis',
    fullName: 'Central Nervous System Vasculitis',
    description: 'CNS vasculitis is a rare, often devastating condition involving inflammation of blood vessels in the brain and spinal cord. Diagnosis frequently requires brain biopsy. ANDOR maintains one of the world\u2019s largest biopsy-confirmed cohort databases.',
    organizations: [
      { name: 'Vasculitis Foundation', url: 'https://vasculitisfoundation.org/', description: 'Primary advocacy organization for all forms of vasculitis, with weekly virtual support groups and financial assistance programs.' },
      { name: 'Vasculitis Clinical Research Consortium', url: 'https://vcrc.rarediseasesnetwork.org/', description: 'NIH-supported network connecting patients with expert doctors and clinical research opportunities.' },
    ],
  },
  {
    disease: 'Multiple Sclerosis',
    fullName: 'Multiple Sclerosis & EBV Research',
    description: 'Our EBV and MS program investigates the role of Epstein-Barr virus in triggering multiple sclerosis. Through virology, immunology, and translational research, we aim to understand EBV-driven CNS autoimmunity and develop antiviral therapeutic strategies.',
    organizations: [
      { name: 'National MS Society', url: 'https://www.nationalmssociety.org/', description: 'Largest U.S. MS organization with MS Navigators, research funding, advocacy, and support programs.' },
      { name: 'Brigham MS Center', url: 'https://brighammscenter.org/', description: 'Nationally recognized MS center at BWH with subspecialized programs and longitudinal research.' },
      { name: 'MGH MS Center', url: 'https://www.massgeneral.org/neurology/multiple-sclerosis/about', description: 'Mass General\u2019s dedicated multiple sclerosis center.' },
    ],
  },
]

export default function PatientResourcesPage() {
  return (
    <>
      <PageHero
        overline="For Patients & Families"
        title="Patient Resources"
        description="Information and support for patients and families living with autoimmune neurological diseases. You are not alone."
      />

      {/* Clinic info */}
      <EditorialSection rule={false}>
        <div className="mx-auto max-w-3xl">
          <p className="overline">Our Clinics</p>
          <h2 className="mt-3 font-display text-[clamp(24px,3.5vw,36px)]">
            Where to find us
          </h2>
          <p className="mt-4 text-[17px] leading-relaxed text-[var(--color-ink-secondary)]">
            ANDOR investigators see patients across Mass General Brigham. If you or someone you know
            has been diagnosed with or is suspected of having an autoimmune neurological condition,
            you can be seen at one of our specialized clinics.
          </p>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div className="rounded-lg border border-[var(--color-rule)] p-5">
              <h3 className="font-semibold text-[#1a1614]">MGH Neuroimmunology Clinic</h3>
              <p className="mt-1 text-sm text-[var(--color-ink-tertiary)]">Massachusetts General Hospital</p>
              <p className="mt-3 text-sm text-[var(--color-ink-secondary)]">
                Specialized care for NMOSD, MOGAD, transverse myelitis, and other rare CNS autoimmune disorders.
              </p>
              <a
                href="https://www.massgeneral.org/neurology/treatments-and-services/neuroimmunology-clinic"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center text-sm font-medium text-[var(--color-accent)] hover:underline"
              >
                Visit clinic page
                <svg className="ml-1 h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
            <div className="rounded-lg border border-[var(--color-rule)] p-5">
              <h3 className="font-semibold text-[#1a1614]">Brigham MS Center</h3>
              <p className="mt-1 text-sm text-[var(--color-ink-tertiary)]">Brigham and Women&apos;s Hospital</p>
              <p className="mt-3 text-sm text-[var(--color-ink-secondary)]">
                Nationally recognized MS center with subspecialized programs, infusion facility, and longitudinal research.
              </p>
              <a
                href="https://brighammscenter.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center text-sm font-medium text-[var(--color-accent)] hover:underline"
              >
                Visit clinic page
                <svg className="ml-1 h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>

          <p className="mt-6 text-sm text-[var(--color-ink-tertiary)]">
            To schedule an appointment or request a referral, call MGH Neurology at (617) 726-7565.
          </p>
        </div>
      </EditorialSection>

      {/* Disease-specific resources */}
      {diseaseResources.map((resource) => (
        <EditorialSection key={resource.disease}>
          <div className="mx-auto max-w-3xl">
            <p className="overline">{resource.disease}</p>
            <h2 className="mt-3 font-display text-[clamp(22px,3vw,32px)]">
              {resource.fullName}
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-[var(--color-ink-secondary)]">
              {resource.description}
            </p>

            {resource.mgbLink && (
              <a
                href={resource.mgbLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center text-sm font-medium text-[var(--color-accent)] hover:underline"
              >
                Learn more at Mass General
                <svg className="ml-1 h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )}

            <div className="mt-6 space-y-4">
              <p className="text-xs font-medium uppercase tracking-wide text-[var(--color-ink-tertiary)]">
                Patient Organizations
              </p>
              {resource.organizations.map((org) => (
                <a
                  key={org.name}
                  href={org.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block border-b border-[var(--color-rule)] pb-4"
                >
                  <h4 className="text-sm font-semibold text-[#1a1614] group-hover:text-[var(--color-accent)]">
                    {org.name}
                  </h4>
                  <p className="mt-1 text-sm text-[var(--color-ink-tertiary)]">{org.description}</p>
                </a>
              ))}
            </div>
          </div>
        </EditorialSection>
      ))}

      {/* Participate in research */}
      <EditorialSection dark>
        <div className="mx-auto max-w-3xl text-center">
          <p className="overline text-gray-400">Get Involved</p>
          <h2 className="mt-3 font-display text-[clamp(28px,4vw,36px)] text-white">
            Participate in research
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[17px] leading-relaxed text-gray-300">
            ANDOR maintains disease registries and conducts clinical trials that depend on patient participation.
            By enrolling in a registry or clinical trial, you contribute to research that can improve
            outcomes for patients worldwide.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="/clinical-trials"
              className="inline-flex items-center rounded border border-white/30 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
            >
              View Clinical Trials
            </a>
            <a
              href="/contact"
              className="inline-flex items-center rounded border border-white/30 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
            >
              Contact Us
            </a>
          </div>
        </div>
      </EditorialSection>
    </>
  )
}
