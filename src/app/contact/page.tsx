'use client'

import { useState } from 'react'
import PageHero from '@/components/PageHero'
import EditorialSection from '@/components/EditorialSection'

type FormState = 'idle' | 'sending' | 'sent' | 'error'

export default function ContactPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [formState, setFormState] = useState<FormState>('idle')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setFormState('sending')

    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      role ? `Role: ${role}` : '',
      '',
      message,
    ].filter(Boolean).join('\n')

    const mailtoUrl = `mailto:andor-research@mgb.org?subject=${encodeURIComponent(subject || 'ANDOR Website Inquiry')}&body=${encodeURIComponent(body)}`

    window.open(mailtoUrl, '_blank')
    setFormState('sent')
  }

  function resetForm() {
    setName('')
    setEmail('')
    setRole('')
    setSubject('')
    setMessage('')
    setFormState('idle')
  }

  const inputClass =
    'mt-1 w-full rounded border border-[var(--color-rule)] bg-[var(--color-surface)] px-4 py-2.5 text-sm transition-colors focus:border-[var(--color-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]'

  return (
    <>
      <PageHero
        variant="light"
        overline="Get in Touch"
        title="Contact Us"
        description="We welcome inquiries from patients, physicians, researchers, and potential collaborators interested in our work."
      />

      <EditorialSection rule={false}>
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-16 lg:grid-cols-5">
            {/* Form */}
            <div className="lg:col-span-3">
              {formState === 'sent' ? (
                <div className="rounded border border-emerald-200 bg-emerald-50 p-8 text-center">
                  <svg className="mx-auto h-12 w-12 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="mt-4 text-lg font-semibold text-emerald-800">Message Ready</h3>
                  <p className="mt-2 text-sm text-emerald-700">
                    Your email client should have opened with your message. If it didn&apos;t, you can reach us directly at the email below.
                  </p>
                  <button
                    onClick={resetForm}
                    className="mt-4 text-sm font-medium text-emerald-700 hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="text-sm font-medium text-[#1a1614]">
                        Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className={inputClass}
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="text-sm font-medium text-[#1a1614]">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className={inputClass}
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="role" className="text-sm font-medium text-[#1a1614]">
                      I am a...
                    </label>
                    <select
                      id="role"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className={inputClass}
                    >
                      <option value="">Select...</option>
                      <option value="patient">Patient or Caregiver</option>
                      <option value="physician">Referring Physician</option>
                      <option value="researcher">Researcher / Collaborator</option>
                      <option value="donor">Potential Donor</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="subject" className="text-sm font-medium text-[#1a1614]">
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="subject"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      required
                      className={inputClass}
                    >
                      <option value="">Select a topic...</option>
                      <option value="Clinical Trial Inquiry">Clinical Trial Inquiry</option>
                      <option value="Patient Referral">Patient Referral</option>
                      <option value="Research Collaboration">Research Collaboration</option>
                      <option value="Philanthropy / Giving">Philanthropy / Giving</option>
                      <option value="General Inquiry">General Inquiry</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="text-sm font-medium text-[#1a1614]">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                      rows={5}
                      className={inputClass}
                      placeholder="How can we help?"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={formState === 'sending'}
                    className="w-full rounded bg-[var(--color-primary)] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-primary-light)] disabled:opacity-50 sm:w-auto"
                  >
                    {formState === 'sending' ? 'Opening email...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>

            {/* Contact Info Sidebar */}
            <div className="lg:col-span-2">
              <div className="border-t border-[var(--color-rule)] pt-6">
                <p className="overline">Contact Information</p>

                <div className="mt-6 space-y-5">
                  <div className="flex items-start gap-3">
                    <svg className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 7.5h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
                    </svg>
                    <div>
                      <p className="text-sm font-medium text-[#1a1614]">Department of Neurology</p>
                      <p className="text-sm text-[var(--color-ink-secondary)]">Division of Neuroimmunology</p>
                      <p className="text-sm text-[var(--color-ink-secondary)]">Massachusetts General Hospital</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <svg className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                    <div>
                      <p className="text-sm font-medium text-[#1a1614]">Email</p>
                      <a
                        href="mailto:andor-research@mgb.org"
                        className="text-sm text-[var(--color-accent)] hover:underline"
                      >
                        andor-research@mgb.org
                      </a>
                    </div>
                  </div>
                </div>

                <hr className="my-6 border-[var(--color-rule)]" />

                <div>
                  <h4 className="text-sm font-medium text-[#1a1614]">Clinical Trial Enrollment</h4>
                  <p className="mt-1 text-sm text-[var(--color-ink-secondary)]">
                    For questions about eligibility or enrollment in our clinical trials, please select &quot;Clinical Trial Inquiry&quot; in the form.
                  </p>
                </div>

                <div className="mt-4">
                  <h4 className="text-sm font-medium text-[#1a1614]">Philanthropy</h4>
                  <p className="mt-1 text-sm text-[var(--color-ink-secondary)]">
                    To discuss philanthropic support, please reference &quot;ANDOR Research Group&quot; in your inquiry.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </EditorialSection>
    </>
  )
}
