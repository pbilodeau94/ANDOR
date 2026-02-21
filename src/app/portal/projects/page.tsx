'use client'

import { useState, useMemo, useRef, useEffect } from 'react'
import PortalSection from '@/components/portal/PortalSection'
import PortalPageHeader from '@/components/portal/PortalPageHeader'
import DiseaseChips from '@/components/portal/DiseaseChips'
import LinkedTasks from '@/components/portal/LinkedTasks'
import TeamMemberChips from '@/components/portal/TeamMemberChips'
import CheckboxFilterDropdown from '@/components/portal/CheckboxFilterDropdown'
import { projectStageLabels, projectStageColors } from '@/data/projects'
import { useProjectsStore } from '@/data/use-projects-store'
import { publications } from '@/data/publications'
import type { ProjectStage, Project } from '@/data/projects'

type SortKey = 'title' | 'lead' | 'pi' | 'disease' | 'stage' | 'researchType'
type SortDir = 'asc' | 'desc'

const researchTypes = ['Clinical', 'Translational', 'Basic', 'Basic & Clinical', 'Clinical Trial']

// --- Add Project Form ---

function AddProjectForm({ onAdd }: { onAdd: (project: Omit<Project, 'id'>) => void }) {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [lead, setLead] = useState<string[]>([])
  const [pi, setPi] = useState<string[]>([])
  const [diseases, setDiseases] = useState<string[]>([])
  const [researchType, setResearchType] = useState('Clinical')
  const [stage, setStage] = useState<ProjectStage>('not_started')
  const titleRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open && titleRef.current) titleRef.current.focus()
  }, [open])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim()) return
    onAdd({
      title: title.trim(),
      lead: lead[0] || '',
      pi: pi[0] || '',
      collaboration: '',
      diseases,
      fundingSource: '',
      stage,
      targetCompletion: null,
      researchType,
    })
    setTitle('')
    setLead([])
    setPi([])
    setDiseases([])
    setResearchType('Clinical')
    setStage('not_started')
    setOpen(false)
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-1.5 rounded-lg bg-[var(--color-primary)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--color-primary-dark)] transition-colors"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
        Add Project
      </button>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-gray-200 bg-white p-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="text-xs font-medium text-gray-500">Title *</label>
          <input
            ref={titleRef}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-0.5 w-full rounded border border-gray-300 px-3 py-1.5 text-sm"
            placeholder="Project title..."
            required
          />
        </div>
        <TeamMemberChips members={lead} onUpdate={setLead} label="Lead" addLabel="+ Set lead" />
        <TeamMemberChips members={pi} onUpdate={setPi} label="PI" addLabel="+ Set PI" />
        <div>
          <label className="text-xs font-medium text-gray-500">Research Type</label>
          <select
            value={researchType}
            onChange={(e) => setResearchType(e.target.value)}
            className="mt-0.5 w-full rounded border border-gray-300 px-3 py-1.5 text-sm"
          >
            {researchTypes.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <label className="text-xs font-medium text-gray-500">Stage</label>
          <select
            value={stage}
            onChange={(e) => setStage(e.target.value as ProjectStage)}
            className="mt-0.5 w-full rounded border border-gray-300 px-3 py-1.5 text-sm"
          >
            {Object.entries(projectStageLabels).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="mt-4 flex gap-2">
        <button
          type="submit"
          className="rounded-lg bg-[var(--color-primary)] px-4 py-1.5 text-sm font-medium text-white hover:bg-[var(--color-primary-dark)]"
        >
          Add Project
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="rounded-lg border border-gray-300 px-4 py-1.5 text-sm text-gray-600 hover:bg-gray-50"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

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
          <TeamMemberChips
            members={project.lead ? [project.lead] : []}
            onUpdate={(m) => onUpdate({ lead: m[0] || '' })}
            label="Lead"
            addLabel="+ Set lead"
          />
          <TeamMemberChips
            members={project.pi ? [project.pi] : []}
            onUpdate={(m) => onUpdate({ pi: m[0] || '' })}
            label="PI"
            addLabel="+ Set PI"
          />
          {project.collaboration && (
            <div>
              <span className="text-xs font-semibold uppercase text-gray-400">Collaboration</span>
              <p className="text-sm text-gray-700">{project.collaboration}</p>
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
          {project.stage === 'published' && (
            <div className="sm:col-span-2 lg:col-span-3">
              <span className="text-xs font-semibold uppercase text-gray-400">Publication URL</span>
              <input
                type="url"
                value={project.publicationUrl || ''}
                onChange={(e) => onUpdate({ publicationUrl: e.target.value || null })}
                className="mt-0.5 w-full rounded border border-gray-300 px-2 py-1 text-sm"
                placeholder="https://pubmed.ncbi.nlm.nih.gov/..."
              />
            </div>
          )}
          <div className="sm:col-span-2 lg:col-span-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase text-gray-400">Tasks</span>
              <a href="/portal/tasks" className="text-[10px] font-medium text-[var(--color-accent)] hover:underline">
                All tasks &rarr;
              </a>
            </div>
            <div className="mt-2 space-y-1">
              <LinkedTasks projectId={project.id} />
            </div>
          </div>
        </div>
      </td>
    </tr>
  )
}

// --- Stage Tabs ---

function StageTabs({ activeTab, onChange }: { activeTab: ProjectStage | null; onChange: (tab: ProjectStage | null) => void }) {
  const tabs: { key: ProjectStage | null; label: string }[] = [
    { key: null, label: 'All' },
    ...Object.entries(projectStageLabels).map(([key, label]) => ({ key: key as ProjectStage, label })),
  ]

  return (
    <div className="border-b border-gray-200">
      <nav className="-mb-px flex gap-1 overflow-x-auto" aria-label="Project stage filters">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key
          return (
            <button
              key={tab.label}
              onClick={() => onChange(tab.key)}
              className={`whitespace-nowrap border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
                isActive
                  ? 'border-[var(--color-primary)] text-[var(--color-primary)]'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          )
        })}
      </nav>
    </div>
  )
}

export default function ProjectsPage() {
  const { projects: allProjects, updateProject, deleteProject, addProject } = useProjectsStore()
  const [stageTab, setStageTab] = useState<ProjectStage | null>(null)
  const [diseaseFilter, setDiseaseFilter] = useState<string[]>([])
  const [typeFilter, setTypeFilter] = useState<string[]>([])
  const [piFilter, setPiFilter] = useState<string[]>([])
  const [sortKey, setSortKey] = useState<SortKey>('title')
  const [sortDir, setSortDir] = useState<SortDir>('asc')
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null)

  const stageFiltered = useMemo(
    () => stageTab ? allProjects.filter((p) => p.stage === stageTab) : allProjects,
    [allProjects, stageTab]
  )

  const allDiseases = useMemo(
    () => [...new Set(stageFiltered.flatMap((p) => p.diseases))].sort(),
    [stageFiltered]
  )

  const allTypes = useMemo(
    () => [...new Set(stageFiltered.map((p) => p.researchType).filter(Boolean))].sort(),
    [stageFiltered]
  )

  const allPis = useMemo(
    () => [...new Set(stageFiltered.map((p) => p.pi).filter(Boolean))].sort(),
    [stageFiltered]
  )

  const hasFilters = diseaseFilter.length > 0 || typeFilter.length > 0 || piFilter.length > 0

  const filtered = useMemo(() => {
    let result = [...stageFiltered]
    if (diseaseFilter.length > 0) {
      result = result.filter((p) => diseaseFilter.some((d) => p.diseases.includes(d)))
    }
    if (typeFilter.length > 0) {
      result = result.filter((p) => typeFilter.includes(p.researchType))
    }
    if (piFilter.length > 0) {
      result = result.filter((p) => piFilter.includes(p.pi) || piFilter.includes(p.lead))
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
  }, [stageFiltered, diseaseFilter, typeFilter, piFilter, sortKey, sortDir])

  function toggleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc')
    } else {
      setSortKey(key)
      setSortDir('asc')
    }
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
      <PortalPageHeader
        title="Research Projects"
        subtitle={`${allProjects.length} projects across all disease areas`}
      />


      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <StageTabs activeTab={stageTab} onChange={setStageTab} />
      </div>

      <PortalSection>
        {stageTab === 'published' ? (
          /* Published = all ANDOR publications + published projects */
          <div className="space-y-2">
            <p className="mb-4 text-sm text-gray-500">
              {publications.length} publications across all research programs
            </p>
            {publications.map((pub) => {
              const pubUrl = pub.pmid
                ? `https://pubmed.ncbi.nlm.nih.gov/${pub.pmid}/`
                : pub.doi
                  ? `https://doi.org/${pub.doi}`
                  : null
              return (
                <div key={pub.id} className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white px-4 py-3">
                  <div className="min-w-0 flex-1">
                    {pubUrl ? (
                      <a
                        href={pubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-gray-900 hover:text-[var(--color-accent)]"
                      >
                        {pub.title}
                      </a>
                    ) : (
                      <span className="text-sm font-medium text-gray-900">{pub.title}</span>
                    )}
                    <div className="mt-0.5 flex items-center gap-2 text-xs text-gray-500">
                      <span>{pub.journal} ({pub.year})</span>
                      <span className="text-gray-300">&middot;</span>
                      <span>{pub.researchGroup}</span>
                    </div>
                    <p className="mt-0.5 text-xs text-gray-400 line-clamp-1">{pub.authors}</p>
                  </div>
                  {pub.pmid && (
                    <a
                      href={`https://pubmed.ncbi.nlm.nih.gov/${pub.pmid}/`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 rounded bg-gray-100 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-gray-500 transition-colors hover:bg-[var(--color-accent)] hover:text-white"
                    >
                      PubMed
                    </a>
                  )}
                </div>
              )
            })}
          </div>
        ) : (
          <>
            {/* Filters + Add */}
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <AddProjectForm onAdd={addProject} />

              <CheckboxFilterDropdown
                allItems={allDiseases}
                selected={diseaseFilter}
                onChange={setDiseaseFilter}
                label="All Diseases"
              />
              <CheckboxFilterDropdown
                allItems={allTypes}
                selected={typeFilter}
                onChange={setTypeFilter}
                label="All Types"
              />
              <CheckboxFilterDropdown
                allItems={allPis}
                selected={piFilter}
                onChange={setPiFilter}
                label="All PIs"
              />

              {hasFilters && (
                <button
                  onClick={() => { setDiseaseFilter([]); setTypeFilter([]); setPiFilter([]) }}
                  className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-500 hover:bg-gray-50"
                >
                  Clear filters
                </button>
              )}
            </div>

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
        )}
      </PortalSection>
    </>
  )
}
