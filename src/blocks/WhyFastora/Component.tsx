import React from 'react'

import type { WhyFastoraBlock as WhyFastoraBlockProps } from '@/payload-types'

export const WhyFastoraBlock: React.FC<WhyFastoraBlockProps> = ({ eyebrow, heading, points }) => {
  if (!points?.length) return null

  return (
    <section className="bg-primary text-primary-foreground">
      <div className="container py-20 md:py-28">
        <div className="max-w-2xl">
          {eyebrow && (
            <p className="text-sm font-medium uppercase tracking-wide text-secondary">{eyebrow}</p>
          )}
          {heading && <h2 className="mt-2 text-3xl font-semibold md:text-4xl">{heading}</h2>}
        </div>

        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {points.map((point, i) => (
            <div key={i}>
              <p className="font-display text-4xl font-semibold text-gradient-velocity md:text-5xl">
                {point.stat}
              </p>
              <h3 className="mt-4 text-lg font-semibold">{point.title}</h3>
              <p className="mt-2 text-sm text-primary-foreground/70">{point.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
