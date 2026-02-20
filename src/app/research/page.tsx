'use client'

import { useState } from 'react'
import Image from 'next/image'
import Hero from '@/components/Hero'
import SectionWrapper from '@/components/SectionWrapper'
import DiseaseTabs from '@/components/DiseaseTabs'
import { researchGroups } from '@/data/research-groups'
import { publications } from '@/data/publications'
import { team } from '@/data/team'

const colorMap: Record<string, string> = {
  'blue-500': 'border-l-blue-500',
  'emerald-500': 'border-l-emerald-500',
  'violet-500': 'border-l-violet-500',
  'amber-600': 'border-l-amber-600',
  'rose-500': 'border-l-rose-500',
  'teal-500': 'border-l-teal-500',
}

const programHighlights: Record<string, string[]> = {
  MOGAD: [
    'Contributions to the international consensus diagnostic criteria for MOGAD, defining the clinical framework for diagnosis worldwide',
    'Characterization of age-dependent relapse risk and differential treatment responses across the lifespan',
    'Development of cell-based assays for MOG antibody detection with improved sensitivity and specificity',
    'Prospective studies defining serum and CSF biomarkers of disease activity including neurofilament light chain and GFAP',
    'Multi-center studies of treatment outcomes comparing rituximab, IVIG, and mycophenolate',
    'Founded the annual ANDOR MOG Symposium, bringing together researchers, clinicians, and patients to advance MOGAD awareness, education, and research collaboration',
  ],
  NMOSD: [
    'BEST-NMOSD: one of the first head-to-head pragmatic trials comparing disease-modifying treatments in NMOSD',
    'Comparative effectiveness studies of rituximab, tocilizumab, and FDA-approved therapies in real-world settings',
    'Multi-center cohort studies characterizing treatment effectiveness and disease mechanisms across institutions',
    'Development of animal models to study aquaporin-4 antibody-mediated pathology and novel therapeutic interventions',
    'Longitudinal biomarker studies tracking treatment response and relapse prediction',
  ],
  'Autoimmune Encephalitis': [
    'Development and implementation of a standardized diagnostic algorithm that measurably improved care for suspected autoimmune encephalitis',
    'Participation in the ExTINGUISH and CIELO clinical trials evaluating new treatments',
    'Development and validation of patient-reported outcome measures specific to autoimmune encephalitis',
    'Characterization of seronegative encephalitis through a registry of ~100 patients, identifying diagnostic biomarkers and treatment patterns',
  ],
  Neurosarcoidosis: [
    'Discovery of protein trafficking changes involving VPS37A in neurosarcoidosis, revealing novel disease mechanisms',
    'Investigation of exosome biology and cytokine signaling pathways in the immunopathogenesis of neurosarcoidosis',
    'Laboratory studies characterizing the immune basis of nervous system sarcoidosis through tissue and blood profiling',
    'Clinical studies defining treatment phenotypes and optimizing immunosuppressive therapy',
  ],
  'CNS Vasculitis': [
    'Establishment of one of the largest biopsy-confirmed primary CNS vasculitis cohort databases, defining clinicoradiographic phenotypes',
    'Research on early relapse risk factors and long-term prognostic markers in biopsy-confirmed CNS vasculitis',
    'Investigation of advanced MRI imaging protocols including central vein sign for improved non-invasive diagnosis',
    'Mechanistic studies of amyloid-related angiitis and characterization of treatment response patterns',
  ],
  'EBV and MS': [
    'Discovery that EBV viral particles elicit dominant CD4+ T cell responses in MS, advancing understanding of the viral trigger hypothesis',
    'Investigation of EBV in exosomes as a novel pathway in MS pathogenesis and identification of anti-EBNA-1 antibody thresholds',
    'Gamma-delta (\u03B3\u03B4) T cell research using EAE animal models to understand roles of butyrophilin ligands in CNS autoimmunity',
    'Single-cell transcriptomics and flow cytometry approaches to novel autoantibody discovery and therapeutic target identification',
    'Research on folate receptor autoimmunity in autism spectrum disorder, OCD, and schizophrenia',
  ],
}

