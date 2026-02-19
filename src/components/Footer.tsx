import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-[var(--color-primary-dark)] text-gray-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          {/* About */}
          <div>
            <h3 className="text-lg font-bold text-white">ANDOR</h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-400">
              Autoimmune Neurological Disorders Observational Studies &amp; Registry.
              A division-wide research collaborative within MGB Neurology, Division of Neuroimmunology.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">Quick Links</h3>
            <ul className="mt-3 space-y-2">
              {[
                { href: '/research', label: 'Research Programs' },
                { href: '/team', label: 'Our Team' },
                { href: '/support', label: 'Support Our Research' },
                { href: '/portal', label: 'Investigator Portal' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Affiliation */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">Affiliations</h3>
            <ul className="mt-3 space-y-2 text-sm text-gray-400">
              <li>Massachusetts General Hospital</li>
              <li>Brigham and Women&apos;s Hospital</li>
              <li>Harvard Medical School</li>
              <li>Mass General Brigham</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-700 pt-6 text-center text-xs text-gray-500">
          &copy; {new Date().getFullYear()} ANDOR Research Group. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
