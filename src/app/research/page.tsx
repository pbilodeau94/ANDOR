'use client'

import { useState } from 'react'
import Hero from '@/components/Hero'
import SectionWrapper from '@/components/SectionWrapper'
import DiseaseTabs from '@/components/DiseaseTabs'
import PublicationCard from '@/components/PublicationCard'
import { researchGroups } from '@/data/research-groups'
import { publications } from '@/data/publications'

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
          project portfolio. Select a program below to explore our key publications.
        </p>

        <div className="mt-8">
          <DiseaseTabs activeTab={activeTab} onChange={setActiveTab} />
        </div>
      </SectionWrapper>

      {visibleGroups.map((group, i) => {
        const groupPubs = publications.filter((p) => p.researchGroup === group.name)

        return (
          <SectionWrapper key={group.id} alt={i % 2 === 1} id={group.slug}>
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Group info card */}
              <div className="lg:col-span-1">
                <div className="text-4xl">{group.icon}</div>
                <h2 className="mt-3 text-2xl font-bold text-[var(--color-primary)]">{group.name}</h2>
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

              {/* Publications grid */}
              <div className="lg:col-span-2">
                <h3 className="text-lg font-semibold text-gray-900">
                  Key Publications ({groupPubs.length})
                </h3>
                {groupPubs.length > 0 ? (
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    {groupPubs.map((pub) => (
                      <PublicationCard key={pub.id} pub={pub} />
                    ))}
                  </div>
                ) : (
                  <p className="mt-4 text-sm italic text-gray-400">No publications listed yet</p>
                )}
              </div>
            </div>
          </SectionWrapper>
        )
      })}
    </>
  )
}
