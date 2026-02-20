export type ResearchGroup = {
  id: string
  name: string
  slug: string
  description: string
  patientCount: string
  infrastructure: string[]
  keyInvestigators: string[]
  icon: string
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
    ],
    keyInvestigators: ['Michael Levy', 'Phil Bilodeau', 'Taka Mikami', 'Joao Oliveira', 'Marcelo Matiello'],
    icon: '🧬',
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
    icon: '🔬',
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
    keyInvestigators: ['Giovanna Manzano'],
    icon: '🧠',
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
    icon: '🫁',
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
    icon: '🩸',
  },
  {
    id: 'rg6',
    name: 'Translational Neuroimmunology',
    slug: 'translational',
    description:
      'Our translational research program bridges bench and bedside, spanning EBV immunology in MS, exosome biology, \u03B3\u03B4 T cell research, and novel antibody discovery. These studies aim to identify new therapeutic targets and diagnostic biomarkers for autoimmune neurological diseases.',
    patientCount: '',
    infrastructure: [
      'Flow cytometry and single-cell transcriptomics',
      'EBV immunology assays',
      '\u03B3\u03B4 T cell animal models (EAE)',
      'Exosome isolation and characterization',
    ],
    keyInvestigators: ['Michael Levy', 'Phil Bilodeau', 'Natalia Drosu', 'Monique Anderson', 'Taka Mikami'],
    icon: '⚗️',
  },
]
