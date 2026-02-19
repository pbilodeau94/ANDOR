export type DocumentType = 'biosketch' | 'budget' | 'letter_of_support' | 'specific_aims' | 'other'

export type ResearchDocument = {
  id: string
  name: string
  type: DocumentType
  investigator: string
  grantId?: string
  url: string
  lastUpdated: string
}

export const documents: ResearchDocument[] = [
  {
    id: 'd1',
    name: 'NIH Biosketch - Michael Levy',
    type: 'biosketch',
    investigator: 'Michael Levy',
    url: '',
    lastUpdated: '2025-01-15',
  },
  {
    id: 'd2',
    name: 'NIH Biosketch - Shamik Bhattacharyya',
    type: 'biosketch',
    investigator: 'Shamik Bhattacharyya',
    url: '',
    lastUpdated: '2025-01-10',
  },
  {
    id: 'd3',
    name: 'NIH Biosketch - Jimmy Nguyen',
    type: 'biosketch',
    investigator: 'Jimmy Nguyen',
    url: '',
    lastUpdated: '2025-02-01',
  },
  {
    id: 'd4',
    name: 'NIH Biosketch - Takahisa Mikami',
    type: 'biosketch',
    investigator: 'Takahisa Mikami',
    url: '',
    lastUpdated: '2025-01-20',
  },
  {
    id: 'd5',
    name: 'NIH Biosketch - Monique Anderson',
    type: 'biosketch',
    investigator: 'Monique Anderson',
    url: '',
    lastUpdated: '2025-01-18',
  },
  {
    id: 'd6',
    name: 'Other Support - Michael Levy',
    type: 'other',
    investigator: 'Michael Levy',
    url: '',
    lastUpdated: '2025-02-01',
  },
  {
    id: 'd7',
    name: 'Other Support - Shamik Bhattacharyya',
    type: 'other',
    investigator: 'Shamik Bhattacharyya',
    url: '',
    lastUpdated: '2025-01-15',
  },
  {
    id: 'd8',
    name: 'Budget Justification - K99 γδ T Cells',
    type: 'budget',
    investigator: 'Phil Bilodeau',
    grantId: 'g3',
    url: '',
    lastUpdated: '2026-01-20',
  },
  {
    id: 'd9',
    name: 'Specific Aims - K99 γδ T Cells',
    type: 'specific_aims',
    investigator: 'Phil Bilodeau',
    grantId: 'g3',
    url: '',
    lastUpdated: '2026-01-15',
  },
  {
    id: 'd10',
    name: 'Letter of Support - MGH Neuroimmunology',
    type: 'letter_of_support',
    investigator: 'Michael Levy',
    grantId: 'g3',
    url: '',
    lastUpdated: '2026-01-10',
  },
  {
    id: 'd11',
    name: 'Specific Aims - MOGAD Biomarkers R01',
    type: 'specific_aims',
    investigator: 'Michael Levy',
    grantId: 'g5',
    url: '',
    lastUpdated: '2026-01-25',
  },
  {
    id: 'd12',
    name: 'Budget Justification - NMOSD R01',
    type: 'budget',
    investigator: 'Michael Levy',
    grantId: 'g4',
    url: '',
    lastUpdated: '2026-01-20',
  },
]

export const documentTypeLabels: Record<DocumentType, string> = {
  biosketch: 'Biosketch',
  budget: 'Budget',
  letter_of_support: 'Letter of Support',
  specific_aims: 'Specific Aims',
  other: 'Other',
}

export const documentTypeColors: Record<DocumentType, string> = {
  biosketch: 'bg-blue-100 text-blue-700',
  budget: 'bg-emerald-100 text-emerald-700',
  letter_of_support: 'bg-purple-100 text-purple-700',
  specific_aims: 'bg-amber-100 text-amber-700',
  other: 'bg-gray-100 text-gray-700',
}
