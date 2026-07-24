import configPromise from '@payload-config'
import { getPayload } from 'payload'
import fs from 'fs'
import path from 'path'

/** Uploads the About page's hero image and sets it as the page's hero media. */
const IMAGE_FILENAME = 'ChatGPT Image Jul 23, 2026, 04_37_17 PM.png'
const IMAGE_ALT = 'Fastora — communications and digital strategy dashboard'

async function run() {
  const payload = await getPayload({ config: configPromise })

  const filePath = path.join(process.cwd(), 'image', IMAGE_FILENAME)
  const data = fs.readFileSync(filePath)

  const existing = await payload.find({
    collection: 'media',
    where: { alt: { equals: IMAGE_ALT } },
    limit: 1,
  })
  for (const doc of existing.docs) {
    await payload.delete({ collection: 'media', id: doc.id })
  }

  const image = await payload.create({
    collection: 'media',
    data: { alt: IMAGE_ALT },
    file: {
      data,
      mimetype: 'image/png',
      name: IMAGE_FILENAME,
      size: data.length,
    },
  })
  payload.logger.info(`Uploaded About hero image (media id ${image.id})`)

  const about = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'about' } },
    limit: 1,
  })
  if (about.docs[0]) {
    await payload.update({
      collection: 'pages',
      id: about.docs[0].id,
      data: { heroMedia: image.id },
    })
    payload.logger.info('Set About page hero image')
  }
}

await run()
