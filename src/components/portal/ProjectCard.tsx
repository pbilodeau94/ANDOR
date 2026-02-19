import type { Project } from '@/data/projects'

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-3 transition-shadow hover:shadow-md">
      <h4 className="text-sm font-medium text-gray-900 line-clamp-2">{project.title}</h4>
      <p className="mt-1 text-xs text-gray-500">
        Lead: {project.lead}
      </p>
      {project.pi && project.pi !== project.lead && (
        <p className="text-xs text-gray-400">PI: {project.pi}</p>
      )}
      {project.researchType && (
        <p className="mt-1 text-xs text-gray-400">{project.researchType}</p>
      )}
      {project.diseases.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {project.diseases.map((d) => (
            <span key={d} className="rounded bg-gray-100 px-1.5 py-0.5 text-[10px] text-gray-500">
              {d}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
