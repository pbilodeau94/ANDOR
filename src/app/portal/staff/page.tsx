'use client'

import { useState, useMemo, useRef, useEffect } from 'react'
import PortalSection from '@/components/portal/PortalSection'
import PortalPageHeader from '@/components/portal/PortalPageHeader'
import { useStaffStore } from '@/data/use-staff-store'
import {
  staffStatusLabels,
  staffStatusColors,
  certificationLabels,
  defaultOnboardingItems,
} from '@/data/staff'
import type { StaffMember, StaffStatus, CertificationType, Certification } from '@/data/staff'

function formatDate(dateStr: string | null): string {
  if (!dateStr) return '\u2014'
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

function isExpiringSoon(dateStr: string | null, days = 90): boolean {
  if (!dateStr) return false
  const target = new Date(dateStr + 'T00:00:00')
  const now = new Date()
  now.setHours(0, 0, 0, 0)
  const diff = (target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
  return diff >= 0 && diff <= days
}

function isExpired(dateStr: string | null): boolean {
  if (!dateStr) return false
  const target = new Date(dateStr + 'T00:00:00')
  const now = new Date()
  now.setHours(0, 0, 0, 0)
  return target < now
}

const certTypes: CertificationType[] = ['citi', 'gcp', 'hipaa', 'irb']

function AddStaffForm({ onAdd, onCancel }: { onAdd: (s: Omit<StaffMember, 'id'>) => void; onCancel: () => void }) {
  const [name, setName] = useState('')
  const [role, setRole] = useState('')
  const [startDate, setStartDate] = useState('')
  const [status, setStatus] = useState<StaffStatus>('onboarding')
  const nameRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (nameRef.current) nameRef.current.focus()
  }, [])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim()) return
    onAdd({
      name: name.trim(),
      role: role.trim(),
      startDate: startDate || new Date().toISOString().slice(0, 10),
      status,
      certifications: certTypes.map((type) => ({ type, completedDate: null, expirationDate: null })),
      onboardingChecklist: defaultOnboardingItems.map((label) => ({ label, done: false })),
    })
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-gray-200 bg-white p-4">
      <h3 className="text-sm font-semibold text-gray-700">Add Staff Member</h3>
      <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2">
          <label className="text-xs font-medium text-gray-500">Name *</label>
          <input ref={nameRef} value={name} onChange={(e) => setName(e.target.value)} className="mt-0.5 w-full rounded border border-gray-300 px-3 py-1.5 text-sm" required />
        </div>
        <div>
          <label className="text-xs font-medium text-gray-500">Role</label>
          <input value={role} onChange={(e) => setRole(e.target.value)} className="mt-0.5 w-full rounded border border-gray-300 px-3 py-1.5 text-sm" placeholder="e.g. CRC, RA" />
        </div>
        <div>
          <label className="text-xs font-medium text-gray-500">Start Date</label>
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="mt-0.5 w-full rounded border border-gray-300 px-3 py-1.5 text-sm" />
        </div>
        <div>
          <label className="text-xs font-medium text-gray-500">Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value as StaffStatus)} className="mt-0.5 w-full rounded border border-gray-300 px-3 py-1.5 text-sm">
            {Object.entries(staffStatusLabels).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="mt-4 flex gap-2">
        <button type="submit" className="rounded-lg bg-[var(--color-primary)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--color-primary-light)]">Add</button>
        <button type="button" onClick={onCancel} className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50">Cancel</button>
      </div>
    </form>
  )
}

