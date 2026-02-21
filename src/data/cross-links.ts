import { projects } from './projects'
import { grants } from './grants'
import { agreements } from './agreements'
import { trackedTrials } from './trials-tracker'
import type { Project } from './projects'
import type { Grant } from './grants'
import type { Agreement } from './agreements'
import type { TrackedTrial } from './trials-tracker'

function sharedDiseases(a: string[], b: string[]): boolean {
  const setB = new Set(b.map((d) => d.toLowerCase()))
  return a.some((d) => setB.has(d.toLowerCase()))
}

function trialDiseases(trial: TrackedTrial): string[] {
  return trial.disease.split(',').map((d) => d.trim()).filter(Boolean)
}

export function getRelatedProjects(diseases: string[], excludeId?: string): Project[] {
  return projects
    .filter((p) => p.id !== excludeId && sharedDiseases(p.diseases, diseases))
    .slice(0, 5)
}

export function getRelatedGrants(diseases: string[], excludeId?: string): Grant[] {
  return grants
    .filter((g) => g.id !== excludeId && sharedDiseases(g.diseases, diseases))
    .slice(0, 5)
}

export function getRelatedAgreements(diseases: string[], excludeId?: string): Agreement[] {
  return agreements
    .filter((a) => a.id !== excludeId && sharedDiseases(a.diseases, diseases))
    .slice(0, 5)
}

export function getRelatedTrials(diseases: string[], excludeId?: string): TrackedTrial[] {
  return trackedTrials
    .filter((t) => t.id !== excludeId && sharedDiseases(trialDiseases(t), diseases))
    .slice(0, 5)
}
