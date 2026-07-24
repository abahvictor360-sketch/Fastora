import configPromise from '@payload-config'
import { getPayload } from 'payload'

/**
 * One-off cleanup: the first imagery seed ran before Supabase S3 storage
 * credentials existed, so those Media docs point at files that only ever
 * existed on local disk. Deletes them so addBrandImagery.ts recreates them
 * fresh against S3.
 */
const ALT_TEXTS = [
  'Team member reviewing social content on a video call',
  'Digital content and analytics overview',
  'Global reach and business growth concept',
  'Reviewing campaign performance on a tablet',
  'Working through a content and communications plan',
  'Fastora — thoughtful, forward-looking communication',
]

async function run() {
  const payload = await getPayload({ config: configPromise })

  for (const alt of ALT_TEXTS) {
    const existing = await payload.find({
      collection: 'media',
      where: { alt: { equals: alt } },
      limit: 10,
    })
    for (const doc of existing.docs) {
      await payload.delete({ collection: 'media', id: doc.id })
      payload.logger.info(`Deleted local-only media: ${alt}`)
    }
  }
}

await run()
