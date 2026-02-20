'use client'

import { useState } from 'react'
import Hero from '@/components/Hero'
import SectionWrapper from '@/components/SectionWrapper'
import DiseaseTabs from '@/components/DiseaseTabs'
import PublicationCard from '@/components/PublicationCard'
import { researchGroups } from '@/data/research-groups'
import { publications } from '@/data/publications'

const programHighlights: Record<string, string[]> = {
  MOGAD: [
    'Contributions to the international consensus diagnostic criteria for MOGAD, defining the clinical framework for diagnosis worldwide',
    'Characterization of age-dependent relapse risk and differential treatment responses across the lifespan, informing personalized therapy',
    'Development of cell-based assays for MOG antibody detection with improved sensitivity and specificity over commercial testing',
    'Prospective studies defining serum and CSF biomarkers of disease activity including neurofilament light chain and GFAP',
    'Multi-center studies of treatment outcomes comparing rituximab, IVIG, and mycophenolate in MOGAD',
  ],
  NMOSD: [
    'BEST-NMOSD: one of the first head-to-head pragmatic trials comparing disease-modifying treatments in NMOSD',
    'Comparative effectiveness studies of rituximab, tocilizumab, and FDA-approved therapies (eculizumab, inebilizumab, satralizumab) in real-world settings',
    'Multi-center cohort studies characterizing treatment effectiveness and disease mechanisms across institutions',
    'Development of animal models to study aquaporin-4 antibody-mediated pathology and novel therapeutic interventions',
    'Longitudinal biomarker studies tracking treatment response and relapse prediction in >180 patients',
  ],
  'Autoimmune Encephalitis': [
    'Development and implementation of a standardized diagnostic algorithm that measurably improved care for suspected autoimmune encephalitis',
    'Participation in the ExTINGUISH and CIELO clinical trials evaluating new treatments for autoimmune encephalitis',
    'Development and validation of patient-reported outcome measures specific to autoimmune encephalitis',
    'Characterization of seronegative encephalitis through a registry of ~100 patients, identifying diagnostic biomarkers and treatment patterns',
  ],
  Neurosarcoidosis: [
    'Discovery of protein trafficking changes involving VPS37A in neurosarcoidosis, revealing novel disease mechanisms',
    'Investigation of exosome biology and cytokine signaling pathways in the immunopathogenesis of neurosarcoidosis',
    'Laboratory studies characterizing the immune basis of nervous system sarcoidosis through tissue and blood profiling',
    'Clinical studies defining treatment phenotypes and optimizing immunosuppressive therapy for neurosarcoidosis',
  ],
  'CNS Vasculitis': [
    'Establishment of one of the largest biopsy-confirmed primary CNS vasculitis cohort databases, defining clinicoradiographic phenotypes',
    'Research on early relapse risk factors and long-term prognostic markers in biopsy-confirmed CNS vasculitis',
    'Investigation of advanced MRI imaging protocols including central vein sign for improved non-invasive diagnosis',
    'Mechanistic studies of amyloid-related angiitis and characterization of treatment response patterns',
  ],
  'Translational Neuroimmunology': [
    'Discovery that EBV viral particles elicit dominant CD4+ T cell responses in MS, advancing understanding of the viral trigger hypothesis',
    'Investigation of EBV in exosomes as a novel pathway in MS pathogenesis and identification of anti-EBNA-1 antibody thresholds',
    'Gamma-delta (\u03B3\u03B4) T cell research using EAE animal models to understand roles of butyrophilin ligands in CNS autoimmunity',
    'Single-cell transcriptomics and flow cytometry approaches to novel autoantibody discovery and therapeutic target identification',
    'Research on folate receptor autoimmunity in autism spectrum disorder, OCD, and schizophrenia',
  ],
}

export default function ResearchPage() {
  const [activeTab, setActiveTab] = useState<string | null>(null)

  const visibleGroups = activeTab
    ? researchGroups.filter((g) => g.name === activeTab)
    : researchGroups

  return (
    <>
      <Hero
        subtitle="Research Programs"
        title="Advancing Autoimmune Neurology"
        description="ANDOR's research spans six interconnected programs, each leveraging shared infrastructure, federated registries, and a collaborative team to tackle rare autoimmune neurological diseases."
      />

      <SectionWrapper>
        <p className="mx-auto max-w-3xl text-center leading-relaxed text-gray-600">
          Each research group maintains its own disease-specific registry, biorepository, and active
          project portfolio. Select a program below to explore key highlights.
        </p>

        <div className="mt-8">
          <DiseaseTabs activeTab={activeTab} onChange={setActiveTab} />
        </div>
      </SectionWrapper>

      {visibleGroups.map((group, i) => {
        const highlights = programHighlights[group.name] ?? []

        return (
          <SectionWrapper key={group.id} alt={i % 2 === 1} id={group.slug}>
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Group info */}
              <div className="lg:col-span-1">
                <h2 className="text-2xl font-bold text-[var(--color-primary)]">{group.name}</h2>
                {group.patientCount && (
                  <p className="mt-1 text-sm font-medium text-[var(--color-accent)]">
                    {group.patientCount} patients in registry
                  </p>
                )}
                <p className="mt-4 leading-relaxed text-gray-600">{group.description}</p>

                <div className="mt-6">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Infrastructure
                  </h4>
                  <ul className="mt-2 space-y-1.5">
                    {group.infrastructure.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                        <svg
                          className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-accent)]"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Key Investigators
                  </h4>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {group.keyInvestigators.map((name) => (
                      <span
                        key={name}
                        className="rounded-full bg-[var(--color-primary)]/10 px-3 py-1 text-xs font-medium text-[var(--color-primary)]"
                      >
                        {name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Program highlights */}
              <div className="lg:col-span-2">
                <h3 className="text-lg font-semibold text-gray-900">
                  Research Highlights
                </h3>
                {highlights.length > 0 ? (
                  <ul className="mt-4 space-y-3">
                    {highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start gap-3 rounded-lg border border-gray-200 bg-white p-4">
                        <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary)]/10 text-xs font-bold text-[var(--color-primary)]">
                          {idx + 1}
                        </div>
                        <p className="text-sm leading-relaxed text-gray-700">{highlight}</p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-4 text-sm italic text-gray-400">No highlights listed yet</p>
                )}

                {/* Selected Publications */}
                {(() => {
                  const groupPubs = publications.filter((p) => p.researchGroup === group.name)
                  const shown = groupPubs.slice(0, 6)
                  const remaining = groupPubs.length - shown.length
                  return (
                    <div className="mt-8">
                      <h3 className="text-lg font-semibold text-gray-900">Selected Publications</h3>
                      {shown.length > 0 ? (
                        <>
                          <div className="mt-4 grid gap-4 sm:grid-cols-2">
                            {shown.map((pub) => (
                              <PublicationCard key={pub.id} pub={pub} />
                            ))}
                          </div>
                          {remaining > 0 && (
                            <p className="mt-3 text-xs text-gray-400">
                              + {remaining} more publication{remaining !== 1 ? 's' : ''}
                            </p>
                          )}
                        </>
                      ) : (
                        <p className="mt-4 text-sm italic text-gray-400">Publications coming soon</p>
                      )}
                    </div>
                  )
                })()}
              </div>
            </div>
          </SectionWrapper>
        )
      })}
    </>
  )
}
