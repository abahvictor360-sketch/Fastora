import configPromise from '@payload-config'
import { getPayload } from 'payload'
import fs from 'fs'
import path from 'path'

/** Uploads the hero product-preview video and sets it as the Home page's hero media. */
const VIDEO_FILENAME = 'ElevenLabs_video_seedance-2-0_Create a smooth_2026-07-23T15_43_06.mp4'
const VIDEO_ALT = 'Fastora product preview'

async function run() {
  const payload = await getPayload({ config: configPromise })

  const filePath = path.join(process.cwd(), 'image', VIDEO_FILENAME)
  const data = fs.readFileSync(filePath)

  const existing = await payload.find({
    collection: 'media',
    where: { alt: { equals: VIDEO_ALT } },
    limit: 1,
  })
  for (const doc of existing.docs) {
    await payload.delete({ collection: 'media', id: doc.id })
  }

  const video = await payload.create({
    collection: 'media',
    data: { alt: VIDEO_ALT },
    file: {
      data,
      mimetype: 'video/mp4',
      name: VIDEO_FILENAME,
      size: data.length,
    },
  })
  payload.logger.info(`Uploaded hero video (media id ${video.id})`)

  const home = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'home' } },
    limit: 1,
  })
  if (home.docs[0]) {
    await payload.update({
      collection: 'pages',
      id: home.docs[0].id,
      data: { heroMedia: video.id },
    })
    payload.logger.info('Set Home page hero video')
  }
}

await run()
