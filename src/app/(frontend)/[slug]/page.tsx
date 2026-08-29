import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import React, { cache } from 'react'

import { getPageBySlug, getPageSlugs, safely } from '@/lib/api'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { generateMeta } from '@/utilities/generateMeta'
import { resolveOrDefer } from '@/utilities/resolveOrDefer'

// Slugs owned by dedicated route files (app/(frontend)/<slug>/page.tsx),
// which need real logic — live collection queries, a form — that the
// block-based layout can't express. Their Pages documents exist only to
// make the header copy CMS-editable; this catch-all must never render them.
const RESERVED_SLUGS = ['home', 'services', 'case-studies', 'contact', 'insights', 'login']

export async function generateStaticParams() {
  const slugs = await safely(() => getPageSlugs(), [])

  return slugs.filter((slug) => Boolean(slug) && !RESERVED_SLUGS.includes(slug)).map((slug) => ({ slug }))
}

type Args = {
  params: Promise<{ slug?: string }>
}

export default async function Page({ params }: Args) {
  const { slug = 'home' } = await params

  // Reserved slugs are served by their own dedicated route files.
  if (RESERVED_SLUGS.includes(slug)) notFound()

  const page = await queryPageBySlug({ slug })

  if (!page) notFound()

  const { hero, layout } = page

  return (
    <article>
      <RenderHero
        type={hero.type}
        eyebrow={hero.eyebrow}
        richText={hero.richText}
        links={hero.links}
        media={hero.media}
      />
      <RenderBlocks blocks={layout} />
    </article>
  )
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug = 'home' } = await params
  const page = await queryPageBySlug({ slug })
  return generateMeta({ doc: page, path: `/${slug}` })
}

/**
 * Wrapped in resolveOrDefer(), not safely().
 *
 * safely() returns null when the request fails, and null here means notFound().
 * That made an unreachable API indistinguishable from a page that does not
 * exist, so a momentary blip on the API host turned into a 404 — which Next
 * then cached for the revalidate window. Live pages disappeared this way:
 * /about, /terms-of-use and /cookie-policy all 404ed and recovered on their own
 * minutes later.
 *
 * apiFetchOrNull already draws the distinction, returning null only when the
 * API genuinely answers 404 and throwing for anything else — but letting that
 * throw escape is fatal during a build, which is how /about took a whole deploy
 * down. resolveOrDefer keeps the distinction and survives the build: a real 404
 * still 404s, and an unreachable API defers the page to request time.
 */
const queryPageBySlug = cache(async ({ slug }: { slug: string }) =>
  resolveOrDefer(() => getPageBySlug(slug)),
)
