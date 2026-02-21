type PortalPageHeaderProps = {
  title: string
  subtitle?: string
  children?: React.ReactNode
}

export default function PortalPageHeader({ title, subtitle, children }: PortalPageHeaderProps) {
  return (
    <div className="border-b border-gray-200 bg-gray-50">
      <div className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            {subtitle && <p className="mt-1 text-sm text-gray-600">{subtitle}</p>}
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}
