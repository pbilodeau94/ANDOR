import Link from 'next/link'
import Logo from './Logo'

type HeroProps = {
  title: string
  subtitle?: string
  description?: string
  cta?: { label: string; href: string }
  children?: React.ReactNode
  showLogo?: boolean
}

export default function Hero({ title, subtitle, description, cta, children, showLogo }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[var(--color-primary)] via-[var(--color-primary-light)] to-[var(--color-accent-dark)] py-20 text-white sm:py-28">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hero-dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="1.5" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-dots)" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          {showLogo && (
            <div className="animate-fade-in-up mb-6">
              <Logo className="h-12 text-white sm:h-14" />
            </div>
          )}
          {subtitle && (
            <p className="animate-fade-in-up mb-3 text-sm font-semibold uppercase tracking-wider text-teal-200">
              {subtitle}
            </p>
          )}
          <h1 className="animate-fade-in-up text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          {description && (
            <p className="animate-fade-in-up-delay-1 mt-6 text-lg leading-relaxed text-gray-200 sm:text-xl">
              {description}
            </p>
          )}
          {cta && (
            <div className="animate-fade-in-up-delay-2 mt-8">
              <Link
                href={cta.href}
                className="inline-flex items-center rounded-lg bg-white px-6 py-3 text-sm font-semibold text-[var(--color-primary)] shadow-lg transition-all hover:bg-gray-100 hover:shadow-xl"
              >
                {cta.label}
                <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          )}
          {children}
        </div>
      </div>
    </section>
  )
}
