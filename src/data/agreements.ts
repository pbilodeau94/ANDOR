export type AgreementType = 'DUA' | 'MTA' | 'Low risk DUA'
export type AgreementDirection = 'incoming' | 'outgoing' | 'bidirectional'
export type AgreementStatus = 'in_review' | 'fully_executed' | 'expired'

export type Agreement = {
  id: string
  title: string
  partner: string
  type: AgreementType
  direction: AgreementDirection
  status: AgreementStatus
  expirationDate: string | null
  diseases: string[]
  dataShared: string
  samplesShared: string
}

export const agreements: Agreement[] = [
  {
    id: 'a1',
    title: 'Defining the clinical, serological and radiological characteristics of autoimmune neurological and endocrine disorders and their response to therapies',
    partner: 'Mayo Clinic',
    type: 'DUA',
    direction: 'incoming',
    status: 'fully_executed',
    expirationDate: '2030-11-18',
    diseases: ['Encephalitis', 'MOGAD', 'MS', 'NMOSD', 'Sarcoidosis'],
    dataShared: 'Demographics, clinical attacks, serological and laboratory features, radiographic features, and treatments',
    samplesShared: '',
  },
  {
    id: 'a2',
    title: 'Exosomes in MOG antibody disease (MOGAD)',
    partner: 'Yale',
    type: 'MTA',
    direction: 'outgoing',
    status: 'fully_executed',
    expirationDate: '2030-12-11',
    diseases: ['MOGAD'],
    dataShared: 'Date of attacks, attack phenotypes, age at attacks, date of sample collection, MRI features, laboratory features and disability data',
    samplesShared: 'Human serum and plasma',
  },
  {
    id: 'a3',
    title: 'Antibody-mediated central vitamin deficiencies in neurological disorders',
    partner: 'UCSF',
    type: 'MTA',
    direction: 'outgoing',
    status: 'in_review',
    expirationDate: null,
    diseases: ['Myelopathies'],
    dataShared: 'Clinical phenotypes and date of samples',
    samplesShared: 'Cerebrospinal fluid, serum',
  },
  {
    id: 'a4',
    title: 'Disease course and comorbidities in neuroinflammatory disorders',
    partner: 'Charité – Universitätsmedizin Berlin',
    type: 'DUA',
    direction: 'bidirectional',
    status: 'in_review',
    expirationDate: null,
    diseases: ['MOGAD', 'NMOSD'],
    dataShared: 'Data on demographics, comorbidities including headaches and headache characteristics, disease course (attacks, lab results) and treatments',
    samplesShared: '',
  },
  {
    id: 'a5',
    title: 'Pathophysiology of neuroinflammatory disorders',
    partner: 'McGill',
    type: 'MTA',
    direction: 'outgoing',
    status: 'fully_executed',
    expirationDate: null,
    diseases: ['Encephalitis', 'MOGAD', 'MS', 'NMOSD', 'Sarcoidosis'],
    dataShared: '',
    samplesShared: 'Human tissue and samples',
  },
  {
    id: 'a6',
    title: 'Effectiveness and tolerability of subcutaneous immune globulin in MOG antibody associated disease',
    partner: 'Johns Hopkins',
    type: 'Low risk DUA',
    direction: 'outgoing',
    status: 'fully_executed',
    expirationDate: null,
    diseases: ['MOGAD'],
    dataShared: '',
    samplesShared: '',
  },
  {
    id: 'a7',
    title: 'Multicenter Observational Study on the Use of Anti-IL6R Therapies in MOGAD',
    partner: 'Mayo Clinic',
    type: 'Low risk DUA',
    direction: 'outgoing',
    status: 'fully_executed',
    expirationDate: null,
    diseases: ['MOGAD'],
    dataShared: '',
    samplesShared: '',
  },
]

export const agreementStatusLabels: Record<AgreementStatus, string> = {
  in_review: 'In Review',
  fully_executed: 'Fully Executed',
  expired: 'Expired',
}

export const agreementStatusColors: Record<AgreementStatus, string> = {
  in_review: 'bg-amber-100 text-amber-700',
  fully_executed: 'bg-emerald-100 text-emerald-700',
  expired: 'bg-red-100 text-red-700',
}

export const directionLabels: Record<AgreementDirection, string> = {
  incoming: 'Incoming',
  outgoing: 'Outgoing',
  bidirectional: 'Bidirectional',
}
