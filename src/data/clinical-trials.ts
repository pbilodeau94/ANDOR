export type ClinicalTrial = {
  nctId: string | null
  shortName: string
  officialTitle: string
  briefSummary: string
  conditions: string[]
  intervention: string
  sponsor: string
  status: 'recruiting' | 'active' | 'completed' | 'not_yet_recruiting'
  phase: string
  enrollment: number
  startDate: string
  completionDate: string
  studyUrl: string
  diseaseArea: string
  andorRole: string
}

export const clinicalTrials: ClinicalTrial[] = [
  {
    nctId: null,
    shortName: 'BEST-NMOSD',
    officialTitle:
      'Comparative Effectiveness of Disease-Modifying Therapies in Neuromyelitis Optica Spectrum Disorder: A Pragmatic Clinical Trial',
    briefSummary:
      'ANDOR-led pragmatic clinical trial comparing disease-modifying treatments head-to-head in NMOSD using a novel composite endpoint incorporating empirically determined thresholds for safety and tolerability failure. This international multi-center study provides the real-world comparative effectiveness evidence clinicians need to guide treatment decisions.',
    conditions: ['NMOSD'],
    intervention: 'Comparative effectiveness (multiple DMTs)',
    sponsor: 'PCORI / Mass General Brigham',
    status: 'recruiting',
    phase: 'Pragmatic CER',
    enrollment: 200,
    startDate: '2024-01',
    completionDate: '2028-12',
    studyUrl: 'https://best-nmosd.org',
    diseaseArea: 'NMOSD',
    andorRole: 'Sponsor-investigator (ANDOR-led)',
  },
  {
    nctId: 'NCT05063162',
    shortName: 'cosMOG (Rozanolixizumab)',
    officialTitle:
      'A Randomized, Double-Blind, Placebo-Controlled, Multicenter, Phase 3, Pivotal Study to Evaluate the Efficacy and Safety of Rozanolixizumab in Adult Participants With MOG Antibody-Associated Disease',
    briefSummary:
      'Evaluates the efficacy, safety, and tolerability of rozanolixizumab, an FcRn antagonist, for treatment of adults with MOGAD.',
    conditions: ['MOGAD'],
    intervention: 'Rozanolixizumab (FcRn antagonist)',
    sponsor: 'UCB Biopharma SRL',
    status: 'recruiting',
    phase: 'Phase 3',
    enrollment: 104,
    startDate: '2022-02',
    completionDate: '2027-07',
    studyUrl: 'https://clinicaltrials.gov/study/NCT05063162',
    diseaseArea: 'MOGAD',
    andorRole: 'Site PI (ANDOR-led)',
  },
  {
    nctId: 'NCT05271409',
    shortName: 'METEROID (Satralizumab)',
    officialTitle:
      'A Phase III Study to Evaluate the Efficacy, Safety, Pharmacokinetics, and Pharmacodynamics of Satralizumab in Patients With MOGAD',
    briefSummary:
      'Evaluates satralizumab (IL-6 receptor antagonist) as monotherapy or add-on therapy for relapse prevention in MOGAD.',
    conditions: ['MOGAD'],
    intervention: 'Satralizumab (IL-6R antagonist)',
    sponsor: 'Hoffmann-La Roche',
    status: 'recruiting',
    phase: 'Phase 3',
    enrollment: 152,
    startDate: '2022-08',
    completionDate: '2028-12',
    studyUrl: 'https://clinicaltrials.gov/study/NCT05271409',
    diseaseArea: 'MOGAD',
    andorRole: 'Site PI (ANDOR-led)',
  },
  {
    nctId: 'NCT05503264',
    shortName: 'CIELO (Satralizumab)',
    officialTitle:
      'A Phase III Basket Study to Evaluate the Efficacy of Satralizumab in Patients With Anti-NMDAR or Anti-LGI1 Encephalitis',
    briefSummary:
      'Assesses satralizumab in participants with NMDAR and LGI1 autoimmune encephalitis\u2014two of the most common forms of autoimmune encephalitis.',
    conditions: ['NMDAR Encephalitis', 'LGI1 Encephalitis'],
    intervention: 'Satralizumab (IL-6R antagonist)',
    sponsor: 'Hoffmann-La Roche',
    status: 'recruiting',
    phase: 'Phase 3',
    enrollment: 152,
    startDate: '2022-09',
    completionDate: '2029-12',
    studyUrl: 'https://clinicaltrials.gov/study/NCT05503264',
    diseaseArea: 'Autoimmune Encephalitis',
    andorRole: 'Enrolling site',
  },
  {
    nctId: 'NCT04372615',
    shortName: 'ExTINGUISH (Inebilizumab)',
    officialTitle:
      'A Phase-2b, Double-Blind, Randomized Controlled Trial to Evaluate the Activity and Safety of Inebilizumab in Anti-NMDAR Encephalitis',
    briefSummary:
      'Evaluates inebilizumab (anti-CD19 B cell-depleting antibody) added to standard-of-care immunotherapy for anti-NMDAR encephalitis.',
    conditions: ['Anti-NMDAR Encephalitis'],
    intervention: 'Inebilizumab (anti-CD19)',
    sponsor: 'University of Utah',
    status: 'recruiting',
    phase: 'Phase 2b',
    enrollment: 116,
    startDate: '2022-03',
    completionDate: '2028-09',
    studyUrl: 'https://clinicaltrials.gov/study/NCT04372615',
    diseaseArea: 'Autoimmune Encephalitis',
    andorRole: 'Enrolling site',
  },
  {
    nctId: 'NCT06453694',
    shortName: 'PET-AON (Efgartigimod)',
    officialTitle:
      'A Pilot Randomized Trial of Efgartigimod Alfa for the Treatment of Incident Moderate to Severe Acute Optic Neuritis',
    briefSummary:
      'Investigator-initiated pilot trial testing efgartigimod alfa (FcRn antagonist) against placebo in adults with first-time moderate to severe acute optic neuritis. Assesses feasibility and preliminary efficacy for visual recovery.',
    conditions: ['Acute Optic Neuritis'],
    intervention: 'Efgartigimod Alfa (FcRn antagonist)',
    sponsor: 'Massachusetts General Hospital',
    status: 'recruiting',
    phase: 'Phase 2',
    enrollment: 20,
    startDate: '2025-08',
    completionDate: '2027-07',
    studyUrl: 'https://clinicaltrials.gov/study/NCT06453694',
    diseaseArea: 'Optic Neuritis',
    andorRole: 'Sponsor-investigator (Dr. Vishnevetsky)',
  },
]

export const statusLabels: Record<ClinicalTrial['status'], string> = {
  recruiting: 'Recruiting',
  active: 'Active',
  completed: 'Completed',
  not_yet_recruiting: 'Not Yet Recruiting',
}

export const statusColors: Record<ClinicalTrial['status'], string> = {
  recruiting: 'bg-emerald-100 text-emerald-700',
  active: 'bg-blue-100 text-blue-700',
  completed: 'bg-gray-100 text-gray-700',
  not_yet_recruiting: 'bg-amber-100 text-amber-700',
}
