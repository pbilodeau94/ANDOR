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
    'One of the largest single-center MOGAD registries in the world (>350 patients), enabling natural history and biomarker discovery studies',
    'Key contributions to the international consensus diagnostic criteria for MOGAD, establishing the clinical framework for diagnosis worldwide',
    'Pioneering research on age-dependent relapse risk and differential treatment responses, informing personalized treatment strategies',
    'Active cell-based assay laboratory for MOG antibody testing, supporting both clinical care and translational research',
    'Multi-center collaborations studying serum and CSF biomarkers for disease activity and prognosis',
  ],
  NMOSD: [
    'BEST-NMOSD: a PCORI-funded pragmatic clinical trial comparing disease-modifying treatments in neuromyelitis optica spectrum disorder — one of the first head-to-head treatment trials in NMOSD',
    'Comprehensive multi-center cohort (Alexion-funded) studying treatment effectiveness and disease mechanisms across institutions',
    'Prospective registry with >180 patients tracking longitudinal outcomes, treatment responses, and biomarker trajectories',
    'Research on comparative effectiveness of rituximab, tocilizumab, and FDA-approved therapies in real-world settings',
    'Development of animal models to study aquaporin-4 antibody-mediated pathology and test therapeutic interventions',
  ],
  'Autoimmune Encephalitis': [
    'Published and implemented a standardized diagnostic algorithm that measurably improved care for patients with suspected autoimmune encephalitis',
    'Active involvement in the ExTINGUISH and CIELO clinical trials for autoimmune encephalitis treatment',
    'Development and validation of patient-reported outcome measures specific to autoimmune encephalitis',
    'Registry of ~100 patients including seronegative encephalitis cases, enabling studies of diagnostic biomarkers',
  ],
  Neurosarcoidosis: [
    'Discovery of protein trafficking changes involving VPS37A in neurosarcoidosis, advancing understanding of disease mechanisms',
    'Investigation of immunopathogenesis pathways including exosome biology and cytokine signaling in neurosarcoidosis',
    'Ann Theodore Foundation-funded laboratory studies characterizing the immune basis of nervous system sarcoidosis',
    'Clinical registry for studying treatment phenotypes and optimizing therapy for this rare neuroimmunological condition',
  ],
  'CNS Vasculitis': [
    'Building one of the largest biopsy-confirmed primary CNS vasculitis cohort databases, defining clinicoradiographic phenotypes',
    'Research on early relapse risk and prognostic factors in biopsy-confirmed CNS vasculitis',
    'Investigation of novel biomarkers and advanced MRI imaging protocols (central vein sign) for diagnosis',
    'Case series and mechanistic studies of amyloid-related angiitis and treatment response',
  ],
  'Translational Neuroimmunology': [
    'Bench-to-bedside research spanning EBV immunology in multiple sclerosis, including studies of viral particles and T cell responses',
    'Investigation of EBV in exosomes as a novel pathway in MS pathogenesis',
    'Research on anti-EBNA-1 antibody thresholds and EBV shedding patterns in MS patients',
    'Gamma-delta (γδ) T cell research using EAE animal models to understand roles in CNS autoimmunity',
    'Single-cell transcriptomics and flow cytometry approaches to novel antibody discovery and therapeutic target identification',
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
                  return (
                    <div className="mt-8">
                      <h3 className="text-lg font-semibold text-gray-900">Selected Publications</h3>
                      {groupPubs.length > 0 ? (
                        <div className="mt-4 grid gap-4 sm:grid-cols-2">
                          {groupPubs.map((pub) => (
                            <PublicationCard key={pub.id} pub={pub} />
                          ))}
                        </div>
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