function CertBadge({ cert }: { cert: Certification }) {
  const expired = isExpired(cert.expirationDate)
  const expiringSoon = !expired && isExpiringSoon(cert.expirationDate)
  const completed = !!cert.completedDate

  let badgeClass = 'bg-gray-100 text-gray-400'
  if (expired) badgeClass = 'bg-red-100 text-red-700'
  else if (expiringSoon) badgeClass = 'bg-amber-100 text-amber-700'
  else if (completed) badgeClass = 'bg-emerald-100 text-emerald-700'

  return (
    <span className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-medium ${badgeClass}`} title={cert.expirationDate ? `Expires ${formatDate(cert.expirationDate)}` : completed ? 'Completed' : 'Not completed'}>
      {certificationLabels[cert.type]}
      {expired && ' !'}
      {expiringSoon && ' ~'}
    </span>
  )
}

function StaffCard({
  member,
  updateMember,
  deleteMember,
}: {
  member: StaffMember
  updateMember: (id: string, updates: Partial<StaffMember>) => void
  deleteMember: (id: string) => void
}) {
  const [expanded, setExpanded] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)

  const checklistDone = member.onboardingChecklist.filter((i) => i.done).length
  const checklistTotal = member.onboardingChecklist.length
  const progress = checklistTotal > 0 ? Math.round((checklistDone / checklistTotal) * 100) : 0

  return (
    <div className="rounded-xl border border-gray-200 bg-white transition-shadow hover:shadow-sm">
      <div className="flex cursor-pointer items-start gap-3 p-4" onClick={() => setExpanded(!expanded)}>
        <svg className={`mt-0.5 h-4 w-4 shrink-0 text-gray-400 transition-transform ${expanded ? 'rotate-90' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-900">{member.name}</span>
            <span className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-medium ${staffStatusColors[member.status]}`}>
              {staffStatusLabels[member.status]}
            </span>
          </div>
          <div className="mt-1 flex items-center gap-2 text-xs text-gray-400">
            {member.role && <span>{member.role}</span>}
            <span className="text-gray-300">&middot;</span>
            <span>Started {formatDate(member.startDate)}</span>
          </div>
          <div className="mt-1.5 flex flex-wrap gap-1">
            {member.certifications.map((cert) => (
              <CertBadge key={cert.type} cert={cert} />
            ))}
          </div>
        </div>
        {member.status === 'onboarding' && (
          <div className="shrink-0 text-right">
            <div className="text-xs font-medium text-gray-500">{progress}%</div>
            <div className="mt-0.5 h-1.5 w-16 rounded-full bg-gray-100">
              <div className="h-full rounded-full bg-[var(--color-primary)] transition-all" style={{ width: `${progress}%` }} />
            </div>
          </div>
        )}
      </div>

      {expanded && (
        <div className="border-t border-gray-100 bg-gray-50 px-4 py-3" onClick={(e) => e.stopPropagation()}>
          <div className="grid gap-4 sm:grid-cols-2">
            {/* Certifications */}
            <div className="sm:col-span-2">
              <span className="text-xs font-semibold uppercase text-gray-400">Certifications</span>
              <div className="mt-2 overflow-x-auto rounded-lg border border-gray-200">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="py-2 pl-3 pr-2 text-left text-xs font-medium text-gray-500">Cert</th>
                      <th className="py-2 px-2 text-left text-xs font-medium text-gray-500">Completed</th>
                      <th className="py-2 px-2 text-left text-xs font-medium text-gray-500">Expires</th>
                    </tr>
                  </thead>
                  <tbody>
                    {member.certifications.map((cert, i) => (
                      <tr key={cert.type} className="border-t border-gray-100">
                        <td className="py-2 pl-3 pr-2 text-xs font-medium text-gray-700">{certificationLabels[cert.type]}</td>
                        <td className="py-2 px-2">
                          <input
                            type="date"
                            value={cert.completedDate ?? ''}
                            onChange={(e) => {
                              const updated = [...member.certifications]
                              updated[i] = { ...updated[i], completedDate: e.target.value || null }
                              updateMember(member.id, { certifications: updated })
                            }}
                            className="w-36 rounded border border-gray-300 px-2 py-1 text-xs"
                          />
                        </td>
                        <td className="py-2 px-2">
                          <input
                            type="date"
                            value={cert.expirationDate ?? ''}
                            onChange={(e) => {
                              const updated = [...member.certifications]
                              updated[i] = { ...updated[i], expirationDate: e.target.value || null }
                              updateMember(member.id, { certifications: updated })
                            }}
                            className="w-36 rounded border border-gray-300 px-2 py-1 text-xs"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Onboarding Checklist */}
            <div className="sm:col-span-2">
              <span className="text-xs font-semibold uppercase text-gray-400">
                Onboarding Checklist ({checklistDone}/{checklistTotal})
              </span>
              <div className="mt-2 space-y-1">
                {member.onboardingChecklist.map((item, i) => (
                  <label key={i} className="flex cursor-pointer items-center gap-2 rounded px-2 py-1 hover:bg-gray-100">
                    <input
                      type="checkbox"
                      checked={item.done}
                      onChange={() => {
                        const updated = [...member.onboardingChecklist]
                        updated[i] = { ...updated[i], done: !updated[i].done }
                        updateMember(member.id, { onboardingChecklist: updated })
                      }}
                      className="rounded border-gray-300"
                    />
                    <span className={`text-sm ${item.done ? 'text-gray-400 line-through' : 'text-gray-700'}`}>{item.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Status */}
            <div>
              <label className="text-xs font-medium text-gray-500">Status</label>
              <select
                value={member.status}
                onChange={(e) => updateMember(member.id, { status: e.target.value as StaffStatus })}
                className="mt-0.5 w-full rounded border border-gray-300 px-2 py-1 text-sm"
              >
                {Object.entries(staffStatusLabels).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500">Role</label>
              <input
                value={member.role}
                onChange={(e) => updateMember(member.id, { role: e.target.value })}
                className="mt-0.5 w-full rounded border border-gray-300 px-2 py-1 text-sm"
              />
            </div>
          </div>

          <div className="mt-3 flex justify-end">
            {confirmDelete ? (
              <div className="flex gap-2">
                <span className="text-xs text-gray-500">Remove?</span>
                <button onClick={() => { deleteMember(member.id); setConfirmDelete(false) }} className="rounded bg-red-500 px-2 py-0.5 text-xs text-white hover:bg-red-600">Yes</button>
                <button onClick={() => setConfirmDelete(false)} className="text-xs text-gray-500">Cancel</button>
              </div>
            ) : (
              <button onClick={() => setConfirmDelete(true)} className="text-xs text-gray-400 hover:text-red-500">Remove</button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default function StaffPage() {
  const { staff, addStaffMember, updateStaffMember, deleteStaffMember } = useStaffStore()
  const [showAddForm, setShowAddForm] = useState(false)
  const [statusFilter, setStatusFilter] = useState<string>('all')

  const filtered = useMemo(() => {
    let result = [...staff]
    if (statusFilter !== 'all') result = result.filter((s) => s.status === statusFilter)
    return result
  }, [staff, statusFilter])

  // Expiring/expired certs alert
  const certAlerts = useMemo(() => {
    const alerts: { member: string; cert: string; date: string; isExpired: boolean }[] = []
    staff.forEach((m) => {
      if (m.status === 'offboarded') return
      m.certifications.forEach((c) => {
        if (isExpired(c.expirationDate)) {
          alerts.push({ member: m.name, cert: certificationLabels[c.type], date: c.expirationDate!, isExpired: true })
        } else if (isExpiringSoon(c.expirationDate)) {
          alerts.push({ member: m.name, cert: certificationLabels[c.type], date: c.expirationDate!, isExpired: false })
        }
      })
    })
    return alerts
  }, [staff])

  const activeCount = staff.filter((s) => s.status === 'active').length
  const onboardingCount = staff.filter((s) => s.status === 'onboarding').length

  return (
    <>
      <PortalPageHeader
        title="Staff & Onboarding"
        subtitle={`${staff.length} team members${activeCount > 0 ? ` \u00b7 ${activeCount} active` : ''}${onboardingCount > 0 ? ` \u00b7 ${onboardingCount} onboarding` : ''}`}
      />

      {/* Cert Alerts */}
      {certAlerts.length > 0 && (
        <PortalSection>
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
            <h3 className="flex items-center gap-2 text-sm font-semibold text-amber-800">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              Certification Alerts ({certAlerts.length})
            </h3>
            <div className="mt-2 space-y-1">
              {certAlerts.map((a, i) => (
                <div key={i} className={`flex items-center gap-2 rounded px-2 py-1 text-xs ${a.isExpired ? 'bg-red-50 text-red-700' : 'bg-amber-50 text-amber-700'}`}>
                  <span className="font-semibold">{a.isExpired ? 'EXPIRED' : 'EXPIRING'}</span>
                  <span>{a.member} &mdash; {a.cert} ({formatDate(a.date)})</span>
                </div>
              ))}
            </div>
          </div>
        </PortalSection>
      )}

      <PortalSection>
        <div className="mb-6 flex flex-wrap items-center gap-3">
          {showAddForm ? (
            <AddStaffForm onAdd={(s) => { addStaffMember(s); setShowAddForm(false) }} onCancel={() => setShowAddForm(false)} />
          ) : (
            <button
              onClick={() => setShowAddForm(true)}
              className="flex items-center gap-1.5 rounded-lg bg-[var(--color-primary)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--color-primary-dark)] transition-colors"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Add Staff Member
            </button>
          )}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700"
          >
            <option value="all">All Statuses</option>
            {Object.entries(staffStatusLabels).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
        </div>

        {filtered.length === 0 && !showAddForm ? (
          <div className="rounded-xl border border-gray-200 bg-white py-16 text-center">
            <svg className="mx-auto h-12 w-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <p className="mt-3 text-sm text-gray-500">No staff members yet. Click &quot;Add Staff Member&quot; to get started.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {filtered.map((m) => (
              <StaffCard key={m.id} member={m} updateMember={updateStaffMember} deleteMember={deleteStaffMember} />
            ))}
          </div>
        )}

        <p className="mt-4 text-xs text-gray-400">
          Staff data saved to browser
        </p>
      </PortalSection>
    </>
  )
}