function InvestigatorPhotos({ names }: { names: string[] }) {
  const members = names
    .map((name) => team.find((m) => m.name === name))
    .filter(Boolean)

  if (members.length === 0) return null

  return (
    <div className="flex flex-wrap items-center gap-2">
      {members.map((member) => (
        <div key={member!.id} className="flex items-center gap-1.5">
          {member!.imageUrl ? (
            <Image
              src={member!.imageUrl}
              alt={member!.name}
              width={28}
              height={28}
              className="h-7 w-7 rounded-full object-cover object-top"
            />
          ) : (
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--color-primary)]/10 text-[10px] font-semibold text-[var(--color-primary)]">
              {member!.name.split(' ').map((n) => n[0]).join('')}
            </div>
          )}
          <span className="text-xs text-gray-600">{member!.name.split(' ').slice(-1)[0]}</span>
        </div>
      ))}
    </div>
  )
}

export default function ResearchPage() {
  const [activeTab, setActiveTab] = useState<string | null>(null)

  const visibleGroups = activeTab
    ? researchGroups.filter((g) => g.name === activeTab)
    : researchGroups

  const totalPubs = publications.length

  return (
    <>
      <Hero
        subtitle="Research Programs"
        title="Advancing Autoimmune Neurology"
        description="ANDOR's research spans six interconnected programs, each leveraging shared infrastructure, federated registries, and a collaborative team to tackle rare autoimmune neurological diseases."
      />

      <SectionWrapper>
        <p className="mx-auto max-w-3xl text-center leading-relaxed text-gray-600">
          Our team has published over {totalPubs} peer-reviewed papers in the last decade across
          six core research areas. Select a program below to explore our work.
        </p>

        <div className="mt-8">
          <DiseaseTabs activeTab={activeTab} onChange={setActiveTab} />
        </div>
      </SectionWrapper>

      {visibleGroups.map((group, i) => {
        const highlights = programHighlights[group.name] ?? []
        const groupPubs = publications.filter((p) => p.researchGroup === group.name)
        const shown = groupPubs.slice(0, 6)
        const remaining = groupPubs.length - shown.length
        const borderClass = colorMap[group.accentColor] ?? 'border-l-gray-400'

        return (
          <SectionWrapper key={group.id} alt={i % 2 === 1} id={group.slug}>
            <div className={`border-l-4 ${borderClass} pl-6`}>
              {/* Header */}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-[var(--color-primary)]">{group.name}</h2>
                  {group.patientCount && (
                    <p className="mt-1 text-sm font-medium text-[var(--color-accent)]">
                      {group.patientCount} patients in registry
                    </p>
                  )}
                </div>
                <InvestigatorPhotos names={group.keyInvestigators} />
              </div>

              <p className="mt-4 max-w-3xl leading-relaxed text-gray-600">{group.description}</p>

              {/* Research Highlights */}
              {highlights.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
                    Research Highlights
                  </h3>
                  <ul className="mt-3 space-y-2">
                    {highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <svg
                          className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-accent)]"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-sm leading-relaxed text-gray-700">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Publications — compact list */}
              <div className="mt-6">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
                  Selected Publications
                  {groupPubs.length > 0 && (
                    <span className="ml-2 inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-600 normal-case tracking-normal">
                      {groupPubs.length}
                    </span>
                  )}
                </h3>
                {shown.length > 0 ? (
                  <ul className="mt-3 space-y-2">
                    {shown.map((pub) => (
                      <li key={pub.id} className="flex items-start gap-2 text-sm">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gray-300" />
                        <div>
                          {pub.pmid ? (
                            <a
                              href={`https://pubmed.ncbi.nlm.nih.gov/${pub.pmid}/`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-medium text-gray-900 hover:text-[var(--color-accent)]"
                            >
                              {pub.title}
                            </a>
                          ) : (
                            <span className="font-medium text-gray-900">{pub.title}</span>
                          )}
                          <span className="ml-1 text-gray-400">
                            {pub.journal} ({pub.year})
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-3 text-sm italic text-gray-400">Publications coming soon</p>
                )}
                {remaining > 0 && (
                  <p className="mt-2 text-xs text-gray-400">
                    + {remaining} more publication{remaining !== 1 ? 's' : ''}
                  </p>
                )}
              </div>
            </div>
          </SectionWrapper>
        )
      })}
    </>
  )
}
