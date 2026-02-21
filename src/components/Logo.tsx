export default function Logo({ className = 'h-8' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 40"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="ANDOR"
    >
      {/* Neural network / astrocyte motif */}
      {/* Connecting lines */}
      <line x1="20" y1="20" x2="10" y2="10" stroke="currentColor" strokeWidth="1.2" opacity="0.35" />
      <line x1="20" y1="20" x2="30" y2="10" stroke="currentColor" strokeWidth="1.2" opacity="0.35" />
      <line x1="20" y1="20" x2="10" y2="30" stroke="currentColor" strokeWidth="1.2" opacity="0.35" />
      <line x1="20" y1="20" x2="30" y2="30" stroke="currentColor" strokeWidth="1.2" opacity="0.35" />
      <line x1="20" y1="20" x2="5" y2="20" stroke="currentColor" strokeWidth="0.8" opacity="0.25" />
      <line x1="20" y1="20" x2="35" y2="20" stroke="currentColor" strokeWidth="0.8" opacity="0.25" />
      <line x1="20" y1="20" x2="20" y2="5" stroke="currentColor" strokeWidth="0.8" opacity="0.25" />
      <line x1="20" y1="20" x2="20" y2="35" stroke="currentColor" strokeWidth="0.8" opacity="0.25" />

      {/* Outer nodes */}
      <circle cx="10" cy="10" r="2" fill="currentColor" opacity="0.5" />
      <circle cx="30" cy="10" r="2" fill="currentColor" opacity="0.5" />
      <circle cx="10" cy="30" r="2" fill="currentColor" opacity="0.5" />
      <circle cx="30" cy="30" r="2" fill="currentColor" opacity="0.5" />
      <circle cx="5" cy="20" r="1.5" fill="currentColor" opacity="0.35" />
      <circle cx="35" cy="20" r="1.5" fill="currentColor" opacity="0.35" />
      <circle cx="20" cy="5" r="1.5" fill="currentColor" opacity="0.35" />
      <circle cx="20" cy="35" r="1.5" fill="currentColor" opacity="0.35" />

      {/* Central node — accent color ring + core */}
      <circle cx="20" cy="20" r="5.5" fill="none" stroke="#c2410c" strokeWidth="1.5" opacity="0.5" />
      <circle cx="20" cy="20" r="3.5" fill="#c2410c" opacity="0.85" />

      {/* Text */}
      <text
        x="48"
        y="28"
        fill="currentColor"
        fontFamily="Instrument Serif, Georgia, serif"
        fontWeight="400"
        fontSize="24"
        letterSpacing="2"
      >
        ANDOR
      </text>
    </svg>
  )
}
