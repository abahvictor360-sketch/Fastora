import React from 'react'

import type { AudienceGridBlock as AudienceGridBlockProps } from '@/payload-types'

export const AudienceGridBlock: React.FC<AudienceGridBlockProps> = ({
  eyebrow,
  heading,
  description,
  items,
}) => {
  if (!items?.length) return null

  return (
    <section className="container py-20 md:py-28">
      <div className="max-w-2xl" data-reveal="up">
        {eyebrow && (
          <span className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-wide text-secondary">
            <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
            {eyebrow}
          </span>
        )}
        {heading && <h2 className="mt-3 text-3xl font-semibold md:text-5xl">{heading}</h2>}
        {description && <p className="mt-4 text-muted-foreground">{description}</p>}
      </div>

      <div className="mt-10 flex flex-wrap gap-3" data-reveal-group="60">
        {items.map((item, i) => (
          <span
            key={i}
            data-reveal="up"
            className="rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground"
          >
            {item.label}
          </span>
        ))}
      </div>
    </section>
  )
}
