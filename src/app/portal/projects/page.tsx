'use client'

import { useState, useMemo, useRef, useEffect } from 'react'
import SectionWrapper from '@/components/SectionWrapper'
import ViewToggle, { type ViewMode } from '@/components/portal/ViewToggle'
import BoardView, { type BoardColumn } from '@/components/portal/BoardView'
import ProjectCard from '@/components/portal/ProjectCard'
import DiseaseTabs from '@/components/DiseaseTabs'
import DiseaseChips from '@/components/portal/DiseaseChips'
import { projectStageLabels, projectStageColors } from '@/data/projects'
import { filterByDisease } from '@/data/disease-utils'
import { useProjectsStore } from '@/data/use-projects-store'
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

// --- Editable Text Cell ---

function EditableTextCell({
  value,
  onSave,
  placeholder,
}: {
  value: string
  onSave: (newValue: string) => void
  placeholder?: string
}) {
  const [editing, setEditing] = useState(false)
  const [inputValue, setInputValue] = useState(value)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (editing && inputRef.current) inputRef.current.focus()
  }, [editing])

  function save() {
    if (inputValue !== value) onSave(inputValue)
    setEditing(false)
  }

  if (editing) {
    return (
      <td className="whitespace-nowrap py-3 pr-4" onClick={(e) => e.stopPropagation()}>
        <input
          ref={inputRef}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onBlur={save}
          onKeyDown={(e) => {
            if (e.key === 'Enter') save()
            if (e.key === 'Escape') { setInputValue(value); setEditing(false) }
          }}
          className="w-36 rounded border border-gray-300 px-2 py-1 text-sm"
          placeholder={placeholder}
        />
      </td>
    )
  }

  return (
    <td
      className="group/editable cursor-pointer whitespace-nowrap py-3 pr-4 text-sm text-gray-600"
      onClick={(e) => { e.stopPropagation(); setInputValue(value); setEditing(true) }}
      title="Click to edit"
    >
      {value || '\u2014'}
      <svg className="ml-1 inline h-3 w-3 text-gray-300 opacity-0 transition-opacity group-hover/editable:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
      </svg>
    </td>
  )
}

// --- Expanded Project Row ---

function ExpandedProjectRow({
  project,
  onUpdate,
}: {
  project: Project
  onUpdate: (updates: Partial<Project>) => void
}) {
  return (
    <tr>
      <td colSpan={9} className="bg-gray-50 px-4 py-4">
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
          <DiseaseChips
            diseases={project.diseases}
            onUpdate={(newDiseases) => onUpdate({ diseases: newDiseases })}
          />
        </div>
      </td>
    </tr>
  )
}

export default function ProjectsPage() {
  const { projects: allProjects, updateProject, deleteProject } = useProjectsStore()
  const [view, setView] = useState<ViewMode>('table')
  const [diseaseTab, setDiseaseTab] = useState<string | null>(null)
  const [stageFilter, setStageFilter] = useState<ProjectStage | 'all'>('all')
  const [leadFilter, setLeadFilter] = useState<string>('all')
  const [sortKey, setSortKey] = useState<SortKey>('title')
  const [sortDir, setSortDir] = useState<SortDir>('asc')
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null)

  const diseaseFiltered = useMemo(
    () => filterByDisease(allProjects, diseaseTab),
    [allProjects, diseaseTab]
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

  function handleDelete(id: string) {
    deleteProject(id)
    setConfirmDeleteId(null)
    if (expandedId === id) setExpandedId(null)
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
                {allProjects.length} projects across all disease areas
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
        {/* Filters */}
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
                    <th className="w-16 py-3 pr-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500"></th>
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
                        <EditableTextCell
                          value={project.lead}
                          onSave={(v) => updateProject(project.id, { lead: v })}
                          placeholder="Lead..."
                        />
                        <EditableTextCell
                          value={project.pi}
                          onSave={(v) => updateProject(project.id, { pi: v })}
                          placeholder="PI..."
                        />
                        <td className="py-3 pr-4">
                          <div className="flex flex-wrap gap-1">
                            {project.diseases.length > 0 ? project.diseases.map((d) => (
                              <span key={d} className="text-xs text-gray-500">{d}</span>
                            )) : <span className="text-xs text-gray-400">{'\u2014'}</span>}
                          </div>
                        </td>
                        <td className="whitespace-nowrap py-3 pr-4 text-sm text-gray-600">{project.researchType || '\u2014'}</td>
                        <td className="whitespace-nowrap py-3 pr-4" onClick={(e) => e.stopPropagation()}>
                          <select
                            value={project.stage}
                            onChange={(e) => updateProject(project.id, { stage: e.target.value as ProjectStage })}
                            className={`rounded-full border-0 px-2.5 py-0.5 text-xs font-medium ${projectStageColors[project.stage]}`}
                          >
                            {Object.entries(projectStageLabels).map(([key, label]) => (
                              <option key={key} value={key}>{label}</option>
                            ))}
                          </select>
                        </td>
                        <td className="whitespace-nowrap py-3 pr-4" onClick={(e) => e.stopPropagation()}>
                          {confirmDeleteId === project.id ? (
                            <div className="flex gap-1">
                              <button
                                onClick={() => handleDelete(project.id)}
                                className="rounded bg-red-500 px-2 py-0.5 text-xs text-white hover:bg-red-600"
                              >
                                Yes
                              </button>
                              <button
                                onClick={() => setConfirmDeleteId(null)}
                                className="text-xs text-gray-500"
                              >
                                No
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setConfirmDeleteId(project.id)}
                              className="text-gray-400 hover:text-red-500"
                              title="Delete project"
                            >
                              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          )}
                        </td>
                      </tr>
                      {expandedId === project.id && (
                        <ExpandedProjectRow
                          key={`${project.id}-expanded`}
                          project={project}
                          onUpdate={(updates) => updateProject(project.id, updates)}
                        />
                      )}
                    </>
                  ))}
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={9} className="py-8 text-center text-sm text-gray-400 italic">
                        No projects match the selected filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <p className="mt-4 text-xs text-gray-400">
              Showing {filtered.length} of {allProjects.length} projects &middot; Edits saved to browser
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
