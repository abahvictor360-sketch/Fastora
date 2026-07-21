import type { Metadata } from 'next'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { generateMeta } from '@/utilities/generateMeta'
import { LivePreviewListener } from '@/components/LivePreviewListener'

const queryHomePage = cache(async () => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    draft,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    where: {
      slug: { equals: 'home' },
    },
  })

  return result.docs?.[0] || null
})

export default async function HomePage() {
  const { isEnabled: draft } = await draftMode()
  const page = await queryHomePage()

  if (!page) {
    return (
      <div className="container-page py-24">
        <h1 className="text-4xl font-semibold">Fastora</h1>
        <p className="mt-4 text-muted-foreground">
          No Home page found. Create a page with slug &ldquo;home&rdquo; in /admin, or run the
          seed script.
        </p>
      </div>
    )
  }

  const { hero, layout } = page

  return (
    <article>
      {draft && <LivePreviewListener />}
      <RenderHero {...hero} />
      <RenderBlocks blocks={layout} />
    </article>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await queryHomePage()
  return generateMeta({ doc: page })
}
