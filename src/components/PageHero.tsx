type PageHeroProps = {
  overline?: string
  title: string
  description?: string
  variant?: 'dark' | 'light'
  children?: React.ReactNode
}

export default function PageHero({
  overline,
  title,
  description,
  variant = 'dark',
  children,
}: PageHeroProps) {
  const isDark = variant === 'dark'

  return (
    <section
      className={`relative py-24 sm:py-32 ${
        isDark
          ? 'bg-[var(--color-primary)] text-white'
          : 'bg-[var(--color-surface)] text-[#1a1614]'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {overline && (
          <p
            className={`overline mb-4 ${
              isDark ? 'text-gray-400' : ''
            }`}
          >
            {overline}
          </p>
        )}
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl max-w-4xl">
          {title}
        </h1>
        {description && (
          <p
            className={`mt-6 max-w-2xl text-[17px] leading-relaxed ${
              isDark ? 'text-gray-300' : 'text-[var(--color-ink-secondary)]'
            }`}
          >
            {description}
          </p>
        )}
        {children}
      </div>
    </section>
  )
}
