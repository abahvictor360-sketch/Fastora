import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import { cache } from 'react'

import type { Page } from '@/payload-types'

/**
 * Fetches a Pages document by slug for routes that render their own
 * logic (Services, Case Studies, Contact) rather than the generic [slug] catch-all
 * — used only to pull the CMS-editable `pageHeader` copy and SEO meta.
 */
export const queryUtilityPage = cache(async (slug: string): Promise<Page | null> => {
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
