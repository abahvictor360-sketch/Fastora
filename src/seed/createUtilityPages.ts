import configPromise from '@payload-config'
import { getPayload } from 'payload'

/**
 * Services, Work, and Contact are rendered by dedicated route files (not the
 * generic [slug] catch-all) because each needs real logic — a live query
 * against Services/CaseStudies, or the Resend contact form — that the
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
    pageHeaderHeading: 'Services engineered for speed',
    pageHeaderDescription:
      'Every engagement is built to move fast and prove value early. Explore what we do.',
    meta: {
      title: 'Services',
      description:
        'Digital services engineered for speed — from social growth to web and AI systems.',
    },
  },
  {
    slug: 'work',
    title: 'Work',
    pageHeaderEyebrow: 'Selected work',
    pageHeaderHeading: 'Results, not just deliverables',
    pageHeaderDescription: 'A look at the outcomes we have engineered for the teams we partner with.',
    meta: {
      title: 'Work',
      description: 'Selected case studies — the results we have delivered for our clients.',
    },
  },
  {
    slug: 'contact',
    title: 'Contact',
    pageHeaderEyebrow: 'Contact',
    pageHeaderHeading: "Let's start your project",
    pageHeaderDescription: "Tell us where you want to go. We'll come back with how to get there — fast.",
    meta: {
      title: 'Contact',
      description: 'Start a project with Fastora. Tell us what you want to achieve.',
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
}

await run()
