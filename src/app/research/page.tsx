import Hero from '@/components/Hero'
import SectionWrapper from '@/components/SectionWrapper'
import { researchGroups } from '@/data/research-groups'
import { projects } from '@/data/projects'

function getGroupProjects(groupName: string) {
  const diseaseMap: Record<string, string[]> = {
    MOGAD: ['MOGAD'],
    NMOSD: ['NMOSD'],
    'Autoimmune Encephalitis': ['Autoimmune Encephalitis'],
    Neurosarcoidosis: ['Neurosarcoidosis'],
    'CNS Vasculitis': ['Vasculitis'],
    'Translational Neuroimmunology': ['MS'],
  }
  const diseases = diseaseMap[groupName] ?? []
  const diseaseSet = new Set(diseases.map((d) => d.toLowerCase()))
  return projects.filter((p) => p.diseases.some((d) => diseaseSet.has(d.toLowerCase())))
}

export default function ResearchPage() {
  return (
    <>
      <Hero
        subtitle="Research Programs"
        title="Advancing Autoimmune Neurology"
        description="ANDOR's research spans six interconnected programs, each leveraging shared infrastructure, federated registries, and a collaborative team to tackle rare autoimmune neurological diseases."
      />

      <SectionWrapper>
        <p className="mx-auto max-w-3xl text-center leading-relaxed text-gray-600">
          Each research group maintains its own disease-specific registry, biorepository, and active
          project portfolio. Together, these programs form a comprehensive ecosystem for discovery
          in autoimmune neurology.
        </p>
      </SectionWrapper>

      {researchGroups.map((group, i) => {
        const groupProjects = getGroupProjects(group.name)
        const active = groupProjects.filter((p) => p.stage !== 'completed' && p.stage !== 'published')
        const completed = groupProjects.filter((p) => p.stage === 'completed' || p.stage === 'published')

        return (
          <SectionWrapper key={group.id} alt={i % 2 === 1} id={group.slug}>
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Info */}
              <div className="lg:col-span-1">
                <div className="text-4xl">{group.icon}</div>
                <h2 className="mt-3 text-2xl font-bold text-[var(--color-primary)]">{group.name}</h2>
                {group.patientCount && (
                  <p className="mt-1 text-sm font-medium text-[var(--color-accent)]">
                    {group.patientCount} patients in registry
                  </p>
                )}
                <p className="mt-4 leading-relaxed text-gray-600">{group.description}</p>

                <div className="mt-6">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Infrastructure
                  </h4>
                  <ul className="mt-2 space-y-1.5">
                    {group.infrastructure.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                        <svg
                          className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-accent)]"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Key Investigators
                  </h4>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {group.keyInvestigators.map((name) => (
                      <span
                        key={name}
                        className="rounded-full bg-[var(--color-primary)]/10 px-3 py-1 text-xs font-medium text-[var(--color-primary)]"
                      >
                        {name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Projects */}
              <div className="lg:col-span-2">
                <h3 className="text-lg font-semibold text-gray-900">
                  Active Projects ({active.length})
                </h3>
                <div className="mt-4 space-y-3">
                  {active.map((project) => (
                    <div
                      key={project.id}
                      className="rounded-lg border border-gray-200 bg-white p-4"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">{project.title}</h4>
                          <p className="mt-1 text-xs text-gray-500">
                            Lead: {project.lead}
                            {project.pi && project.pi !== project.lead && ` · PI: ${project.pi}`}
                          </p>
                        </div>
                        <span className="shrink-0 rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-700">
                          {project.stage === 'in_progress'
                            ? 'In Progress'
                            : project.stage === 'not_started'
                              ? 'Not Started'
                              : project.stage === 'submitted'
                                ? 'Submitted'
                                : 'Accepted'}
                        </span>
                      </div>
                      {project.fundingSource && (
                        <p className="mt-1 text-xs text-gray-400">Funded by: {project.fundingSource}</p>
                      )}
                    </div>
                  ))}
                  {active.length === 0 && (
                    <p className="text-sm text-gray-400 italic">No active projects listed</p>
                  )}
                </div>

                {completed.length > 0 && (
                  <>
                    <h3 className="mt-8 text-lg font-semibold text-gray-900">
                      Completed / Published ({completed.length})
                    </h3>
                    <div className="mt-4 space-y-2">
                      {completed.map((project) => (
                        <div
                          key={project.id}
                          className="rounded-lg border border-gray-100 bg-gray-50 p-3"
                        >
                          <h4 className="text-sm text-gray-700">{project.title}</h4>
                          <p className="mt-0.5 text-xs text-gray-400">
                            {project.lead} · {project.researchType}
                          </p>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </SectionWrapper>
        )
      })}
    </>
  )
}
