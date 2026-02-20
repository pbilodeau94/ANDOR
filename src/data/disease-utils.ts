import { researchGroups } from './research-groups'

/** Maps research group names to the disease strings used in projects/grants/agreements */
export const diseaseMap: Record<string, string[]> = {
  MOGAD: ['MOGAD'],
  NMOSD: ['NMOSD'],
  'Autoimmune Encephalitis': ['Autoimmune Encephalitis', 'Encephalitis'],
  Neurosarcoidosis: ['Neurosarcoidosis', 'Sarcoidosis'],
  'CNS Vasculitis': ['Vasculitis'],
  'EBV and MS': ['MS', 'AD', 'ASD', 'ALS', 'OCD', 'Schizophrenia', 'Superficial siderosis', 'Inflammatory myelopathy'],
  'Neuro-Rheumatology': ['NeuroSLE', 'Lupus', 'Rheumatology', 'Pachymeningitis'],
  'Folate and Autism': ['Folate', 'Autism', 'ASD', 'FRA'],
}

/** All disease tab keys (research group names) */
export const diseaseGroups = researchGroups.map((g) => g.name)

/** Accent color for each disease group (from research-groups) */
export const diseaseGroupColors: Record<string, string> = Object.fromEntries(
  researchGroups.map((g) => [g.name, g.accentColor])
)

/** Check whether an item with a `diseases` array matches a given research group tab */
export function matchesDisease(
  itemDiseases: string[],
  groupName: string
): boolean {
  const targets = diseaseMap[groupName]
  if (!targets) return false
  const targetSet = new Set(targets.map((d) => d.toLowerCase()))
  return itemDiseases.some((d) => targetSet.has(d.toLowerCase()))
}

/** Filter an array of items (with .diseases field) by research group name */
export function filterByDisease<T extends { diseases: string[] }>(
  items: T[],
  groupName: string | null
): T[] {
  if (!groupName) return items
  return items.filter((item) => matchesDisease(item.diseases, groupName))
}
