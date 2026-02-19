'use client'

import { useState, useMemo } from 'react'
import SectionWrapper from '@/components/SectionWrapper'
import { projects, projectStageLabels, projectStageColors } from '@/data/projects'
import type { ProjectStage } from '@/data/projects'

const diseaseAreas = [
  'MOGAD',
  'NMOSD',
  'MS',
  'Autoimmune Encephalitis',
  'Neurosarcoidosis',
  'Vasculitis',
]

export default function ProjectsPage() {
  const [diseaseFilter, setDiseaseFilter] = useState<string>('all')
  const [stageFilter, setStageFilter] = useState<ProjectStage | 'all'>('all')

  const filtered = useMemo(() => {
    let result = [...projects]
    if (diseaseFilter !== 'all') {
      result = result.filter((p) =>
        p.diseases.some((d) => d.toLowerCase() === diseaseFilter.toLowerCase())
      )
    }
    if (stageFilter !== 'all') {
      result = result.filter((p) => p.stage === stageFilter)
    }
    return result
  }, [diseaseFilter, stageFilter])

  const grouped = useMemo(() => {
    const groups: Record<string, typeof projects> = {}
    for (const area of diseaseAreas) {
      const matching = filtered.filter((p) =>
        p.diseases.some((d) => d.toLowerCase() === area.toLowerCase())
      )
      if (matching.length > 0) groups[area] = matching
    }
    // Add "Other" for projects not matching any primary disease area
    const otherProjects = filtered.filter(
      (p) =>
        p.diseases.length === 0 ||
        !p.diseases.some((d) =>
          diseaseAreas.some((area) => area.toLowerCase() === d.toLowerCase())
        )
    )
    if (otherProjects.length > 0) groups['Other'] = otherProjects
    return groups
  }, [filtered])

  return (
    <>
      <div className="border-b border-gray-200 bg-[var(--color-surface-alt)]">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-[var(--color-primary)]">Research Projects</h1>
          <p className="mt-2 text-gray-600">
            {projects.length} projects across all disease areas
          </p>
        </div>
      </div>

      <SectionWrapper>
        {/* Filters */}
        <div className="mb-6 flex flex-wrap gap-3">
          <select
            value={diseaseFilter}
            onChange={(e) => setDiseaseFilter(e.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700"
          >
            <option value="all">All Disease Areas</option>
            {diseaseAreas.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>

          <select
            value={stageFilter}
            onChange={(e) => setStageFilter(e.target.value as ProjectStage | 'all')}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700"
          >
            <option value="all">All Stages</option>
            {Object.entries(projectStageLabels).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>

          {(diseaseFilter !== 'all' || stageFilter !== 'all') && (
            <button
              onClick={() => {
                setDiseaseFilter('all')
                setStageFilter('all')
              }}
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-500 hover:bg-gray-50"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Grouped Projects */}
        {Object.entries(grouped).map(([area, areaProjects]) => (
          <div key={area} className="mb-10">
            <h2 className="mb-4 text-xl font-bold text-[var(--color-primary)]">
              {area}{' '}
              <span className="text-base font-normal text-gray-400">({areaProjects.length})</span>
            </h2>
            <div className="space-y-3">
              {areaProjects.map((project) => (
                <div
                  key={project.id}
                  className="rounded-lg border border-gray-200 bg-white p-4 transition-shadow hover:shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm font-medium text-gray-900">{project.title}</h3>
                      <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500">
                        <span>Lead: {project.lead}</span>
                        {project.pi && project.pi !== project.lead && (
                          <span>PI: {project.pi}</span>
                        )}
                        {project.collaboration && <span>{project.collaboration}</span>}
                        {project.fundingSource && (
                          <span className="text-gray-400">Funded: {project.fundingSource}</span>
                        )}
                        {project.researchType && (
                          <span className="text-gray-400">{project.researchType}</span>
                        )}
                      </div>
                    </div>
                    <span
                      className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${projectStageColors[project.stage]}`}
                    >
                      {projectStageLabels[project.stage]}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {Object.keys(grouped).length === 0 && (
          <p className="py-8 text-center text-sm text-gray-400 italic">
            No projects match the selected filters.
          </p>
        )}

        <p className="mt-4 text-xs text-gray-400">
          Showing {filtered.length} of {projects.length} projects
        </p>
      </SectionWrapper>
    </>
  )
}
