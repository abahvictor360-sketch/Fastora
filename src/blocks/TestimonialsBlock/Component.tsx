import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import type { TestimonialsBlockType as TestimonialsBlockProps } from '@/payload-types'
import { Media } from '@/components/Media'

export const TestimonialsBlockComponent: React.FC<TestimonialsBlockProps> = async ({
  eyebrow,
  heading,
  limit,
}) => {
  const payload = await getPayload({ config: configPromise })

  const { docs: testimonials } = await payload.find({
    collection: 'testimonials',
    depth: 1,
    limit: limit || 3,
    where: {
      showOnHome: { equals: true },
    },
  })

  if (!testimonials?.length) return null

  return (
    <section className="container py-20 md:py-28">
      <div className="max-w-2xl">
        {eyebrow && (
          <p className="text-sm font-medium uppercase tracking-wide text-secondary">{eyebrow}</p>
        )}
        {heading && <h2 className="mt-2 text-3xl font-semibold md:text-4xl">{heading}</h2>}
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {testimonials.map((testimonial) => (
          <figure
            key={testimonial.id}
            className="flex flex-col justify-between rounded-2xl border border-border bg-card p-6"
          >
            <blockquote className="text-lg leading-relaxed">“{testimonial.quote}”</blockquote>
            <figcaption className="mt-6 flex items-center gap-3">
              {testimonial.avatar && typeof testimonial.avatar === 'object' && (
                <Media
                  resource={testimonial.avatar}
                  htmlElement={null}
                  imgClassName="h-10 w-10 rounded-full object-cover"
                />
              )}
              <div>
                <p className="text-sm font-semibold">{testimonial.clientName}</p>
                <p className="text-sm text-muted-foreground">
                  {[testimonial.role, testimonial.company].filter(Boolean).join(', ')}
                </p>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
