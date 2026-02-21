'use client'

import { useState, useMemo, useRef, useEffect } from 'react'
import { useTasksStore } from '@/data/use-tasks-store'
import {
  taskStatusLabels,
  taskStatusColors,
  taskPriorityLabels,
  taskPriorityColors,
} from '@/data/tasks'
import type { Task, TaskStatus, TaskPriority } from '@/data/tasks'
import { team } from '@/data/team'

function formatDate(dateStr: string | null): string {
  if (!dateStr) return ''
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })
}

function isOverdue(dueDate: string | null): boolean {
  if (!dueDate) return false
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return new Date(dueDate + 'T00:00:00') < today
}

function InlineAddTask({
  grantId,
  projectId,
  trialId,
  agreementId,
  defaultAssignee,
  onAdd,
}: {
  grantId?: string
  projectId?: string
  trialId?: string
  agreementId?: string
  defaultAssignee?: string
  onAdd: (task: {
    title: string
    description: string
    assignee?: string
    grantId: string | null
    projectId: string | null
    trialId: string | null
    agreementId: string | null
    dueDate: string | null
    status: TaskStatus
    priority: TaskPriority
  }) => void
}) {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [assignee, setAssignee] = useState(defaultAssignee ?? '')
  const [dueDate, setDueDate] = useState('')
  const [priority, setPriority] = useState<TaskPriority>('medium')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus()
  }, [open])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim()) return
    onAdd({
      title: title.trim(),
      description: '',
      assignee: assignee || undefined,
      grantId: grantId ?? null,
      projectId: projectId ?? null,
      trialId: trialId ?? null,
      agreementId: agreementId ?? null,
      dueDate: dueDate || null,
      status: 'pending',
      priority,
    })
    setTitle('')
    setAssignee(defaultAssignee ?? '')
    setDueDate('')
    setPriority('medium')
    setOpen(false)
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-1 text-xs font-medium text-[var(--color-accent)] hover:underline"
      >
        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
        Add task
      </button>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-lg border border-gray-200 bg-white p-3">
      <div className="flex gap-2">
        <input
          ref={inputRef}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="min-w-0 flex-1 rounded border border-gray-300 px-2 py-1 text-xs"
          placeholder="Task title..."
          required
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as TaskPriority)}
          className="rounded border border-gray-300 px-1 py-1 text-xs"
        >
          {Object.entries(taskPriorityLabels).map(([key, label]) => (
            <option key={key} value={key}>{label}</option>
          ))}
        </select>
      </div>
      <div className="mt-2 flex gap-2">
        <select
          value={assignee}
          onChange={(e) => setAssignee(e.target.value)}
          className="min-w-0 flex-1 rounded border border-gray-300 px-2 py-1 text-xs"
        >
          <option value="">Unassigned</option>
          {team.map((m) => (
            <option key={m.id} value={m.name}>{m.name}</option>
          ))}
        </select>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="rounded border border-gray-300 px-2 py-1 text-xs"
        />
      </div>
      <div className="mt-2 flex gap-2">
        <button
          type="submit"
          className="rounded bg-[var(--color-primary)] px-3 py-1 text-xs font-medium text-white hover:bg-[var(--color-primary-light)]"
        >
          Add
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="text-xs text-gray-500 hover:text-gray-700"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

