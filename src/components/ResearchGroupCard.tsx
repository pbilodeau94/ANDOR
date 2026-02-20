import Link from 'next/link'
import type { ResearchGroup } from '@/data/research-groups'

const colorMap: Record<string, string> = {
  'blue-500': 'border-l-blue-500',
  'emerald-500': 'border-l-emerald-500',
  'violet-500': 'border-l-violet-500',
  'amber-600': 'border-l-amber-600',
  'rose-500': 'border-l-rose-500',
  'teal-500': 'border-l-teal-500',
  'indigo-500': 'border-l-indigo-500',
}

type Props = {
  group: ResearchGroup
}

export default function ResearchGroupCard({ group }: Props) {
  const borderClass = colorMap[group.accentColor] ?? 'border-l-gray-400'

  return (
    <Link
      href={`/research/${group.slug}`}
      className={`group rounded-xl border border-gray-200 border-l-4 ${borderClass} bg-white p-6 transition-shadow hover:shadow-md`}
    >
      <h3 className="text-lg font-bold text-gray-900 group-hover:text-[var(--color-primary)]">
        {group.name}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-gray-600 line-clamp-2">
        {group.description}
      </p>
    </Link>
  )
}
