'use client'

import { useState, useMemo } from 'react'
import SectionWrapper from '@/components/SectionWrapper'
import ViewToggle, { type ViewMode } from '@/components/portal/ViewToggle'
import BoardView, { type BoardColumn } from '@/components/portal/BoardView'
import ProjectCard from '@/components/portal/ProjectCard'
import DiseaseTabs from '@/components/DiseaseTabs'
import { projects, projectStageLabels, projectStageColors } from '@/data/projects'
import { filterByDisease } from '@/data/disease-utils'
import { getRelatedGrants, getRelatedAgreements } from '@/data/cross-links'
import type { ProjectStage, Project } from '@/data/projects'

type SortKey = 'title' | 'lead' | 'pi' | 'disease' | 'stage' | 'researchType'
type SortDir = 'asc' | 'desc'

const boardColumns: BoardColumn<ProjectStage>[] = [
  { key: 'not_started', label: 'Not Started', color: 'bg-gray-100 text-gray-700' },
  { key: 'in_progress', label: 'In Progress', color: 'bg-blue-100 text-blue-700' },
  { key: 'submitted', label: 'Submitted', color: 'bg-amber-100 text-amber-700' },
  { key: 'accepted', label: 'Accepted', color: 'bg-teal-100 text-teal-700' },
  { key: 'published', label: 'Published', color: 'bg-emerald-100 text-emerald-700' },
  { key: 'completed', label: 'Completed', color: 'bg-purple-100 text-purple-700' },
]

function RelatedBadges({ label, items }: { label: string; items: { id: string; title: string }[] }) {
  if (items.length === 0) return null
  const shown = items.slice(0, 5)
  const overflow = items.length - shown.length
  return (
    <div className="sm:col-span-2 lg:col-span-3">
      <span className="text-xs font-semibold uppercase text-gray-400">{label}</span>
      <div className="mt-1 flex flex-wrap gap-1.5">
        {shown.map((item) => (
          <span key={item.id} className="rounded-full bg-[var(--color-primary)]/10 px-2.5 py-0.5 text-xs font-medium text-[var(--color-primary)] line-clamp-1">
            {item.title.length > 60 ? item.title.slice(0, 57) + '...' : item.title}
          </span>
        ))}
        {overflow > 0 && (
          <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs text-gray-500">
            +{overflow} more
          </span>
        )}
      </div>
    </div>
  )
}

