import type { Metadata } from 'next'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import React, { cache } from 'react'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { generateMeta } from '@/utilities/generateMeta'
import { LivePreviewListener } from '@/components/LivePreviewListener'

// Slugs owned by dedicated route files (app/(frontend)/<slug>/page.tsx),
// which need real logic — live collection queries, a form — that the
// block-based layout can't express. Their Pages documents exist only to
// make the header copy CMS-editable; this catch-all must never render them.
const RESERVED_SLUGS = ['home', 'services', 'case-studies', 'contact', 'insights', 'login']

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const pages = await payload.find({
    collection: 'pages',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: { slug: true },
  })

  return (pages.docs || [])
    .filter((doc) => Boolean(doc.slug) && !RESERVED_SLUGS.includes(String(doc.slug)))
    .map(({ slug }) => ({ slug: String(slug) }))
}

type Args = {
  params: Promise<{ slug?: string }>
}

export default async function Page({ params }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = 'home' } = await params

  // Reserved slugs are served by their own dedicated route files.
  if (RESERVED_SLUGS.includes(slug)) notFound()

  const page = await queryPageBySlug({ slug })

  if (!page) notFound()

  const { heroType, heroRichText, heroLinks, heroMedia, layout } = page

  return (
    <article>
      {draft && <LivePreviewListener />}
      <RenderHero type={heroType} richText={heroRichText} links={heroLinks} media={heroMedia} />
      <RenderBlocks blocks={layout} />
    </article>
  )
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug = 'home' } = await params
  const page = await queryPageBySlug({ slug })
  return generateMeta({ doc: page })
}

const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    draft,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    where: {
      slug: { equals: slug },
    },
  })

  return result.docs?.[0] || null
})
