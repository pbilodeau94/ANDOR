export type GrantStatus = 'not_started' | 'in_progress' | 'submitted' | 'funded' | 'completed' | 'not_funded'

export type GrantDocumentType = 'biosketch' | 'budget' | 'letter_of_support' | 'specific_aims' | 'other'

export type GrantDocument = {
  name: string
  type: GrantDocumentType
  url: string
  investigator?: string
}

export type IdcCategory = 'not_allowed' | 'none' | 'inclusive' | 'in_addition'

export type GrantType = 'federal' | 'foundation' | 'industry'

export type Grant = {
  id: string
  title: string
  pi: string[]
  lead: string
  agency: string
  mechanism: string
  grantType: GrantType
  directCosts: number | null
  idcCategory: IdcCategory
  idcRate: number
  duration: string | null
  deadline: string | null
  adminDeadline: string | null
  scienceDeadline: string | null
  startDate: string | null
  status: GrantStatus
  diseases: string[]
  notes?: string
  keyPersonnel: string[]
  rfaUrl: string | null
  rfaPdfUrl: string | null
  documents: GrantDocument[]
}

export function computeIdc(grant: Grant): number {
  if (!grant.directCosts) return 0
  if (grant.idcCategory === 'not_allowed' || grant.idcCategory === 'none') return 0
  return grant.directCosts * (grant.idcRate / 100)
}

export function computeTotal(grant: Grant): number {
  return (grant.directCosts ?? 0) + computeIdc(grant)
}

export const idcCategoryLabels: Record<IdcCategory, string> = {
  not_allowed: 'Not Allowed',
  none: 'None',
  inclusive: 'Inclusive',
  in_addition: 'In Addition',
}

export const grantTypeLabels: Record<GrantType, string> = {
  federal: 'Federal',
  foundation: 'Foundation',
  industry: 'Industry',
}

export const grantTypeColors: Record<GrantType, string> = {
  federal: 'bg-blue-100 text-blue-700',
  foundation: 'bg-violet-100 text-violet-700',
  industry: 'bg-teal-100 text-teal-700',
}

