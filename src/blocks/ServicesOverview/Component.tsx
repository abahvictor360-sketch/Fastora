import Link from 'next/link'
import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import type { ServicesOverviewBlock as ServicesOverviewBlockProps } from '@/payload-types'
import { Media } from '@/components/Media'

export const ServicesOverviewBlock: React.FC<ServicesOverviewBlockProps> = async ({
  eyebrow,
  heading,
  limit,
}) => {
  const payload = await getPayload({ config: configPromise })

  const { docs: services } = await payload.find({
    collection: 'services',
    depth: 1,
    limit: limit || 6,
    sort: 'order',
    where: {
      featuredOnHome: { equals: true },
    },
  })

  if (!services?.length) return null

  return (
    <section className="container py-20 md:py-28">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          {eyebrow && (
            <p className="text-sm font-medium uppercase tracking-wide text-secondary">{eyebrow}</p>
          )}
          {heading && (
            <h2 className="mt-2 max-w-xl text-3xl font-semibold md:text-4xl">{heading}</h2>
          )}
        </div>
        <Link
          href="/services"
          className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
        >
          View all services →
        </Link>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <Link
            key={service.id}
            href={`/services/${service.slug}`}
            className="group flex flex-col justify-between rounded-2xl border border-border bg-card p-6 transition-colors hover:border-secondary"
          >
            <div>
              {service.icon && typeof service.icon === 'object' && (
                <Media resource={service.icon} imgClassName="h-9 w-9 object-contain" htmlElement={null} />
              )}
              <h3 className="mt-5 text-xl font-semibold">{service.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{service.summary}</p>
            </div>
            <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-secondary opacity-0 transition-opacity group-hover:opacity-100">
              Learn more →
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}
