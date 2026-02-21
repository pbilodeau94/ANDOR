export type StaffStatus = 'active' | 'onboarding' | 'offboarded'

export type CertificationType = 'citi' | 'gcp' | 'hipaa' | 'irb'

export type Certification = {
  type: CertificationType
  completedDate: string | null
  expirationDate: string | null
}

export type OnboardingItem = {
  label: string
  done: boolean
}

export type StaffMember = {
  id: string
  name: string
  role: string
  startDate: string
  status: StaffStatus
  certifications: Certification[]
  onboardingChecklist: OnboardingItem[]
}

export const staffStatusLabels: Record<StaffStatus, string> = {
  active: 'Active',
  onboarding: 'Onboarding',
  offboarded: 'Offboarded',
}

export const staffStatusColors: Record<StaffStatus, string> = {
  active: 'bg-emerald-100 text-emerald-700',
  onboarding: 'bg-blue-100 text-blue-700',
  offboarded: 'bg-gray-100 text-gray-600',
}

export const certificationLabels: Record<CertificationType, string> = {
  citi: 'CITI',
  gcp: 'GCP',
  hipaa: 'HIPAA',
  irb: 'IRB',
}

export const defaultOnboardingItems: string[] = [
  'Badge & building access',
  'Epic / EMR access',
  'REDCap access',
  'CITI training',
  'GCP training',
  'HIPAA training',
  'IRB added to protocols',
  'Dropbox access',
  'Team introduction',
]
