import configPromise from '@payload-config'
import { getPayload } from 'payload'

/**
 * Services, Case Studies, and Contact are rendered by dedicated route files
 * (not the generic [slug] catch-all) because each needs real logic — a live
 * query against Services/CaseStudies, or the Resend contact form — that the
 * block-based page layout can't express. But their header copy (eyebrow /
 * heading / description) was previously hardcoded in those route files,
 * which meant it didn't show up anywhere in /admin. This creates a Pages
 * document per route so that copy becomes CMS-editable; the route files
 * read the `pageHeader*` fields from it and fall back to the original copy
 * if missing.
 */
const PAGES = [
  {
    slug: 'services',
    title: 'Services',
    pageHeaderEyebrow: 'What we do',
    pageHeaderHeading: 'Services built around how you communicate',
    pageHeaderDescription:
      'Ten integrated services, each designed to help your business communicate with more clarity, credibility, and confidence.',
    meta: {
      title: 'Services',
      description:
        'Strategic communications, brand consulting, content strategy, and more — explore how Fastora helps businesses communicate with purpose.',
    },
  },
  {
    slug: 'case-studies',
    title: 'Case Studies',
    pageHeaderEyebrow: 'Case studies',
    pageHeaderHeading: 'Results, not just deliverables',
    pageHeaderDescription:
      "A look at how we've helped businesses communicate with more clarity, credibility, and confidence.",
    meta: {
      title: 'Case Studies',
      description:
        'Real client work and measurable outcomes — see how Fastora helps businesses communicate more effectively.',
    },
  },
  {
    slug: 'contact',
    title: 'Contact',
    pageHeaderEyebrow: 'Contact',
    pageHeaderHeading: "Let's start the conversation",
    pageHeaderDescription:
      "Tell us about your business and what you're working on. We'll follow up to schedule a consultation.",
    meta: {
      title: 'Contact',
      description: 'Get in touch with Fastora to book a consultation and start communicating with more confidence.',
    },
  },
] as const

async function run() {
  const payload = await getPayload({ config: configPromise })

  for (const pageData of PAGES) {
    const existing = await payload.find({
      collection: 'pages',
      where: { slug: { equals: pageData.slug } },
      limit: 1,
    })

    const data = {
      title: pageData.title,
      heroType: 'none' as const,
      pageHeaderEyebrow: pageData.pageHeaderEyebrow,
      pageHeaderHeading: pageData.pageHeaderHeading,
      pageHeaderDescription: pageData.pageHeaderDescription,
      meta: pageData.meta,
      _status: 'published' as const,
      slug: pageData.slug,
    }

    if (existing.docs[0]) {
      await payload.update({ collection: 'pages', id: existing.docs[0].id, data })
      payload.logger.info(`Updated ${pageData.title} page`)
    } else {
      await payload.create({ collection: 'pages', data })
      payload.logger.info(`Created ${pageData.title} page`)
    }
  }

  // The old "work" utility page doc is now superseded by "case-studies" above.
  const staleWork = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'work' } },
    limit: 1,
  })
  if (staleWork.docs[0]) {
    await payload.delete({ collection: 'pages', id: staleWork.docs[0].id })
    payload.logger.info('Removed stale "work" utility page')
  }
}

await run()
