import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { richTextFromParagraphs, richTextHeadingAndParagraphs } from './lexical'

async function run() {
  const payload = await getPayload({ config: configPromise })

  const existing = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'about' } },
    limit: 1,
  })

  const data = {
    title: 'About',
    heroType: 'lowImpact' as const,
    heroRichText: richTextHeadingAndParagraphs('Built for brands who move fast', [
      "Fastora started with a simple frustration: most agencies are slow, and slow costs businesses momentum they can't get back. We built Fastora to be the opposite — sharp strategy and fast execution, from one accountable team.",
    ]),
    layout: [
      {
        blockType: 'content' as const,
        columns: [
          {
            size: 'full' as const,
            richText: richTextHeadingAndParagraphs('Our story', [
              'Fastora was founded to fix a pattern we kept seeing: brands hiring multiple vendors — one for social, one for the website, one for ads — and losing weeks to handoffs between them. We brought it under one roof instead.',
              'Today we run social media management, content, web design and development, AI-powered content systems, digital campaigns, and brand identity as one connected team, on fixed short-cycle sprints, so nothing sits waiting on someone else.',
            ]),
          },
        ],
      },
      {
        blockType: 'whyFastora' as const,
        eyebrow: 'Our values',
        heading: 'What we optimize for',
        points: [
          {
            stat: 'Speed',
            title: 'Move before the window closes',
            description:
              'Opportunities in social and digital move fast. We scope tight, ship in days, and iterate in public rather than polishing in private for weeks.',
          },
          {
            stat: 'Clarity',
            title: 'No black boxes',
            description:
              'You always know what is being worked on, by whom, and when it ships. Every engagement runs on a visible, shared plan.',
          },
          {
            stat: 'Execution',
            title: 'Strategy is worth nothing unpublished',
            description:
              'We would rather ship a good idea this week than a perfect one next quarter. Execution is the actual product.',
          },
        ],
      },
      {
        blockType: 'content' as const,
        columns: [
          {
            size: 'full' as const,
            richText: richTextHeadingAndParagraphs('The team', [
              'Fastora is run by a small, senior, in-house team spanning strategy, content, design, and engineering — not a rotating cast of subcontractors. Team profiles are coming soon.',
            ]),
          },
        ],
      },
      {
        blockType: 'cta' as const,
        richText: richTextFromParagraphs(['Ready to move faster?']),
        links: [
          {
            link: {
              type: 'custom' as const,
              url: '/contact',
              label: 'Start a project',
              appearance: 'default' as const,
            },
          },
        ],
      },
    ],
    meta: {
      title: 'About Fastora',
      description:
        'Fastora is a digital services and social media agency built for speed, clarity, and execution — one in-house team, no subcontracted black boxes.',
    },
    _status: 'published' as const,
    slug: 'about',
  }

  if (existing.docs[0]) {
    await payload.update({ collection: 'pages', id: existing.docs[0].id, data })
    payload.logger.info('Updated About page')
  } else {
    await payload.create({ collection: 'pages', data })
    payload.logger.info('Created About page')
  }
}

await run()