function ExpandedProjectRow({ project }: { project: Project }) {
  const relatedGrants = project.diseases.length > 0 ? getRelatedGrants(project.diseases) : []
  const relatedAgreements = project.diseases.length > 0 ? getRelatedAgreements(project.diseases) : []

  return (
    <tr>
      <td colSpan={8} className="bg-gray-50 px-4 py-4">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {project.collaboration && (
            <div>
              <span className="text-xs font-semibold uppercase text-gray-400">Collaboration</span>
              <p className="text-sm text-gray-700">{project.collaboration}</p>
            </div>
          )}
          {project.fundingSource && (
            <div>
              <span className="text-xs font-semibold uppercase text-gray-400">Funding Source</span>
              <p className="text-sm text-gray-700">{project.fundingSource}</p>
            </div>
          )}
          {project.targetCompletion && (
            <div>
              <span className="text-xs font-semibold uppercase text-gray-400">Target Completion</span>
              <p className="text-sm text-gray-700">
                {new Date(project.targetCompletion).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </p>
            </div>
          )}
          {project.diseases.length > 0 && (
            <div>
              <span className="text-xs font-semibold uppercase text-gray-400">Disease Areas</span>
              <div className="mt-1 flex flex-wrap gap-1">
                {project.diseases.map((d) => (
                  <span key={d} className="rounded bg-gray-200 px-2 py-0.5 text-xs text-gray-600">{d}</span>
                ))}
              </div>
            </div>
          )}
          <RelatedBadges label="Related Grants" items={relatedGrants} />
          <RelatedBadges label="Related Agreements" items={relatedAgreements} />
        </div>
      </td>
    </tr>
  )
}

export default function ProjectsPage() {
  const [view, setView] = useState<ViewMode>('table')
  const [diseaseTab, setDiseaseTab] = useState<string | null>(null)
  const [stageFilter, setStageFilter] = useState<ProjectStage | 'all'>('all')
  const [leadFilter, setLeadFilter] = useState<string>('all')
  const [sortKey, setSortKey] = useState<SortKey>('title')
  const [sortDir, setSortDir] = useState<SortDir>('asc')
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const diseaseFiltered = useMemo(
    () => filterByDisease(projects, diseaseTab),
    [diseaseTab]
  )

  const leads = useMemo(
    () => [...new Set(diseaseFiltered.map((p) => p.lead).filter(Boolean))].sort(),
    [diseaseFiltered]
  )

  const filtered = useMemo(() => {
    let result = [...diseaseFiltered]
    if (stageFilter !== 'all') {
      result = result.filter((p) => p.stage === stageFilter)
    }
    if (leadFilter !== 'all') {
      result = result.filter((p) => p.lead === leadFilter)
    }

    result.sort((a, b) => {
      let cmp = 0
      switch (sortKey) {
        case 'title': cmp = a.title.localeCompare(b.title); break
        case 'lead': cmp = a.lead.localeCompare(b.lead); break
        case 'pi': cmp = (a.pi || '').localeCompare(b.pi || ''); break
        case 'disease': cmp = (a.diseases[0] || '').localeCompare(b.diseases[0] || ''); break
        case 'stage': cmp = a.stage.localeCompare(b.stage); break
        case 'researchType': cmp = a.researchType.localeCompare(b.researchType); break
      }
      return sortDir === 'asc' ? cmp : -cmp
    })

    return result
  }, [diseaseFiltered, stageFilter, leadFilter, sortKey, sortDir])

  function toggleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc')
    } else {
      setSortKey(key)
      setSortDir('asc')
    }
  }

  const hasFilters = stageFilter !== 'all' || leadFilter !== 'all'

  function clearFilters() {
    setStageFilter('all')
    setLeadFilter('all')
  }

  function SortHeader({ label, field }: { label: string; field: SortKey }) {
    return (
      <th
        className="cursor-pointer whitespace-nowrap py-3 pr-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 hover:text-gray-700"
        onClick={() => toggleSort(field)}
      >
        {label}
        {sortKey === field && (
          <span className="ml-1">{sortDir === 'asc' ? '\u2191' : '\u2193'}</span>
        )}
      </th>
    )
  }

  return (
    <>
      <div className="border-b border-gray-200 bg-[var(--color-surface-alt)]">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-[var(--color-primary)]">Research Projects</h1>
              <p className="mt-2 text-gray-600">
                {projects.length} projects across all disease areas
              </p>
            </div>
            <ViewToggle view={view} onChange={setView} />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <DiseaseTabs activeTab={diseaseTab} onChange={setDiseaseTab} />
      </div>

      <SectionWrapper>
        {/* Filters — disease dropdown removed in favor of tabs above */}
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <select
            value={stageFilter}
            onChange={(e) => setStageFilter(e.target.value as ProjectStage | 'all')}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700"
          >
            <option value="all">All Stages</option>
            {Object.entries(projectStageLabels).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>

          <select
            value={leadFilter}
            onChange={(e) => setLeadFilter(e.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700"
          >
            <option value="all">All Leads</option>
            {leads.map((lead) => (
              <option key={lead} value={lead}>{lead}</option>
            ))}
          </select>

          {hasFilters && (
            <button
              onClick={clearFilters}
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-500 hover:bg-gray-50"
            >
              Clear filters
            </button>
          )}
        </div>

        {view === 'table' ? (
          <>
            <div className="overflow-x-auto rounded-xl border border-gray-200">
              <table className="w-full min-w-[900px]">
                <thead className="border-b border-gray-200 bg-gray-50">
                  <tr>
                    <th className="w-8 py-3 pl-4 pr-2"></th>
                    <SortHeader label="Title" field="title" />
                    <SortHeader label="Lead" field="lead" />
                    <SortHeader label="PI" field="pi" />
                    <SortHeader label="Disease" field="disease" />
                    <SortHeader label="Type" field="researchType" />
                    <SortHeader label="Stage" field="stage" />
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((project) => (
                    <>
                      <tr
                        key={project.id}
                        className="cursor-pointer border-b border-gray-100 hover:bg-gray-50"
                        onClick={() => setExpandedId(expandedId === project.id ? null : project.id)}
                      >
                        <td className="py-3 pl-4 pr-2">
                          <svg
                            className={`h-4 w-4 text-gray-400 transition-transform ${expandedId === project.id ? 'rotate-90' : ''}`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                          </svg>
                        </td>
                        <td className="py-3 pr-4">
                          <div className="max-w-sm text-sm font-medium text-gray-900 line-clamp-2">{project.title}</div>
                        </td>
                        <td className="whitespace-nowrap py-3 pr-4 text-sm text-gray-600">{project.lead}</td>
                        <td className="whitespace-nowrap py-3 pr-4 text-sm text-gray-600">{project.pi || '\u2014'}</td>
                        <td className="py-3 pr-4">
                          <div className="flex flex-wrap gap-1">
                            {project.diseases.length > 0 ? project.diseases.map((d) => (
                              <span key={d} className="text-xs text-gray-500">{d}</span>
                            )) : <span className="text-xs text-gray-400">{'\u2014'}</span>}
                          </div>
                        </td>
                        <td className="whitespace-nowrap py-3 pr-4 text-sm text-gray-600">{project.researchType || '\u2014'}</td>
                        <td className="whitespace-nowrap py-3">
                          <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${projectStageColors[project.stage]}`}>
                            {projectStageLabels[project.stage]}
                          </span>
                        </td>
                      </tr>
                      {expandedId === project.id && (
                        <ExpandedProjectRow key={`${project.id}-expanded`} project={project} />
                      )}
                    </>
                  ))}
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-sm text-gray-400 italic">
                        No projects match the selected filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <p className="mt-4 text-xs text-gray-400">
              Showing {filtered.length} of {projects.length} projects
            </p>
          </>
        ) : (
          <BoardView columns={boardColumns}>
            {(stage) => {
              const stageProjects = filtered.filter((p) => p.stage === stage)
              return (
                <>
                  <div className="mb-1 text-xs text-gray-400">{stageProjects.length} projects</div>
                  {stageProjects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                  {stageProjects.length === 0 && (
                    <p className="py-4 text-center text-xs text-gray-300 italic">None</p>
                  )}
                </>
              )
            }}
          </BoardView>
        )}
      </SectionWrapper>
    </>
  )
}