export const grants: Grant[] = [
  { id: 'g1', title: 'AAN Temporal and Functional Role of γδ T Cells in Central Nervous System Autoimmunity', pi: ['Phil Bilodeau'], lead: 'Phil Bilodeau', agency: 'AAN', mechanism: 'Career Development Award', grantType: 'foundation', directCosts: 450000, idcCategory: 'none', idcRate: 0, duration: '3 years', deadline: '2025-09-09', adminDeadline: null, scienceDeadline: null, startDate: '2026-07-01', status: 'submitted', diseases: ['MOGAD', 'MS'], keyPersonnel: ['Phil Bilodeau', 'Michael Levy'], rfaUrl: null, rfaPdfUrl: null, documents: [] },
  { id: 'g2', title: 'Biorepository in rare neuroimmune disorders', pi: [], lead: '', agency: 'NIAID', mechanism: 'Resource Related Projects', grantType: 'federal', directCosts: 499000, idcCategory: 'in_addition', idcRate: 40, duration: '5 years', deadline: '2025-09-25', adminDeadline: null, scienceDeadline: null, startDate: null, status: 'not_started', diseases: ['MOGAD', 'NMOSD', 'Neurosarcoidosis'], keyPersonnel: ['Michael Levy', 'Shamik Bhattacharyya'], rfaUrl: null, rfaPdfUrl: null, documents: [] },
  { id: 'g3', title: 'K99 Temporal and Functional Role of γδ T Cells in Central Nervous System Autoimmunity', pi: ['Phil Bilodeau'], lead: 'Phil Bilodeau', agency: 'NIH', mechanism: 'K99/R00', grantType: 'federal', directCosts: 1037000, idcCategory: 'none', idcRate: 0, duration: '5 years', deadline: '2025-10-12', adminDeadline: null, scienceDeadline: null, startDate: '2026-01-01', status: 'not_started', diseases: ['MOGAD', 'MS'], keyPersonnel: ['Phil Bilodeau', 'Michael Levy'], rfaUrl: null, rfaPdfUrl: null, documents: [] },
  { id: 'g4', title: 'Animal models of NMOSD', pi: ['Michael Levy'], lead: 'Michael Levy', agency: 'NIH', mechanism: 'R01', grantType: 'federal', directCosts: 499000, idcCategory: 'in_addition', idcRate: 40, duration: '5 years', deadline: '2025-10-12', adminDeadline: null, scienceDeadline: null, startDate: null, status: 'not_started', diseases: ['NMOSD'], keyPersonnel: ['Michael Levy'], rfaUrl: null, rfaPdfUrl: null, documents: [] },
  { id: 'g5', title: 'MOGAD serum and CSF biomarkers', pi: ['Michael Levy'], lead: 'Michael Levy', agency: 'NIH', mechanism: 'R01', grantType: 'federal', directCosts: 499000, idcCategory: 'in_addition', idcRate: 40, duration: '5 years', deadline: '2025-10-12', adminDeadline: null, scienceDeadline: null, startDate: null, status: 'not_started', diseases: ['MOGAD'], keyPersonnel: ['Michael Levy', 'Takahisa Mikami'], rfaUrl: null, rfaPdfUrl: null, documents: [] },
  { id: 'g6', title: 'γδ T cell depletion in MOGAD', pi: [], lead: '', agency: 'NIH', mechanism: 'Preclinical Proof of Concept Studies for Rare Diseases', grantType: 'federal', directCosts: 275000, idcCategory: 'in_addition', idcRate: 40, duration: '2 years', deadline: '2026-06-02', adminDeadline: null, scienceDeadline: null, startDate: null, status: 'not_started', diseases: ['MOGAD'], keyPersonnel: ['Michael Levy'], rfaUrl: null, rfaPdfUrl: null, documents: [] },
  { id: 'g7', title: 'Determinants of Age-Dependent Tropism in MOG Antibody\u2013Associated Disease', pi: [], lead: '', agency: 'NIAID', mechanism: 'R01', grantType: 'federal', directCosts: 453750, idcCategory: 'none', idcRate: 0, duration: null, deadline: '2025-02-05', adminDeadline: null, scienceDeadline: null, startDate: '2026-05-01', status: 'not_started', diseases: ['MS'], keyPersonnel: ['Michael Levy'], rfaUrl: null, rfaPdfUrl: null, documents: [] },
  { id: 'g8', title: 'Deep phenotyping of DR15-restricted CD4+ T cells specific for Epstein-Barr virus epitopes in the spinal fluid and blood of people with multiple sclerosis', pi: [], lead: '', agency: 'NIAID', mechanism: 'R21', grantType: 'federal', directCosts: 275000, idcCategory: 'in_addition', idcRate: 40, duration: null, deadline: '2025-07-16', adminDeadline: null, scienceDeadline: null, startDate: null, status: 'not_started', diseases: [], keyPersonnel: [], rfaUrl: null, rfaPdfUrl: null, documents: [] },
  { id: 'g9', title: 'PROTECT-MOG: Pragmatic Randomized Evaluation of Continuing Therapy for MOGAD', pi: ['Michael Levy'], lead: '', agency: 'PCORI', mechanism: 'Clinical Trial', grantType: 'foundation', directCosts: 138894, idcCategory: 'none', idcRate: 0, duration: '5 years', deadline: '2025-12-22', adminDeadline: null, scienceDeadline: null, startDate: '2026-09-01', status: 'not_started', diseases: ['MOGAD'], keyPersonnel: ['Michael Levy', 'Shamik Bhattacharyya'], rfaUrl: null, rfaPdfUrl: null, documents: [] },
  { id: 'g10', title: 'AAN Clinical Research Training Scholarship', pi: ['Jimmy Nguyen'], lead: 'Jimmy Nguyen', agency: 'AAN', mechanism: 'Training', grantType: 'foundation', directCosts: null, idcCategory: 'none', idcRate: 0, duration: null, deadline: null, adminDeadline: null, scienceDeadline: null, startDate: null, status: 'not_started', diseases: [], keyPersonnel: ['Jimmy Nguyen', 'Michael Levy'], rfaUrl: null, rfaPdfUrl: null, documents: [] },
  { id: 'g11', title: 'AAN/Alzheimer\'s Association Training Scholarship', pi: ['Jimmy Nguyen'], lead: 'Jimmy Nguyen', agency: 'AAN', mechanism: 'Training', grantType: 'foundation', directCosts: null, idcCategory: 'none', idcRate: 0, duration: null, deadline: null, adminDeadline: null, scienceDeadline: null, startDate: null, status: 'not_started', diseases: [], keyPersonnel: ['Jimmy Nguyen', 'Michael Levy'], rfaUrl: null, rfaPdfUrl: null, documents: [] },
  { id: 'g12', title: 'NIH UE5 (renewal)', pi: ['Jimmy Nguyen'], lead: 'Jimmy Nguyen', agency: 'NIH', mechanism: 'Training', grantType: 'federal', directCosts: null, idcCategory: 'none', idcRate: 0, duration: null, deadline: null, adminDeadline: null, scienceDeadline: null, startDate: null, status: 'not_started', diseases: [], keyPersonnel: ['Jimmy Nguyen'], rfaUrl: null, rfaPdfUrl: null, documents: [] },
  { id: 'g13', title: 'AHA Innovative Project Award (LOI)', pi: ['Jimmy Nguyen'], lead: 'Jimmy Nguyen', agency: 'American Heart Association', mechanism: '', grantType: 'foundation', directCosts: 200000, idcCategory: 'none', idcRate: 0, duration: null, deadline: '2026-01-27', adminDeadline: null, scienceDeadline: null, startDate: null, status: 'not_started', diseases: [], keyPersonnel: ['Jimmy Nguyen', 'Michael Levy'], rfaUrl: null, rfaPdfUrl: null, documents: [] },
  { id: 'g14', title: 'AAN Sacco Brain Health Fellowship', pi: ['Jimmy Nguyen'], lead: 'Jimmy Nguyen', agency: 'AAN', mechanism: '', grantType: 'foundation', directCosts: null, idcCategory: 'none', idcRate: 0, duration: null, deadline: '2026-01-29', adminDeadline: null, scienceDeadline: null, startDate: null, status: 'not_started', diseases: [], keyPersonnel: ['Jimmy Nguyen'], rfaUrl: null, rfaPdfUrl: null, documents: [] },
  { id: 'g15', title: 'NIH K23 Training Grant', pi: ['Jimmy Nguyen'], lead: 'Jimmy Nguyen', agency: 'NIH', mechanism: 'K23', grantType: 'federal', directCosts: null, idcCategory: 'none', idcRate: 0, duration: null, deadline: '2026-02-12', adminDeadline: null, scienceDeadline: null, startDate: null, status: 'not_started', diseases: [], keyPersonnel: ['Jimmy Nguyen', 'Michael Levy', 'Shamik Bhattacharyya'], rfaUrl: null, rfaPdfUrl: null, documents: [] },
  { id: 'g16', title: 'NIH R01', pi: ['Jimmy Nguyen'], lead: 'Jimmy Nguyen', agency: 'NIH', mechanism: 'R01', grantType: 'federal', directCosts: null, idcCategory: 'none', idcRate: 0, duration: null, deadline: '2026-01-12', adminDeadline: null, scienceDeadline: null, startDate: null, status: 'not_started', diseases: [], keyPersonnel: ['Jimmy Nguyen', 'Michael Levy'], rfaUrl: null, rfaPdfUrl: null, documents: [] },
  { id: 'g17', title: 'FSR Sarcoidosis Pilot', pi: ['Phil Bilodeau'], lead: 'Phil Bilodeau', agency: 'FSR', mechanism: 'Pilot', grantType: 'foundation', directCosts: 100000, idcCategory: 'not_allowed', idcRate: 0, duration: null, deadline: null, adminDeadline: null, scienceDeadline: null, startDate: null, status: 'not_started', diseases: ['Sarcoidosis'], keyPersonnel: ['Phil Bilodeau'], rfaUrl: null, rfaPdfUrl: null, documents: [] },
  { id: 'g18', title: 'PVA Inflammatory Myelopathy', pi: ['Phil Bilodeau'], lead: 'Phil Bilodeau', agency: 'PVA', mechanism: '', grantType: 'foundation', directCosts: 200000, idcCategory: 'not_allowed', idcRate: 0, duration: null, deadline: null, adminDeadline: null, scienceDeadline: null, startDate: null, status: 'not_started', diseases: ['Inflammatory myelopathy'], keyPersonnel: ['Phil Bilodeau'], rfaUrl: null, rfaPdfUrl: null, documents: [] },
  { id: 'g19', title: 'SPARK AD', pi: ['Michael Levy'], lead: 'Michael Levy', agency: 'SPARK', mechanism: '', grantType: 'foundation', directCosts: 333333, idcCategory: 'inclusive', idcRate: 20, duration: null, deadline: null, adminDeadline: null, scienceDeadline: null, startDate: null, status: 'submitted', diseases: ['AD'], keyPersonnel: ['Michael Levy'], rfaUrl: null, rfaPdfUrl: null, documents: [] },
  { id: 'g20', title: 'ABF Viral Triggers', pi: ['Michael Levy'], lead: 'Michael Levy', agency: 'ABF', mechanism: '', grantType: 'foundation', directCosts: 1739130, idcCategory: 'inclusive', idcRate: 15, duration: null, deadline: null, adminDeadline: null, scienceDeadline: null, startDate: null, status: 'not_started', diseases: ['MS', 'AD', 'ALS'], keyPersonnel: ['Michael Levy'], rfaUrl: null, rfaPdfUrl: null, documents: [] },
  { id: 'g21', title: 'OAR Folate Receptor ASD', pi: ['Michael Levy'], lead: 'Michael Levy', agency: 'OAR', mechanism: '', grantType: 'foundation', directCosts: 50000, idcCategory: 'not_allowed', idcRate: 0, duration: null, deadline: null, adminDeadline: null, scienceDeadline: null, startDate: null, status: 'submitted', diseases: ['ASD'], keyPersonnel: ['Michael Levy'], rfaUrl: null, rfaPdfUrl: null, documents: [] },
  { id: 'g22', title: 'NIH PMDA Folate Receptor', pi: ['Michael Levy'], lead: 'Michael Levy', agency: 'NIH', mechanism: 'PMDA', grantType: 'federal', directCosts: null, idcCategory: 'inclusive', idcRate: 0, duration: null, deadline: null, adminDeadline: null, scienceDeadline: null, startDate: null, status: 'submitted', diseases: ['ASD'], keyPersonnel: ['Michael Levy'], rfaUrl: null, rfaPdfUrl: null, documents: [] },
  { id: 'g23', title: 'BBRF Folate Receptor', pi: ['Michael Levy'], lead: 'Michael Levy', agency: 'BBRF', mechanism: '', grantType: 'foundation', directCosts: null, idcCategory: 'not_allowed', idcRate: 0, duration: null, deadline: null, adminDeadline: null, scienceDeadline: null, startDate: null, status: 'submitted', diseases: ['OCD', 'Schizophrenia', 'ASD'], keyPersonnel: ['Michael Levy'], rfaUrl: null, rfaPdfUrl: null, documents: [] },
  { id: 'g24', title: 'NK T Cells NMOSD R01', pi: ['Phil Bilodeau'], lead: 'Phil Bilodeau', agency: 'NIH', mechanism: 'R01', grantType: 'federal', directCosts: 499000, idcCategory: 'in_addition', idcRate: 40, duration: null, deadline: null, adminDeadline: null, scienceDeadline: null, startDate: null, status: 'submitted', diseases: ['NMOSD'], keyPersonnel: ['Phil Bilodeau'], rfaUrl: null, rfaPdfUrl: null, documents: [] },
  { id: 'g25', title: 'Role of BTN/γδ T cells R01', pi: ['Michael Levy'], lead: 'Michael Levy', agency: 'NIH', mechanism: 'R01', grantType: 'federal', directCosts: 499000, idcCategory: 'in_addition', idcRate: 40, duration: null, deadline: null, adminDeadline: null, scienceDeadline: null, startDate: null, status: 'submitted', diseases: ['MOGAD'], keyPersonnel: ['Michael Levy'], rfaUrl: null, rfaPdfUrl: null, documents: [] },
  { id: 'g26', title: 'Clinical Trial Superficial Siderosis', pi: ['Michael Levy'], lead: 'Michael Levy', agency: 'NIH', mechanism: 'Clinical Trial', grantType: 'federal', directCosts: 499000, idcCategory: 'in_addition', idcRate: 40, duration: null, deadline: null, adminDeadline: null, scienceDeadline: null, startDate: null, status: 'not_started', diseases: ['Superficial siderosis'], keyPersonnel: ['Michael Levy'], rfaUrl: null, rfaPdfUrl: null, documents: [] },
  { id: 'g27', title: 'B Cell Responses MOGAD (UCB)', pi: ['Michael Levy'], lead: 'Michael Levy', agency: 'UCB', mechanism: '', grantType: 'industry', directCosts: 350000, idcCategory: 'in_addition', idcRate: 35, duration: null, deadline: null, adminDeadline: null, scienceDeadline: null, startDate: null, status: 'not_started', diseases: ['MOGAD', 'MS'], keyPersonnel: ['Michael Levy'], rfaUrl: null, rfaPdfUrl: null, documents: [] },
  { id: 'g28', title: 'CD4 T Cell EBV Briumvi (TG Therapeutics)', pi: [], lead: '', agency: 'TG Therapeutics', mechanism: '', grantType: 'industry', directCosts: 71429, idcCategory: 'inclusive', idcRate: 40, duration: null, deadline: null, adminDeadline: null, scienceDeadline: null, startDate: null, status: 'submitted', diseases: ['MS'], keyPersonnel: [], rfaUrl: null, rfaPdfUrl: null, documents: [] },
  { id: 'g29', title: 'Genentech Ocrevus', pi: [], lead: '', agency: 'Genentech', mechanism: '', grantType: 'industry', directCosts: 290000, idcCategory: 'in_addition', idcRate: 40, duration: null, deadline: null, adminDeadline: null, scienceDeadline: null, startDate: null, status: 'not_started', diseases: ['MS'], keyPersonnel: [], rfaUrl: null, rfaPdfUrl: null, documents: [] },
  { id: 'g30', title: 'mTOR Trial Neurosarcoidosis', pi: [], lead: '', agency: '', mechanism: 'Clinical Trial', grantType: 'foundation', directCosts: null, idcCategory: 'none', idcRate: 0, duration: null, deadline: null, adminDeadline: null, scienceDeadline: null, startDate: null, status: 'not_started', diseases: ['Sarcoidosis'], keyPersonnel: [], rfaUrl: null, rfaPdfUrl: null, documents: [] },
]

export const grantStatusLabels: Record<GrantStatus, string> = {
  not_started: 'Not Started',
  in_progress: 'In Progress',
  submitted: 'Submitted',
  funded: 'Funded',
  completed: 'Completed',
  not_funded: 'Not Funded',
}

export const grantStatusColors: Record<GrantStatus, string> = {
  not_started: 'bg-gray-100 text-gray-700',
  in_progress: 'bg-blue-100 text-blue-700',
  submitted: 'bg-amber-100 text-amber-700',
  funded: 'bg-emerald-100 text-emerald-700',
  completed: 'bg-purple-100 text-purple-700',
  not_funded: 'bg-red-50 text-red-700',
}
