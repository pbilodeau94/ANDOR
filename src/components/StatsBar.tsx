type Stat = {
  label: string
  value: string
}

export default function StatsBar({ stats }: { stats: Stat[] }) {
  return (
    <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.label} className="text-center">
          <div className="text-3xl font-bold text-[var(--color-primary)] sm:text-4xl">{stat.value}</div>
          <div className="mt-1 text-sm text-gray-500">{stat.label}</div>
        </div>
      ))}
    </div>
  )
}
