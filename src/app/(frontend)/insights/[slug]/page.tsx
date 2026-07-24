import type { Metadata } from 'next'
import Link from 'next/link'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import React, { cache } from 'react'

import RichText from '@/components/RichText'
import { Media } from '@/components/Media'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { generateMeta } from '@/utilities/generateMeta'
import { formatAuthors } from '@/utilities/formatAuthors'
import { formatDateTime } from '@/utilities/formatDateTime'
import { getServerSideURL } from '@/utilities/getURL'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const posts = await payload.find({
    collection: 'posts',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: { slug: true },
  })
  return (posts.docs || [])
    .filter((doc) => Boolean(doc.slug))
    .map(({ slug }) => ({ slug: String(slug) }))
}

type Args = { params: Promise<{ slug: string }> }

export default async function PostPage({ params }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug } = await params
  const post = await queryPostBySlug({ slug })

  if (!post) notFound()

  const hasAuthors =
    post.populatedAuthors &&
    post.populatedAuthors.length > 0 &&
    formatAuthors(post.populatedAuthors) !== ''

  const url = getServerSideURL()
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.meta?.description,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    ...(hasAuthors ? { author: { '@type': 'Person', name: formatAuthors(post.populatedAuthors!) } } : {}),
    publisher: { '@type': 'Organization', name: 'Fastora', url },
    mainEntityOfPage: `${url}/insights/${post.slug}`,
  }

  return (
    <article className="pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      {draft && <LivePreviewListener />}

      <header className="relative overflow-hidden bg-primary text-primary-foreground">
        <div
          className="animate-float pointer-events-none absolute -top-32 right-[-10%] h-[32rem] w-[32rem] rounded-full opacity-50 blur-3xl"
          style={{
            background: 'radial-gradient(circle at center, rgba(198,161,91,0.25), transparent 62%)',
          }}
        />
        <div className="container relative z-10 pt-28 pb-16 md:pt-36 md:pb-20" data-reveal-group="110">
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-wide text-secondary" data-reveal="up">
            {Array.isArray(post.categories) &&
              post.categories.map((c) =>
                typeof c === 'object' && c ? <span key={c.id}>{c.title}</span> : null,
              )}
          </div>
          <h1 data-reveal="up" className="mt-4 max-w-4xl text-4xl font-semibold leading-[1.05] md:text-6xl">
            {post.title}
          </h1>
          <div data-reveal="up" className="mt-6 flex flex-wrap gap-x-8 gap-y-2 text-sm text-primary-foreground/70">
            {hasAuthors && <span>By {formatAuthors(post.populatedAuthors!)}</span>}
            {post.publishedAt && (
              <time dateTime={post.publishedAt}>{formatDateTime(post.publishedAt)}</time>
            )}
          </div>
        </div>
      </header>

      {post.heroImage && typeof post.heroImage === 'object' && (
        <div className="container -mt-8" data-reveal="scale">
          <div className="overflow-hidden rounded-3xl border border-border">
            <Media resource={post.heroImage} imgClassName="w-full object-cover" />
          </div>
        </div>
      )}

      <div className="py-16">
        <RichText data={post.content} enableGutter />
      </div>

      {Array.isArray(post.tags) && post.tags.length > 0 && (
        <div className="container flex flex-wrap gap-2">
          {post.tags.map((t, i) => (
            <span
              key={i}
              className="rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground"
            >
              #{t.tag}
            </span>
          ))}
        </div>
      )}

      <div className="container mt-16 text-center">
        <Link
          href="/insights"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          ← Back to all insights
        </Link>
      </div>
    </article>
  )
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params
  const post = await queryPostBySlug({ slug })
  return generateMeta({ doc: post })
}

const queryPostBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'posts',
    draft,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    where: { slug: { equals: slug } },
  })
  return result.docs?.[0] || null
})
