export type ResearchGroup = {
  id: string
  name: string
  slug: string
  description: string
  patientCount: string
  infrastructure: string[]
  keyInvestigators: string[]
  accentColor: string
}

export const researchGroups: ResearchGroup[] = [
  {
    id: 'rg1',
    name: 'MOGAD',
    slug: 'mogad',
    description:
      'Myelin Oligodendrocyte Glycoprotein Antibody-Associated Disease (MOGAD) is a rare autoimmune condition that attacks the myelin sheath of the central nervous system. Our MOGAD program operates one of the largest single-center registries in the world, enabling studies of biomarkers, treatment optimization, and disease natural history.',
    patientCount: '~350',
    infrastructure: [
      'Prospective registry with >350 patients',
      'Biorepository (serum, CSF, PBMCs)',
      'REDCap longitudinal database',
      'Cell-based assay lab for MOG antibody testing',
      '\u03B3\u03B4 T cell animal models (EAE)',
    ],
    keyInvestigators: ['Michael Levy', 'Phil Bilodeau', 'Takahisa Mikami', 'Joao Oliveira', 'Marcelo Matiello', 'Tanuja Chitnis'],
    accentColor: 'blue-500',
  },
  {
    id: 'rg2',
    name: 'NMOSD',
    slug: 'nmosd',
    description:
      'Neuromyelitis Optica Spectrum Disorder (NMOSD) is a severe autoimmune condition targeting aquaporin-4 channels in the CNS. Our NMOSD program includes the BEST-NMOSD pragmatic clinical trial and a comprehensive multi-center cohort studying treatment effectiveness and disease mechanisms.',
    patientCount: '~180',
    infrastructure: [
      'Prospective registry with >180 patients',
      'BEST-NMOSD pragmatic clinical trial (PCORI-funded)',
      'Multi-center collaboration',
      'Biorepository and biomarker studies',
    ],
    keyInvestigators: ['Shamik Bhattacharyya', 'Phil Bilodeau', 'Mattia Wruble', 'Michael Levy'],
    accentColor: 'emerald-500',
  },
  {
    id: 'rg3',
    name: 'Autoimmune Encephalitis',
    slug: 'encephalitis',
    description:
      'Autoimmune encephalitis encompasses a group of conditions where the immune system attacks the brain, causing seizures, cognitive dysfunction, and psychiatric symptoms. Our program focuses on improving diagnostic pathways, studying seronegative encephalitis, and conducting clinical trials.',
    patientCount: '~100',
    infrastructure: [
      'Standardized diagnostic algorithm (published)',
      'ExTINGUISH and CIELO clinical trial involvement',
      'Patient-reported outcome measures development',
    ],
    keyInvestigators: ['Mattia Wruble', 'Shamik Bhattacharyya', 'Phil Bilodeau'],
    accentColor: 'violet-500',
  },
  {
    id: 'rg4',
    name: 'Neurosarcoidosis',
    slug: 'neurosarcoidosis',
    description:
      'Neurosarcoidosis occurs when sarcoidosis\u2014a systemic inflammatory disease\u2014affects the nervous system. Our program is investigating the immunopathogenesis of neurosarcoidosis using advanced laboratory techniques and building a comprehensive clinical database to study treatment phenotypes.',
    patientCount: '~60',
    infrastructure: [
      'Clinical registry',
      'Immunopathogenesis lab studies',
      'Exosome and protein trafficking research',
    ],
    keyInvestigators: ['Michael Levy', 'Monique Anderson', 'Phil Bilodeau'],
    accentColor: 'amber-600',
  },
  {
    id: 'rg5',
    name: 'CNS Vasculitis',
    slug: 'vasculitis',
    description:
      'Central nervous system vasculitis, including primary CNS vasculitis and amyloid-related vascular inflammation, are rare and often devastating conditions. Our program focuses on defining clinicoradiographic phenotypes, validating biomarkers, and developing clinical trials for these underserved conditions.',
    patientCount: '~40',
    infrastructure: [
      'Biopsy-confirmed cohort database',
      'Advanced MRI imaging protocols (central vein sign)',
      'Novel biomarker investigation',
    ],
    keyInvestigators: ['Jimmy Nguyen', 'Michael Levy', 'Shamik Bhattacharyya'],
    accentColor: 'rose-500',
  },
  {
    id: 'rg6',
    name: 'EBV and MS',
    slug: 'ebv-ms',
    description:
      'Our EBV and MS program investigates the role of Epstein-Barr virus in triggering multiple sclerosis. Through virology, immunology, and translational research, we aim to understand EBV-driven CNS autoimmunity and develop antiviral therapeutic strategies.',
    patientCount: '',
    infrastructure: [
      'Flow cytometry and single-cell transcriptomics',
      'EBV immunology assays',
      'Exosome isolation and characterization',
    ],
    keyInvestigators: ['Natalia Drosu', 'João Vitor Mahler', 'Phil Bilodeau', 'Monique Anderson', 'Takahisa Mikami', 'Natasha Bobrowski-Khoury', 'Mulan Jiang', 'Huimin Zhu', 'Jimmy Nguyen', 'Marcelo Matiello', 'Michael Levy'],
    accentColor: 'teal-500',
  },
  {
    id: 'rg7',
    name: 'Neuro-Rheumatology',
    slug: 'neuro-rheum',
    description:
      'Our Neuro-Rheumatology program at Brigham and Women\u2019s Hospital focuses on neurological manifestations of systemic autoimmune diseases, including neuropsychiatric lupus (neuroSLE), rheumatoid pachymeningitis, and other rheumatological conditions affecting the nervous system.',
    patientCount: '',
    infrastructure: [
      'Multidisciplinary neuro-rheumatology clinic (BWH)',
      'NeuroSLE patient registry',
      'Collaborative rheumatology and neurology protocols',
    ],
    keyInvestigators: ['Shamik Bhattacharyya', 'Mattia Wruble', 'Douglas Wilcox', 'Phil Bilodeau'],
    accentColor: 'indigo-500',
  },
  {
    id: 'rg8',
    name: 'Folate and Autism',
    slug: 'folate-autism',
    description:
      'Our Folate and Autism program investigates folate receptor alpha (FR\u03B1) autoantibodies and their role in cerebral folate deficiency and autism spectrum disorder. This translational research bridges neuroimmunology and neurodevelopment, exploring how autoimmune disruption of folate transport contributes to ASD pathogenesis.',
    patientCount: '',
    infrastructure: [
      'FR\u03B1 autoantibody testing protocols',
      'Translational folate metabolism studies',
      'Collaborative neurodevelopmental research network',
    ],
    keyInvestigators: ['Natasha Bobrowski-Khoury', 'Michael Levy', 'Phil Bilodeau'],
    accentColor: 'cyan-500',
  },
]
