type EditorialSectionProps = {
  children: React.ReactNode
  className?: string
  rule?: boolean
  dark?: boolean
  id?: string
}

export default function EditorialSection({
  children,
  className = '',
  rule = true,
  dark = false,
  id,
}: EditorialSectionProps) {
  return (
    <section
      id={id}
      className={`py-20 sm:py-24 ${
        dark
          ? 'bg-[var(--color-primary)] text-white'
          : 'bg-[var(--color-surface)]'
      } ${className}`}
    >
      {rule && !dark && (
        <hr className="mx-auto mb-20 sm:mb-24 max-w-7xl border-[var(--color-rule)] px-4 sm:px-6 lg:px-8" />
      )}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  )
}
