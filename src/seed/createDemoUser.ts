import configPromise from '@payload-config'
import { getPayload } from 'payload'

const DEMO_EMAIL = 'demo@fastora.example'
const DEMO_PASSWORD = 'FastoraDemo2026!'

async function run() {
  const payload = await getPayload({ config: configPromise })

  const existing = await payload.find({
    collection: 'users',
    where: { email: { equals: DEMO_EMAIL } },
    limit: 1,
  })

  if (existing.docs[0]) {
    await payload.update({
      collection: 'users',
      id: existing.docs[0].id,
      data: { password: DEMO_PASSWORD, role: 'demo', name: 'Demo Viewer' },
    })
    payload.logger.info(`Updated existing demo user (${DEMO_EMAIL})`)
  } else {
    await payload.create({
      collection: 'users',
      data: {
        email: DEMO_EMAIL,
        password: DEMO_PASSWORD,
        role: 'demo',
        name: 'Demo Viewer',
      },
    })
    payload.logger.info(`Created demo user (${DEMO_EMAIL})`)
  }
}

await run()
