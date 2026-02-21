type StatDisplayProps = {
  value: string
  label: string
  light?: boolean
}

export default function StatDisplay({ value, label, light = false }: StatDisplayProps) {
  return (
    <div>
      <div
        className={`stat-figure ${
          light ? 'text-white' : 'text-[var(--color-primary)]'
        }`}
      >
        {value}
      </div>
      <div
        className={`mt-1 text-sm ${
          light ? 'text-gray-400' : 'text-[var(--color-ink-secondary)]'
        }`}
      >
        {label}
      </div>
    </div>
  )
}
