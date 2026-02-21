type PullQuoteProps = {
  quote: string
  attribution?: string
}

export default function PullQuote({ quote, attribution }: PullQuoteProps) {
  return (
    <blockquote className="pull-quote">
      <p>{quote}</p>
      {attribution && (
        <cite className="mt-4 block not-italic text-sm text-[var(--color-ink-tertiary)]">
          &mdash; {attribution}
        </cite>
      )}
    </blockquote>
  )
}
