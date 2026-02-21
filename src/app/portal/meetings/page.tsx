'use client'

import { useState, useMemo, useRef, useEffect } from 'react'
import PortalSection from '@/components/portal/PortalSection'
import PortalPageHeader from '@/components/portal/PortalPageHeader'
import { useMeetingsStore } from '@/data/use-meetings-store'
import { meetingTypeLabels, meetingTypeColors } from '@/data/meetings'
import type { Meeting, MeetingType } from '@/data/meetings'
import { team } from '@/data/team'

function formatDate(dateStr: string): string {
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

function isUpcoming(dateStr: string): boolean {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return new Date(dateStr + 'T00:00:00') >= today
}

function AddMeetingForm({ onAdd, onCancel }: { onAdd: (m: Omit<Meeting, 'id'>) => void; onCancel: () => void }) {
  const [title, setTitle] = useState('')
  const [type, setType] = useState<MeetingType>('general')
  const [date, setDate] = useState('')
  const [recurring, setRecurring] = useState('')
  const [attendeesStr, setAttendeesStr] = useState('')
  const [notes, setNotes] = useState('')
  const titleRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (titleRef.current) titleRef.current.focus()
  }, [])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim() || !date) return
    onAdd({
      title: title.trim(),
      type,
      date,
      recurring: recurring || undefined,
      attendees: attendeesStr.split(',').map((a) => a.trim()).filter(Boolean),
      agendaItems: [],
      actionItems: [],
      notes: notes.trim(),
    })
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-gray-200 bg-white p-4">
      <h3 className="text-sm font-semibold text-gray-700">Add Meeting</h3>
      <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <div className="sm:col-span-2 lg:col-span-3">
          <label className="text-xs font-medium text-gray-500">Title *</label>
          <input
            ref={titleRef}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-0.5 w-full rounded border border-gray-300 px-3 py-1.5 text-sm"
            required
          />
        </div>
        <div>
          <label className="text-xs font-medium text-gray-500">Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as MeetingType)}
            className="mt-0.5 w-full rounded border border-gray-300 px-3 py-1.5 text-sm"
          >
            {Object.entries(meetingTypeLabels).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-xs font-medium text-gray-500">Date *</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-0.5 w-full rounded border border-gray-300 px-3 py-1.5 text-sm"
            required
          />
        </div>
        <div>
          <label className="text-xs font-medium text-gray-500">Recurring</label>
          <input
            value={recurring}
            onChange={(e) => setRecurring(e.target.value)}
            className="mt-0.5 w-full rounded border border-gray-300 px-3 py-1.5 text-sm"
            placeholder="e.g. Weekly, Biweekly"
          />
        </div>
        <div className="sm:col-span-2 lg:col-span-3">
          <label className="text-xs font-medium text-gray-500">Attendees (comma-separated)</label>
          <input
            value={attendeesStr}
            onChange={(e) => setAttendeesStr(e.target.value)}
            className="mt-0.5 w-full rounded border border-gray-300 px-3 py-1.5 text-sm"
            placeholder="e.g. Michael Levy, Phil Bilodeau"
          />
        </div>
        <div className="sm:col-span-2 lg:col-span-3">
          <label className="text-xs font-medium text-gray-500">Notes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="mt-0.5 w-full rounded border border-gray-300 px-3 py-1.5 text-sm"
            rows={2}
          />
        </div>
      </div>
      <div className="mt-4 flex gap-2">
        <button type="submit" className="rounded-lg bg-[var(--color-primary)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--color-primary-light)]">
          Add Meeting
        </button>
        <button type="button" onClick={onCancel} className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50">
          Cancel
        </button>
      </div>
    </form>
  )
}