function EditableTask({
  task,
  updateTask,
  deleteTask,
}: {
  task: Task
  updateTask: (id: string, updates: Partial<Task>) => void
  deleteTask: (id: string) => void
}) {
  const [expanded, setExpanded] = useState(false)
  const [editTitle, setEditTitle] = useState(task.title)
  const [editDesc, setEditDesc] = useState(task.description)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const overdue = task.status !== 'completed' && isOverdue(task.dueDate)

  return (
    <div
      className={`rounded-lg border ${
        overdue ? 'border-red-200 bg-red-50' : 'border-gray-200 bg-white'
      } ${task.status === 'completed' ? 'opacity-60' : ''}`}
    >
      <div
        className="flex cursor-pointer items-center gap-2 px-3 py-2"
        onClick={() => setExpanded(!expanded)}
      >
        <button
          onClick={(e) => {
            e.stopPropagation()
            updateTask(task.id, {
              status: task.status === 'completed' ? 'pending' : 'completed',
            })
          }}
          className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border-2 transition-colors ${
            task.status === 'completed'
              ? 'border-emerald-500 bg-emerald-500 text-white'
              : 'border-gray-300 hover:border-gray-400'
          }`}
        >
          {task.status === 'completed' && (
            <svg className="h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </button>
        <span className={`min-w-0 flex-1 text-xs font-medium truncate ${
          task.status === 'completed' ? 'text-gray-400 line-through' : 'text-gray-900'
        }`}>
          {task.title}
        </span>
        {task.assignee && (
          <span className="text-[10px] text-gray-400">{task.assignee.split(' ').pop()}</span>
        )}
        {task.dueDate && (
          <span className={`text-[10px] ${overdue ? 'font-semibold text-red-600' : 'text-gray-400'}`}>
            {formatDate(task.dueDate)}
            {overdue && ' !'}
          </span>
        )}
        <span className={`inline-flex rounded-full px-1.5 py-0.5 text-[10px] font-medium ${taskPriorityColors[task.priority]}`}>
          {taskPriorityLabels[task.priority]}
        </span>
        <select
          value={task.status}
          onChange={(e) => updateTask(task.id, { status: e.target.value as TaskStatus })}
          className={`rounded-full border-0 px-1.5 py-0.5 text-[10px] font-medium ${taskStatusColors[task.status]}`}
          onClick={(e) => e.stopPropagation()}
        >
          {Object.entries(taskStatusLabels).map(([key, label]) => (
            <option key={key} value={key}>{label}</option>
          ))}
        </select>
        <svg
          className={`h-3 w-3 shrink-0 text-gray-400 transition-transform ${expanded ? 'rotate-90' : ''}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </div>

      {expanded && (
        <div className="border-t border-gray-100 bg-gray-50 px-3 py-2" onClick={(e) => e.stopPropagation()}>
          <div className="grid gap-2 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="text-[10px] font-medium text-gray-500">Title</label>
              <input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                onBlur={() => { if (editTitle.trim() && editTitle !== task.title) updateTask(task.id, { title: editTitle.trim() }) }}
                className="mt-0.5 w-full rounded border border-gray-300 px-2 py-1 text-xs"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="text-[10px] font-medium text-gray-500">Description</label>
              <textarea
                value={editDesc}
                onChange={(e) => setEditDesc(e.target.value)}
                onBlur={() => { if (editDesc !== task.description) updateTask(task.id, { description: editDesc }) }}
                className="mt-0.5 w-full rounded border border-gray-300 px-2 py-1 text-xs"
                rows={2}
              />
            </div>
            <div>
              <label className="text-[10px] font-medium text-gray-500">Assignee</label>
              <select
                value={task.assignee ?? ''}
                onChange={(e) => updateTask(task.id, { assignee: e.target.value || undefined })}
                className="mt-0.5 w-full rounded border border-gray-300 px-2 py-1 text-xs"
              >
                <option value="">Unassigned</option>
                {team.map((m) => (
                  <option key={m.id} value={m.name}>{m.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-[10px] font-medium text-gray-500">Due Date</label>
              <input
                type="date"
                value={task.dueDate ?? ''}
                onChange={(e) => updateTask(task.id, { dueDate: e.target.value || null })}
                className="mt-0.5 w-full rounded border border-gray-300 px-2 py-1 text-xs"
              />
            </div>
            <div>
              <label className="text-[10px] font-medium text-gray-500">Priority</label>
              <select
                value={task.priority}
                onChange={(e) => updateTask(task.id, { priority: e.target.value as TaskPriority })}
                className="mt-0.5 w-full rounded border border-gray-300 px-2 py-1 text-xs"
              >
                {Object.entries(taskPriorityLabels).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-2 flex justify-end">
            {confirmDelete ? (
              <div className="flex gap-2">
                <span className="text-[10px] text-gray-500">Delete?</span>
                <button
                  onClick={() => { deleteTask(task.id); setConfirmDelete(false) }}
                  className="rounded bg-red-500 px-2 py-0.5 text-[10px] text-white hover:bg-red-600"
                >
                  Yes
                </button>
                <button
                  onClick={() => setConfirmDelete(false)}
                  className="text-[10px] text-gray-500"
                >
                  No
                </button>
              </div>
            ) : (
              <button
                onClick={() => setConfirmDelete(true)}
                className="text-[10px] text-gray-400 hover:text-red-500"
              >
                Delete
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function TaskItems({ grantId, projectId, trialId, agreementId, defaultAssignee }: { grantId?: string; projectId?: string; trialId?: string; agreementId?: string; defaultAssignee?: string }) {
  const { tasks, addTask, updateTask, deleteTask } = useTasksStore()

  const linkedTasks = useMemo(() => {
    return tasks.filter((t) => {
      if (grantId) return t.grantId === grantId
      if (projectId) return t.projectId === projectId
      if (trialId) return t.trialId === trialId
      if (agreementId) return t.agreementId === agreementId
      return false
    })
  }, [tasks, grantId, projectId, trialId, agreementId])

  const active = linkedTasks.filter((t) => t.status !== 'completed')
  const completed = linkedTasks.filter((t) => t.status === 'completed')

  return (
    <>
      {active.map((task) => (
        <EditableTask
          key={task.id}
          task={task}
          updateTask={updateTask}
          deleteTask={deleteTask}
        />
      ))}
      {completed.length > 0 && (
        <details className="group">
          <summary className="cursor-pointer text-[10px] text-gray-400 hover:text-gray-600">
            {completed.length} completed task{completed.length !== 1 ? 's' : ''}
          </summary>
          <div className="mt-1 space-y-1">
            {completed.map((task) => (
              <EditableTask
                key={task.id}
                task={task}
                updateTask={updateTask}
                deleteTask={deleteTask}
              />
            ))}
          </div>
        </details>
      )}
      <InlineAddTask grantId={grantId} projectId={projectId} trialId={trialId} agreementId={agreementId} defaultAssignee={defaultAssignee} onAdd={addTask} />
    </>
  )
}

export default function LinkedTasks({
  grantId,
  projectId,
  trialId,
  agreementId,
  defaultAssignee,
}: {
  grantId?: string
  projectId?: string
  trialId?: string
  agreementId?: string
  defaultAssignee?: string
}) {
  return <TaskItems grantId={grantId} projectId={projectId} trialId={trialId} agreementId={agreementId} defaultAssignee={defaultAssignee} />
}
