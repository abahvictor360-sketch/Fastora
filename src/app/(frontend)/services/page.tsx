import type { Metadata } from 'next'
import Link from 'next/link'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'

import { Media } from '@/components/Media'
import { PageHeader } from '@/components/PageHeader'

export const metadata: Metadata = {
  title: 'Services',
  description: 'Digital services engineered for speed — from social growth to web and AI systems.',
}

export default async function ServicesPage() {
  const payload = await getPayload({ config: configPromise })
  const { docs: services } = await payload.find({
    collection: 'services',
    depth: 1,
    limit: 100,
    sort: 'order',
    where: { _status: { equals: 'published' } },
  })

  return (
    <div>
      <PageHeader
        eyebrow="What we do"
        title="Services engineered for speed"
        description="Every engagement is built to move fast and prove value early. Explore what we do."
      />

      <section className="container pb-24">
        {services.length ? (
          <div className="grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2" data-reveal-group="90">
            {services.map((service, i) => (
              <Link
                key={service.id}
                href={`/services/${service.slug}`}
                data-reveal="up"
                className="group flex flex-col justify-between gap-10 bg-background p-8 transition-colors hover:bg-card md:p-10"
              >
                <div className="flex items-start justify-between gap-6">
                  <div>
                    {service.icon && typeof service.icon === 'object' && (
                      <Media
                        resource={service.icon}
                        htmlElement={null}
                        imgClassName="h-9 w-9 object-contain"
                      />
                    )}
                    <h2 className="mt-6 text-2xl font-semibold">{service.title}</h2>
                    <p className="mt-3 max-w-sm text-sm text-muted-foreground">{service.summary}</p>
                  </div>
                  <span className="font-display text-5xl font-semibold text-border transition-colors group-hover:text-secondary">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-secondary opacity-0 transition-opacity group-hover:opacity-100">
                  Explore service →
                </span>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No services published yet.</p>
        )}
      </section>
    </div>
  )
}
