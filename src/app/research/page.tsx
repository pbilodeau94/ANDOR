import Link from 'next/link'
import PageHero from '@/components/PageHero'
import EditorialSection from '@/components/EditorialSection'
import { researchGroups } from '@/data/research-groups'
import { publications } from '@/data/publications'

const uniquePubCount = new Set(publications.map((p) => p.title)).size

const diseaseColors: Record<string, string> = {
  'MOGAD': 'border-l-blue-500',
  'NMOSD': 'border-l-emerald-500',
  'Autoimmune Encephalitis': 'border-l-purple-500',
  'Neurosarcoidosis': 'border-l-amber-500',
  'Neuro-Rheumatology': 'border-l-rose-500',
  'CNS Vasculitis': 'border-l-red-500',
  'Myelopathies': 'border-l-teal-500',
  'Optic Neuritis': 'border-l-orange-500',
}

const diseaseBgColors: Record<string, string> = {
  'MOGAD': 'bg-blue-50',
  'NMOSD': 'bg-emerald-50',
  'Autoimmune Encephalitis': 'bg-purple-50',
  'Neurosarcoidosis': 'bg-amber-50',
  'Neuro-Rheumatology': 'bg-rose-50',
  'CNS Vasculitis': 'bg-red-50',
  'Myelopathies': 'bg-teal-50',
  'Optic Neuritis': 'bg-orange-50',
}

const diseaseDotColors: Record<string, string> = {
  'MOGAD': 'bg-blue-500',
  'NMOSD': 'bg-emerald-500',
  'Autoimmune Encephalitis': 'bg-purple-500',
  'Neurosarcoidosis': 'bg-amber-500',
  'Neuro-Rheumatology': 'bg-rose-500',
  'CNS Vasculitis': 'bg-red-500',
  'Myelopathies': 'bg-teal-500',
  'Optic Neuritis': 'bg-orange-500',
}

export default function ResearchPage() {
  return (
    <>
      <PageHero
        overline="Research Programs"
        title="Advancing Autoimmune Neurology"
        description={`Our team has published over ${uniquePubCount} peer-reviewed papers across eight core research areas.`}
      />

      {/* Program grid */}
      <EditorialSection rule={false}>
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-4 sm:grid-cols-2">
            {researchGroups.map((group) => {
              const pubCount = publications.filter(
                (p) => p.researchGroup === group.name
              ).length
              return (
                <Link
                  key={group.id}
                  href={`/research/${group.slug}`}
                  className={`group relative overflow-hidden rounded-xl border border-[var(--color-rule)] border-l-4 ${diseaseColors[group.name] || 'border-l-gray-400'} p-6 transition-all hover:shadow-md hover:border-[var(--color-primary)]`}
                >
                  <div className={`absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100 ${diseaseBgColors[group.name] || 'bg-gray-50'}`} />
                  <div className="relative">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span className={`h-2.5 w-2.5 rounded-full ${diseaseDotColors[group.name] || 'bg-gray-400'}`} />
                        <h2 className="font-display text-lg text-[#1a1614] group-hover:text-[var(--color-primary)]">
                          {group.name}
                        </h2>
                      </div>
                      {group.patientCount && (
                        <span className="shrink-0 rounded-full bg-[var(--color-surface-alt)] px-2.5 py-0.5 text-xs font-semibold tabular-nums text-[var(--color-ink-secondary)]">
                          {group.patientCount} patients
                        </span>
                      )}
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-[var(--color-ink-tertiary)] line-clamp-2">
                      {group.description.split('. ').slice(0, 1).join('. ')}.
                    </p>
                    <div className="mt-4 flex items-center gap-4 text-xs text-[var(--color-ink-tertiary)]">
                      <span className="font-medium">{pubCount} publications</span>
                      <span>&middot;</span>
                      <span>{group.keyInvestigators.length} investigators</span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </EditorialSection>

      {/* Shared Infrastructure */}
      <section className="bg-[var(--color-primary)] py-20 text-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-gray-400">Shared Infrastructure</p>
          <h2 className="mt-3 font-display text-[clamp(28px,4vw,44px)]">
            Amplifying collaborative discovery
          </h2>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {[
              { label: 'Federated Registries', stat: '700+', unit: 'patients enrolled', desc: 'Disease-specific registries spanning MOGAD, NMOSD, encephalitis, neurosarcoidosis, and CNS vasculitis.', color: 'text-emerald-400' },
              { label: 'Biorepository', stat: '4', unit: 'sample types', desc: 'Serum, CSF, PBMCs, and tissue linked to detailed clinical phenotyping.', color: 'text-blue-400' },
              { label: 'REDCap Databases', stat: '6', unit: 'disease areas', desc: 'Longitudinal databases with validated outcome instruments for multi-center analyses.', color: 'text-purple-400' },
              { label: 'Global Collaborations', stat: '15+', unit: 'institutions', desc: 'Pooled analyses across institutions worldwide for ultra-rare conditions.', color: 'text-amber-400' },
            ].map((item) => (
              <div key={item.label} className="rounded-lg border border-white/10 bg-white/5 p-6">
                <p className={`text-xs font-semibold uppercase tracking-wider ${item.color}`}>{item.label}</p>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="font-display text-3xl">{item.stat}</span>
                  <span className="text-sm text-gray-400">{item.unit}</span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-gray-300">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
