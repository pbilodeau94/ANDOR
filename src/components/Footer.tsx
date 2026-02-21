import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="border-t-2 border-[var(--color-accent)] bg-[var(--color-primary-dark)] text-gray-300">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-3">
          {/* About */}
          <div>
            <h3 className="font-display text-xl text-white">ANDOR</h3>
            <p className="mt-4 text-sm leading-relaxed text-gray-400">
              Autoimmune Neurological DisOrders Registry.
              A division-wide research collaborative within MGB Neurology, Division of Neuroimmunology.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <p className="overline text-gray-500">Quick Links</p>
            <ul className="mt-4 space-y-2.5">
              {[
                { href: '/research', label: 'Research Programs' },
                { href: '/clinical-trials', label: 'Clinical Trials' },
                { href: '/education', label: 'Education' },
                { href: '/team', label: 'Our Team' },
                { href: '/patient-resources', label: 'Patient Resources' },
                { href: '/media', label: 'Media & Press' },
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

          {/* Affiliations */}
          <div>
            <p className="overline text-gray-500">Affiliations</p>
            <ul className="mt-4 space-y-2.5 text-sm text-gray-400">
              <li>Mass General Brigham</li>
              <li>Harvard Medical School</li>
            </ul>
          </div>
        </div>

        {/* Institutional Logos */}
        <div className="mt-14 flex flex-col items-center gap-4">
          <div className="flex items-center gap-8">
            <Image
              src="/mgb-logo.png"
              alt="Mass General Brigham"
              width={160}
              height={26}
              className="h-6 w-auto opacity-80"
            />
            <Image
              src="/hms-logo.png"
              alt="Harvard Medical School"
              width={160}
              height={53}
              className="h-9 w-auto opacity-80"
            />
          </div>
          <p className="overline text-gray-600">
            MGB Neurology &middot; Division of Neuroimmunology
          </p>
        </div>

        <div className="mt-8 border-t border-gray-700/50 pt-8 text-center text-xs text-gray-600">
          &copy; {new Date().getFullYear()} ANDOR Research Group. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
