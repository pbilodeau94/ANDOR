type PortalSectionProps = {
  children: React.ReactNode
  className?: string
}

export default function PortalSection({ children, className = '' }: PortalSectionProps) {
  return (
    <section className={`border-b border-gray-100 bg-white py-8 ${className}`}>
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  )
}
