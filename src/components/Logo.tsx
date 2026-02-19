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
      <circle cx="20" cy="20" r="4" fill="currentColor" opacity="0.9" />
      <circle cx="10" cy="10" r="2" fill="currentColor" opacity="0.6" />
      <circle cx="30" cy="10" r="2" fill="currentColor" opacity="0.6" />
      <circle cx="10" cy="30" r="2" fill="currentColor" opacity="0.6" />
      <circle cx="30" cy="30" r="2" fill="currentColor" opacity="0.6" />
      <circle cx="5" cy="20" r="1.5" fill="currentColor" opacity="0.4" />
      <circle cx="35" cy="20" r="1.5" fill="currentColor" opacity="0.4" />
      <circle cx="20" cy="5" r="1.5" fill="currentColor" opacity="0.4" />
      <circle cx="20" cy="35" r="1.5" fill="currentColor" opacity="0.4" />
      <line x1="20" y1="20" x2="10" y2="10" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      <line x1="20" y1="20" x2="30" y2="10" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      <line x1="20" y1="20" x2="10" y2="30" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      <line x1="20" y1="20" x2="30" y2="30" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      <line x1="20" y1="20" x2="5" y2="20" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      <line x1="20" y1="20" x2="35" y2="20" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      <line x1="20" y1="20" x2="20" y2="5" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      <line x1="20" y1="20" x2="20" y2="35" stroke="currentColor" strokeWidth="1" opacity="0.3" />

      {/* Text */}
      <text
        x="48"
        y="28"
        fill="currentColor"
        fontFamily="Inter, system-ui, sans-serif"
        fontWeight="700"
        fontSize="22"
        letterSpacing="3"
      >
        ANDOR
      </text>
    </svg>
  )
}
