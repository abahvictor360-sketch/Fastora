import configPromise from '@payload-config'
import { getPayload } from 'payload'
import fs from 'fs'
import path from 'path'

/**
 * Uploads the client-supplied photography from /image into Media and wires
 * it into the existing upload fields (case study covers/gallery, the
 * Insights post hero, and a new About page image break) — all fields that
 * are already editable from /admin, so no schema changes were needed.
 */
const IMAGE_DIR = path.join(process.cwd(), 'image')

async function uploadImage(
  payload: Awaited<ReturnType<typeof getPayload>>,
  filename: string,
  alt: string,
) {
  const filePath = path.join(IMAGE_DIR, filename)
  const data = fs.readFileSync(filePath)
  const existing = await payload.find({
    collection: 'media',
    where: { alt: { equals: alt } },
    limit: 1,
  })
  if (existing.docs[0]) return existing.docs[0]

  return payload.create({
    collection: 'media',
    data: { alt },
    file: {
      data,
      mimetype: 'image/jpeg',
      name: filename,
      size: data.length,
    },
  })
}

async function run() {
  const payload = await getPayload({ config: configPromise })

  const lumenPhoto = await uploadImage(
    payload,
    '121758.jpg',
    'Team member reviewing social content on a video call',
  )
  const lumenGalleryPhoto = await uploadImage(
    payload,
    '2149548139.jpg',
    'Digital content and analytics overview',
  )
  const northboundPhoto = await uploadImage(
    payload,
    '32.jpg',
    'Global reach and business growth concept',
  )
  const northboundGalleryPhoto = await uploadImage(
    payload,
    '119721.jpg',
    'Reviewing campaign performance on a tablet',
  )
  const insightsPhoto = await uploadImage(
    payload,
    '83416.jpg',
    'Working through a content and communications plan',
  )
  const aboutPhoto = await uploadImage(
    payload,
    '124731.jpg',
    'Fastora — thoughtful, forward-looking communication',
  )

  // ── Case studies ─────────────────────────────────────────────
  const lumenStudy = await payload.find({
    collection: 'case-studies',
    where: { slug: { equals: 'lumen-skincare-content-strategy' } },
    limit: 1,
  })
  if (lumenStudy.docs[0]) {
    await payload.update({
      collection: 'case-studies',
      id: lumenStudy.docs[0].id,
      data: {
        coverImage: lumenPhoto.id,
        gallery: [{ image: lumenGalleryPhoto.id }],
      },
    })
    payload.logger.info('Updated Lumen Skincare case study imagery')
  }

  const northboundStudy = await payload.find({
    collection: 'case-studies',
    where: { slug: { equals: 'northbound-logistics-marketing-strategy' } },
    limit: 1,
  })
  if (northboundStudy.docs[0]) {
    await payload.update({
      collection: 'case-studies',
      id: northboundStudy.docs[0].id,
      data: {
        coverImage: northboundPhoto.id,
        gallery: [{ image: northboundGalleryPhoto.id }],
      },
    })
    payload.logger.info('Updated Northbound Logistics case study imagery')
  }

  // ── Insights post ────────────────────────────────────────────
  const post = await payload.find({
    collection: 'posts',
    where: { slug: { equals: 'why-being-good-isnt-enough' } },
    limit: 1,
  })
  if (post.docs[0]) {
    await payload.update({
      collection: 'posts',
      id: post.docs[0].id,
      data: { heroImage: insightsPhoto.id },
    })
    payload.logger.info('Updated Insights post hero image')
  }

  // ── About page — insert an image break after "Our story" ───
  const aboutPage = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'about' } },
    limit: 1,
  })
  if (aboutPage.docs[0]) {
    const layout = [...(aboutPage.docs[0].layout || [])]
    const existingImageIndex = layout.findIndex((block) => block.blockType === 'mediaBlock')
    if (existingImageIndex === -1) {
      layout.splice(2, 0, { blockType: 'mediaBlock', media: aboutPhoto.id })
    } else {
      layout[existingImageIndex] = { blockType: 'mediaBlock', media: aboutPhoto.id }
    }
    await payload.update({
      collection: 'pages',
      id: aboutPage.docs[0].id,
      data: { layout },
    })
    payload.logger.info('Set About page image block')
  }

  payload.logger.info('Brand imagery seed complete.')
}

await run()