function MeetingCard({
  meeting,
  updateMeeting,
  deleteMeeting,
}: {
  meeting: Meeting
  updateMeeting: (id: string, updates: Partial<Meeting>) => void
  deleteMeeting: (id: string) => void
}) {
  const [expanded, setExpanded] = useState(false)
  const [newAgenda, setNewAgenda] = useState('')
  const [newAction, setNewAction] = useState('')
  const [newActionAssignee, setNewActionAssignee] = useState('')
  const [editNotes, setEditNotes] = useState(meeting.notes)
  const [confirmDelete, setConfirmDelete] = useState(false)

  return (
    <div className="rounded-xl border border-gray-200 bg-white transition-shadow hover:shadow-sm">
      <div
        className="flex cursor-pointer items-start gap-3 p-4"
        onClick={() => setExpanded(!expanded)}
      >
        <svg
          className={`mt-0.5 h-4 w-4 shrink-0 text-gray-400 transition-transform ${expanded ? 'rotate-90' : ''}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-900">{meeting.title}</span>
            <span className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-medium ${meetingTypeColors[meeting.type]}`}>
              {meetingTypeLabels[meeting.type]}
            </span>
          </div>
          <div className="mt-1 flex items-center gap-2 text-xs text-gray-400">
            <span>{formatDate(meeting.date)}</span>
            {meeting.recurring && (
              <>
                <span className="text-gray-300">&middot;</span>
                <span>{meeting.recurring}</span>
              </>
            )}
            {meeting.attendees.length > 0 && (
              <>
                <span className="text-gray-300">&middot;</span>
                <span>{meeting.attendees.length} attendees</span>
              </>
            )}
            {meeting.actionItems.length > 0 && (
              <>
                <span className="text-gray-300">&middot;</span>
                <span className="text-amber-600">{meeting.actionItems.filter((a) => !a.done).length} open actions</span>
              </>
            )}
          </div>
        </div>
      </div>

      {expanded && (
        <div className="border-t border-gray-100 bg-gray-50 px-4 py-3" onClick={(e) => e.stopPropagation()}>
          <div className="space-y-4">
            {/* Attendees */}
            {meeting.attendees.length > 0 && (
              <div>
                <span className="text-xs font-semibold uppercase text-gray-400">Attendees</span>
                <div className="mt-1 flex flex-wrap gap-1">
                  {meeting.attendees.map((a) => (
                    <span key={a} className="rounded bg-gray-200 px-2 py-0.5 text-xs text-gray-600">{a}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Agenda */}
            <div>
              <span className="text-xs font-semibold uppercase text-gray-400">Agenda Items</span>
              {meeting.agendaItems.length > 0 && (
                <ul className="mt-1 space-y-1">
                  {meeting.agendaItems.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                      <span className="text-gray-300">&bull;</span>
                      {item}
                    </li>
                  ))}
                </ul>
              )}
              <div className="mt-2 flex gap-2">
                <input
                  value={newAgenda}
                  onChange={(e) => setNewAgenda(e.target.value)}
                  className="min-w-0 flex-1 rounded border border-gray-300 px-2 py-1 text-xs"
                  placeholder="Add agenda item..."
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && newAgenda.trim()) {
                      e.preventDefault()
                      updateMeeting(meeting.id, { agendaItems: [...meeting.agendaItems, newAgenda.trim()] })
                      setNewAgenda('')
                    }
                  }}
                />
                <button
                  onClick={() => {
                    if (newAgenda.trim()) {
                      updateMeeting(meeting.id, { agendaItems: [...meeting.agendaItems, newAgenda.trim()] })
                      setNewAgenda('')
                    }
                  }}
                  className="rounded bg-gray-200 px-2 py-1 text-xs text-gray-600 hover:bg-gray-300"
                >
                  Add
                </button>
              </div>
            </div>

            {/* Action Items */}
            <div>
              <span className="text-xs font-semibold uppercase text-gray-400">Action Items</span>
              {meeting.actionItems.length > 0 && (
                <ul className="mt-1 space-y-1">
                  {meeting.actionItems.map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          const updated = [...meeting.actionItems]
                          updated[i] = { ...updated[i], done: !updated[i].done }
                          updateMeeting(meeting.id, { actionItems: updated })
                        }}
                        className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border-2 transition-colors ${
                          item.done ? 'border-emerald-500 bg-emerald-500 text-white' : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        {item.done && (
                          <svg className="h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </button>
                      <span className={`text-sm ${item.done ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
                        {item.text}
                      </span>
                      {item.assignee && (
                        <span className="rounded bg-gray-100 px-1.5 py-0.5 text-[10px] font-medium text-gray-500">{item.assignee}</span>
                      )}
                    </li>
                  ))}
                </ul>
              )}
              <div className="mt-2 flex gap-2">
                <input
                  value={newAction}
                  onChange={(e) => setNewAction(e.target.value)}
                  className="min-w-0 flex-1 rounded border border-gray-300 px-2 py-1 text-xs"
                  placeholder="Add action item..."
                />
                <select
                  value={newActionAssignee}
                  onChange={(e) => setNewActionAssignee(e.target.value)}
                  className="rounded border border-gray-300 px-1 py-1 text-xs"
                >
                  <option value="">Assignee</option>
                  {team.map((m) => (
                    <option key={m.id} value={m.name}>{m.name}</option>
                  ))}
                </select>
                <button
                  onClick={() => {
                    if (newAction.trim()) {
                      updateMeeting(meeting.id, {
                        actionItems: [...meeting.actionItems, { text: newAction.trim(), assignee: newActionAssignee || undefined, done: false }],
                      })
                      setNewAction('')
                      setNewActionAssignee('')
                    }
                  }}
                  className="rounded bg-gray-200 px-2 py-1 text-xs text-gray-600 hover:bg-gray-300"
                >
                  Add
                </button>
              </div>
            </div>

            {/* Notes */}
            <div>
              <span className="text-xs font-semibold uppercase text-gray-400">Notes</span>
              <textarea
                value={editNotes}
                onChange={(e) => setEditNotes(e.target.value)}
                onBlur={() => { if (editNotes !== meeting.notes) updateMeeting(meeting.id, { notes: editNotes }) }}
                className="mt-1 w-full rounded border border-gray-300 px-2 py-1 text-sm"
                rows={3}
              />
            </div>

            <div className="flex justify-end">
              {confirmDelete ? (
                <div className="flex gap-2">
                  <span className="text-xs text-gray-500">Delete this meeting?</span>
                  <button onClick={() => { deleteMeeting(meeting.id); setConfirmDelete(false) }} className="rounded bg-red-500 px-2 py-0.5 text-xs text-white hover:bg-red-600">
                    Yes
                  </button>
                  <button onClick={() => setConfirmDelete(false)} className="text-xs text-gray-500">Cancel</button>
                </div>
              ) : (
                <button onClick={() => setConfirmDelete(true)} className="text-xs text-gray-400 hover:text-red-500">
                  Delete meeting
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function MeetingsPage() {
  const { meetings, addMeeting, updateMeeting, deleteMeeting } = useMeetingsStore()
  const [showAddForm, setShowAddForm] = useState(false)
  const [typeFilter, setTypeFilter] = useState<string>('all')

  const filtered = useMemo(() => {
    let result = [...meetings]
    if (typeFilter !== 'all') result = result.filter((m) => m.type === typeFilter)
    return result.sort((a, b) => b.date.localeCompare(a.date))
  }, [meetings, typeFilter])

  const upcoming = filtered.filter((m) => isUpcoming(m.date))
  const past = filtered.filter((m) => !isUpcoming(m.date))
  const openActions = meetings.reduce((sum, m) => sum + m.actionItems.filter((a) => !a.done).length, 0)

  return (
    <>
      <PortalPageHeader
        title="Meetings"
        subtitle={`${meetings.length} meetings${openActions > 0 ? ` \u00b7 ${openActions} open action items` : ''}`}
      />

      <PortalSection>
        <div className="mb-6 flex flex-wrap items-center gap-3">
          {showAddForm ? (
            <AddMeetingForm onAdd={(m) => { addMeeting(m); setShowAddForm(false) }} onCancel={() => setShowAddForm(false)} />
          ) : (
            <button
              onClick={() => setShowAddForm(true)}
              className="flex items-center gap-1.5 rounded-lg bg-[var(--color-primary)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--color-primary-dark)] transition-colors"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Add Meeting
            </button>
          )}

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700"
          >
            <option value="all">All Types</option>
            {Object.entries(meetingTypeLabels).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
        </div>

        {/* Upcoming */}
        {upcoming.length > 0 && (
          <div className="mb-6">
            <h2 className="mb-3 text-sm font-semibold text-gray-700">Upcoming ({upcoming.length})</h2>
            <div className="space-y-2">
              {upcoming.map((m) => (
                <MeetingCard key={m.id} meeting={m} updateMeeting={updateMeeting} deleteMeeting={deleteMeeting} />
              ))}
            </div>
          </div>
        )}

        {/* Past */}
        {past.length > 0 && (
          <div>
            <h2 className="mb-3 text-sm font-semibold text-gray-700">Past ({past.length})</h2>
            <div className="space-y-2">
              {past.map((m) => (
                <MeetingCard key={m.id} meeting={m} updateMeeting={updateMeeting} deleteMeeting={deleteMeeting} />
              ))}
            </div>
          </div>
        )}

        {meetings.length === 0 && !showAddForm && (
          <div className="rounded-xl border border-gray-200 bg-white py-16 text-center">
            <svg className="mx-auto h-12 w-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="mt-3 text-sm text-gray-500">No meetings yet. Click &quot;Add Meeting&quot; to get started.</p>
          </div>
        )}

        <p className="mt-4 text-xs text-gray-400">
          Meetings saved to browser
        </p>
      </PortalSection>
    </>
  )
}
