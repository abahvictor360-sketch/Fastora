import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import type { TestimonialsBlockType as TestimonialsBlockProps } from '@/payload-types'
import type { Testimonial } from '@/components/ui/testimonial-v2'
import { ScrollingTestimonials } from '@/components/ui/testimonial-v2'

export const TestimonialsBlockComponent: React.FC<TestimonialsBlockProps> = async ({
  eyebrow,
  heading,
  limit,
}) => {
  const payload = await getPayload({ config: configPromise })

  const { docs } = await payload.find({
    collection: 'testimonials',
    depth: 1,
    limit: limit || 3,
    where: {
      showOnHome: { equals: true },
    },
  })

  if (!docs?.length) return null

  const testimonials: Testimonial[] = docs.map((testimonial) => ({
    text: testimonial.quote,
    name: testimonial.clientName,
    role: [testimonial.role, testimonial.company].filter(Boolean).join(', '),
    image:
      testimonial.avatar && typeof testimonial.avatar === 'object'
        ? (testimonial.avatar.url ?? undefined)
        : undefined,
  }))

  return (
    <section className="container py-20 md:py-28">
      <div className="mx-auto max-w-[540px] text-center" data-reveal="up">
        {eyebrow && (
          <span className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-wide text-secondary">
            <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
            {eyebrow}
          </span>
        )}
        {heading && <h2 className="mt-3 text-3xl font-semibold md:text-5xl">{heading}</h2>}
      </div>

      <div data-reveal="up">
        <ScrollingTestimonials testimonials={testimonials} />
      </div>
    </section>
  )
}
