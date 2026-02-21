export type TrialStatus = 'active' | 'start_up' | 'open_label' | 'closing_out' | 'closed'

export type IrbStatus = 'approved' | 'pending' | 'amendment' | 'expired' | 'closed'

export type TrackedTrial = {
  id: string
  shortName: string
  acronym: string
  description: string
  disease: string
  status: TrialStatus
  sponsor: string
  pi: string
  subInvestigator?: string
  primaryCRC?: string
  backupCRC?: string
  siteNumber?: string
  targetEnrollment?: number
  totalEnrolled?: number
  currentlyEnrolled?: number
  protocolNumber?: string
  agreementNumber?: string
  fundNumber?: string
  nctId?: string
  studyUrl?: string
  andorLed?: boolean
  publicFacing?: boolean
  irbStatus?: IrbStatus
}

export const trackedTrials: TrackedTrial[] = [
  {
    id: 'tt1',
    shortName: 'BEST-NMOSD',
    acronym: 'BEST-NMOSD',
    description: 'Comparative Effectiveness Trial in NMOSD',
    disease: 'NMOSD',
    status: 'start_up',
    sponsor: 'PCORI / Mass General Brigham',
    pi: 'Phil Bilodeau',
    subInvestigator: 'Shamik Bhattacharyya',
    primaryCRC: 'Becca',
    studyUrl: 'https://best-nmosd.org',
    andorLed: true,
    publicFacing: true,
  },
  {
    id: 'tt2',
    shortName: 'CosMOG',
    acronym: 'MOG001',
    description: 'Rozanolixizumab in Adults with MOGAD',
    disease: 'MOGAD',
    status: 'active',
    sponsor: 'UCB',
    pi: 'Michael Levy',
    subInvestigator: 'Rebecca Gillani',
    primaryCRC: 'Ozden',
    backupCRC: 'Aisha, Becca',
    siteNumber: '50243',
    targetEnrollment: 5,
    totalEnrolled: 7,
    currentlyEnrolled: 4,
    agreementNumber: '2021A009844',
    protocolNumber: '2021P002406',
    fundNumber: '239672',
    nctId: 'NCT05063162',
    studyUrl: 'https://clinicaltrials.gov/study/NCT05063162',
    andorLed: true,
    publicFacing: true,
  },
  {
    id: 'tt3',
    shortName: 'METEROID',
    acronym: 'WN43194',
    description: 'Satralizumab in Adolescents and Adults with MOGAD',
    disease: 'MOGAD',
    status: 'open_label',
    sponsor: 'Roche',
    pi: 'Michael Levy',
    subInvestigator: 'Rebecca Gillani',
    primaryCRC: 'Melanie',
    backupCRC: 'Becca',
    siteNumber: '348178',
    targetEnrollment: 5,
    totalEnrolled: 5,
    currentlyEnrolled: 3,
    agreementNumber: '2021A014946',
    protocolNumber: '2021P002409',
    fundNumber: '240405',
    nctId: 'NCT05271409',
    studyUrl: 'https://clinicaltrials.gov/study/NCT05271409',
    andorLed: true,
    publicFacing: true,
  },
  {
    id: 'tt4',
    shortName: 'SakuraPeak',
    acronym: 'WP44131',
    description: 'Ravulizumab in Adults with NMOSD weighing >100kg',
    disease: 'NMOSD',
    status: 'closing_out',
    sponsor: 'Roche',
    pi: 'Michael Levy',
    primaryCRC: 'Aisha',
    backupCRC: 'Becca',
    siteNumber: '357187',
    totalEnrolled: 2,
    currentlyEnrolled: 0,
    agreementNumber: '2022A017818',
    protocolNumber: '2022P003165',
    fundNumber: '243956',
  },
  {
    id: 'tt5',
    shortName: 'Spheres NMOSD',
    acronym: 'NMOSD-750',
    description: 'Registry for NMOSD and MOGAD patients',
    disease: 'MOGAD, NMOSD',
    status: 'start_up',
    sponsor: 'CorEvitas',
    pi: 'Michael Levy',
    primaryCRC: 'Gabriela',
    backupCRC: 'Becca',
    agreementNumber: '2021A007158',
    protocolNumber: '2021P001511',
    fundNumber: '239199',
    siteNumber: '7030',
  },
  {
    id: 'tt6',
    shortName: 'NMO C5 Registry',
    acronym: 'ALX-NMO-501',
    description: 'Complement Inhibitor Registry',
    disease: 'NMOSD',
    status: 'closing_out',
    sponsor: 'Alexion',
    pi: 'Michael Levy',
    primaryCRC: 'Becca',
    totalEnrolled: 2,
    currentlyEnrolled: 2,
    siteNumber: '1802',
  },
  {
    id: 'tt7',
    shortName: 'DANNCE AI',
    acronym: 'DANNCE',
    description: 'AI tool to assess function in MS',
    disease: 'MS',
    status: 'active',
    sponsor: 'DANNCE AI',
    pi: 'Michael Levy',
    primaryCRC: 'Melanie',
    backupCRC: 'Becca',
    currentlyEnrolled: 20,
    agreementNumber: '2023A001892',
  },
  {
    id: 'tt8',
    shortName: 'OPTIS',
    acronym: 'ADS-OPTIS-2023',
    description: 'Digital wearable technology for NMOSD',
    disease: 'NMOSD',
    status: 'closing_out',
    sponsor: 'Ad Scientum',
    pi: 'Michael Levy',
    primaryCRC: 'Aisha',
    backupCRC: 'Becca',
  },
  {
    id: 'tt9',
    shortName: 'AIE-001',
    acronym: 'AIE-001',
    description: 'Rozanolixizumab in LGI-1 Encephalitis',
    disease: 'Encephalitis',
    status: 'closed',
    sponsor: 'UCB',
    pi: 'Michael Levy',
    primaryCRC: 'Becca',
    backupCRC: 'Ozden',
    siteNumber: '50243',
    totalEnrolled: 0,
    currentlyEnrolled: 0,
  },
  {
    id: 'tt10',
    shortName: 'NMO-307',
    acronym: 'NMO-307',
    description: 'Ravulizumab in Adults with NMOSD',
    disease: 'NMOSD',
    status: 'closed',
    sponsor: 'Horizon',
    pi: 'Michael Levy',
    primaryCRC: 'Becca',
    siteNumber: '0130',
  },
  {
    id: 'tt11',
    shortName: 'AMS05',
    acronym: 'AMS05',
    description: 'Ocrelizumab Discontinuation in MS',
    disease: 'MS',
    status: 'start_up',
    sponsor: 'NIH (Emory and Penn)',
    pi: 'Anastasia Vishnevetsky, Michael Levy',
    primaryCRC: 'Aisha, Becca',
    siteNumber: '70303',
    publicFacing: true,
  },
  {
    id: 'tt12',
    shortName: 'TIMELY-PLEX',
    acronym: 'TIMELY-PLEX',
    description: 'PLEX in Optic Neuritis and Transverse Myelitis',
    disease: 'Optic Neuritis, Transverse Myelitis',
    status: 'start_up',
    sponsor: 'Mayo/Hopkins',
    pi: 'Anastasia Vishnevetsky',
    primaryCRC: 'Becca',
    publicFacing: true,
  },
  {
    id: 'tt13',
    shortName: 'NMO-317',
    acronym: 'NMO-317',
    description: 'Ravulizumab in Pediatric Patients with NMOSD',
    disease: 'NMOSD',
    status: 'closing_out',
    sponsor: 'Alexion',
    pi: 'Michael Levy',
    primaryCRC: 'Aisha',
    backupCRC: 'Becca',
    siteNumber: '0130',
    totalEnrolled: 1,
    currentlyEnrolled: 0,
  },
  {
    id: 'tt14',
    shortName: 'NeuroNext',
    acronym: 'NeuroNext',
    description: 'NeuroNext NMDA Encephalitis Study',
    disease: 'NMDA Encephalitis',
    status: 'active',
    sponsor: '',
    pi: '',
    publicFacing: true,
  },
  {
    id: 'tt15',
    shortName: 'PET-AON',
    acronym: 'PET-AON',
    description: 'Efgartigimod Alfa for Acute Optic Neuritis',
    disease: 'Optic Neuritis',
    status: 'active',
    sponsor: 'Massachusetts General Hospital',
    pi: 'Anastasia Vishnevetsky',
    nctId: 'NCT06453694',
    studyUrl: 'https://clinicaltrials.gov/study/NCT06453694',
    andorLed: true,
    publicFacing: true,
  },
]

export const trialStatusLabels: Record<TrialStatus, string> = {
  active: 'Active',
  start_up: 'Start-Up',
  open_label: 'Open Label',
  closing_out: 'Closing Out',
  closed: 'Closed',
}

export const trialStatusColors: Record<TrialStatus, string> = {
  active: 'bg-emerald-100 text-emerald-700',
  start_up: 'bg-blue-100 text-blue-700',
  open_label: 'bg-amber-100 text-amber-700',
  closing_out: 'bg-orange-100 text-orange-700',
  closed: 'bg-gray-100 text-gray-600',
}

export const irbStatusLabels: Record<IrbStatus, string> = {
  approved: 'Approved',
  pending: 'Pending',
  amendment: 'Amendment',
  expired: 'Expired',
  closed: 'Closed',
}

export const irbStatusColors: Record<IrbStatus, string> = {
  approved: 'bg-emerald-100 text-emerald-700',
  pending: 'bg-amber-100 text-amber-700',
  amendment: 'bg-blue-100 text-blue-700',
  expired: 'bg-red-100 text-red-700',
  closed: 'bg-gray-100 text-gray-600',
}
