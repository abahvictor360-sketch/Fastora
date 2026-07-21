import Link from 'next/link'
import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import type { SelectedWorkBlock as SelectedWorkBlockProps } from '@/payload-types'
import { Media } from '@/components/Media'

export const SelectedWorkBlock: React.FC<SelectedWorkBlockProps> = async ({
  eyebrow,
  heading,
  limit,
}) => {
  const payload = await getPayload({ config: configPromise })

  const { docs: caseStudies } = await payload.find({
    collection: 'case-studies',
    depth: 1,
    limit: limit || 3,
    sort: 'order',
    where: {
      featuredOnHome: { equals: true },
    },
  })

  if (!caseStudies?.length) return null

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
          href="/work"
          className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
        >
          View all work →
        </Link>
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-3">
        {caseStudies.map((study) => (
          <Link
            key={study.id}
            href={`/work/${study.slug}`}
            className="group overflow-hidden rounded-2xl border border-border bg-card"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-muted">
              {study.coverImage && typeof study.coverImage === 'object' && (
                <Media
                  resource={study.coverImage}
                  fill
                  imgClassName="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              )}
            </div>
            <div className="p-6">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {study.industry || study.clientName}
              </p>
              <h3 className="mt-2 text-lg font-semibold">{study.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{study.summary}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
