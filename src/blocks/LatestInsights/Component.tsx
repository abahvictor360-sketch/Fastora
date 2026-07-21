import Link from 'next/link'
import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import type { LatestInsightsBlock as LatestInsightsBlockProps } from '@/payload-types'
import { Media } from '@/components/Media'
import { formatDateTime } from '@/utilities/formatDateTime'

export const LatestInsightsBlockComponent: React.FC<LatestInsightsBlockProps> = async ({
  eyebrow,
  heading,
  limit,
}) => {
  const payload = await getPayload({ config: configPromise })

  const { docs: posts } = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: limit || 3,
    sort: '-publishedAt',
    where: {
      _status: { equals: 'published' },
    },
  })

  if (!posts?.length) return null

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
          href="/insights"
          className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
        >
          View all insights →
        </Link>
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/insights/${post.slug}`}
            className="group overflow-hidden rounded-2xl border border-border bg-card"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-muted">
              {post.heroImage && typeof post.heroImage === 'object' && (
                <Media
                  resource={post.heroImage}
                  fill
                  imgClassName="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              )}
            </div>
            <div className="p-6">
              {post.publishedAt && (
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  {formatDateTime(post.publishedAt)}
                </p>
              )}
              <h3 className="mt-2 text-lg font-semibold">{post.title}</h3>
              {post.meta?.description && (
                <p className="mt-2 text-sm text-muted-foreground">{post.meta.description}</p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
