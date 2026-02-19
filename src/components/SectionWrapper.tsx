type SectionWrapperProps = {
  children: React.ReactNode
  className?: string
  alt?: boolean
  id?: string
}

export default function SectionWrapper({ children, className = '', alt = false, id }: SectionWrapperProps) {
  return (
    <section id={id} className={`py-16 ${alt ? 'bg-[var(--color-surface-alt)]' : 'bg-white'} ${className}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  )
}
