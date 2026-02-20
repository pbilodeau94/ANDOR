import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-[var(--color-primary-dark)] text-gray-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          {/* About */}
          <div>
            <h3 className="text-lg font-bold text-white">ANDOR</h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-400">
              Autoimmune Neurological DisOrders Registry.
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
                { href: '/clinical-trials', label: 'Clinical Trials' },
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
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">Affiliations</h3>
            <ul className="mt-3 space-y-2 text-sm text-gray-400">
              <li>Mass General Brigham</li>
              <li>Harvard Medical School</li>
            </ul>
          </div>
        </div>

        {/* Institutional Logos */}
        <div className="mt-10 flex flex-col items-center gap-3">
          <div className="flex items-center gap-8">
            <Image
              src="/mgb-logo.png"
              alt="Mass General Brigham"
              width={160}
              height={26}
              className="h-6 w-auto brightness-0 invert opacity-60"
            />
            <Image
              src="/hms-logo.png"
              alt="Harvard Medical School"
              width={160}
              height={53}
              className="h-9 w-auto brightness-0 invert opacity-60"
            />
          </div>
          <p className="text-[10px] font-medium uppercase tracking-widest text-gray-500">
            MGB Neurology &middot; Division of Neuroimmunology
          </p>
        </div>

        <div className="mt-6 border-t border-gray-700 pt-6 text-center text-xs text-gray-500">
          &copy; {new Date().getFullYear()} ANDOR Research Group. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
