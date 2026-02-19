import Link from 'next/link'
import type { ResearchGroup } from '@/data/research-groups'

type Props = {
  group: ResearchGroup
  projectCount: number
}

export default function ResearchGroupCard({ group, projectCount }: Props) {
  return (
    <Link
      href={`/research#${group.slug}`}
      className="group rounded-xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-md"
    >
      <div className="mb-3 text-3xl">{group.icon}</div>
      <h3 className="text-lg font-bold text-gray-900 group-hover:text-[var(--color-primary)]">
        {group.name}
      </h3>
      <div className="mt-2 flex items-center gap-4 text-sm text-gray-500">
        {group.patientCount && (
          <span className="flex items-center gap-1">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0"
              />
            </svg>
            {group.patientCount} patients
          </span>
        )}
        <span className="flex items-center gap-1">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5"
            />
          </svg>
          {projectCount} active projects
        </span>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-gray-600 line-clamp-2">
        {group.description}
      </p>
    </Link>
  )
}
