import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Post } from '../../../payload-types'

export const revalidatePost: CollectionAfterChangeHook<Post> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    try {
      if (doc._status === 'published') {
        const path = `/insights/${doc.slug}`

        payload.logger.info(`Revalidating post at path: ${path}`)

        revalidatePath(path)
        revalidateTag('posts-sitemap', 'max')
      }

      // If the post was previously published, we need to revalidate the old path
      if (previousDoc._status === 'published' && doc._status !== 'published') {
        const oldPath = `/insights/${previousDoc.slug}`

        payload.logger.info(`Revalidating old post at path: ${oldPath}`)

        revalidatePath(oldPath)
        revalidateTag('posts-sitemap', 'max')
      }
    } catch {
      // No-op outside of a Next.js request context (e.g. CLI scripts like seeding).
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Post> = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    try {
      const path = `/insights/${doc?.slug}`

      revalidatePath(path)
      revalidateTag('posts-sitemap', 'max')
    } catch {
      // No-op outside of a Next.js request context (e.g. CLI scripts like seeding).
    }
  }

  return doc
}
